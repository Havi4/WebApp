'use strict';
import React, {
    StyleSheet,
    View,
    Text,
    ListView,
    TouchableHighlight,
    RefreshControl,
    Image,
} from 'react-native';

import RequestUtrils from './utils/RequestUtils';
import Animation from './customViews/Animation';
import SnackBar from './customViews/SnackBar';
import NavigationBar from 'react-native-navigationbar';
import AboutPage from './AboutPage';
import DailyContent from './DailyConent';

class HistoryList extends React.Component {
    
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.pageIndex = 0;//初始页面数
        this.dateArray = this.props.dateArray;
        this.state = {
            dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!=r2}).cloneWithRows(this.props.contentDataGroup),
            dataArray:this.props.contentDataGroup,
            loadMore:false,
            isRefreshing:false,
            isError:false
        };
        this._loadMore = this._loadMore.bind(this);
        this._refresh = this._refresh.bind(this);
        this._renderItem = this._renderItem.bind(this);
        this._renderFooter = this._renderFooter.bind(this);
    }
    
    render(){
        let snackBar = this.state.isError ? (<SnackBar/>):null;
        this.state.isError = false;
        return(
            <View style={styles.container}>
                <NavigationBar
                    backHidden={false}
                    barTintColor="white"
                    barStyle={styles.navBar}
                    title="历史"
                    actionName="关于"
                    backFunc={()=>{
                        this.props.navigator.pop();
                    }}
                    actionFunc={()=>{
                        this.props.navigator.push({
                            component:AboutPage,
                            title:'关于'
                        });
                    }}
                />

                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderItem}
                    onEndReached={this._loadMore}
                    renderFooter={this._renderFooter}
                    onEndReachedThreshold={9}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._refresh}
                            colors={['#aaaaaa','#bbbbbb','#cccccc']}
                            title="Loading..."
                            progressBackgroundColor="#aaaaaa"
                        />
                    }
                />
                {snackBar}
            </View>
        );
    }

    async _refresh(){
        if(this.state.isRefreshing){
            return;//正在更新的话,不进行操作
        }
        this.setState({isRefreshing:true});
        try{
            this.dateArray = (await RequestUtrils.getContents()).results;//所有的数组
            this.pageIndex = 0;
            let contentDataGroup = await RequestUtrils.getContents(this.dateArray.slice(0,10));
            if(typeof contentDataGroup === 'undefined'){
                return;
            }
            this.setState({
                dataArray:contentDataGroup,
                dataSource:this.state.dataSource.cloneWithRows(contentDataGroup),
                isRefreshing:false
            });
        } catch(e) {
            this.setState({
                isError:true,
                isRefreshing:false
            });
        }

    }

    async _loadMore(){
        if(this.state.loadMore){
            return;
        }
        this.setState({loadMore:true});
        try{
            this.pageIndex +=10;
            let pageDate = this.dateArray.slice(this.pageIndex,this.pageIndex + 10);
            let loadedContentGroup = await RequestUtrils.getContents(pageDate);
            let newContent = this.state.dataArray.concat(loadedContentGroup);//
            this.setState({
                dataArray:newContent,
                dataSource:this.state.dataSource.cloneWithRows(newContent),
                loadMore:false
            })
        } catch(e) {
            console.log(e);
            this.setState({
                loadMore:false,
                isError:true
            })
        }
    }

    _renderFooter(){
        return(
            this.state.loadMore ? (<View style={styles.indicatorWrapper}>
                <Animation timingLenght={50} druation={500} badyColor={'#aaaaaa'}/>
            </View>) : (<View/>)
        );
    }

    _renderItem(contentData,sectionId,highlightRow){
        return(
            <TouchableHighlight onPress={()=>this._skipIntoContent(contentData)}>
                <View style={styles.itemContainer}>
                    <Text style={styles.date}>{contentData.date}</Text>
                    <Text style={styles.title}>{contentData.results.休息视频[0].desc}</Text>
                    <Image source={{uri:contentData.results.福利[0].url}} style={styles.thumbnail}/>
                </View>
            </TouchableHighlight>
        );
    }

    _skipIntoContent(contentData){
        this.props.navigator.push({
            component:DailyContent,
            title:'日常',
            passProps:{contentData}
        })
    }

}

let styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#252528'
    },
    navBar:{
        
    },
    itemContainer:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        paddingTop:20
    },
    date:{
        fontSize:17,
        color:'white',
        textAlign:'center'
    },
    title:{
        fontSize:15,
        marginBottom:10,
        marginRight:35,
        marginLeft:35,
        lineHeight:22,
        color:'white',
        textAlign:'center'
    },
    thumbnail:{
        width:null,
        height:260,
        alignSelf:'stretch'
    },
    indicatorWrapper:{
        height:45,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#252528'
    }
});

export default HistoryList;