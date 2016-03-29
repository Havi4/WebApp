'use strict';
import React, {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    Image,
    ScrollView,
} from 'react-native';

import NavigationBar from 'react-native-navigationbar';
import WebView from './WebPage';

const HEADER_HEIGHT = 400;

class DailyConent extends React.Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            opacity :0
        };
        this.onScroll = this.onScroll.bind(this);
    }

    render(){
        let contentData = this.props.contentData;
        let thumbnail = (typeof contentData.results.福利[0].url !== 'undefined')?contentData.results.福利[0].url:'';
        let Header = (
            <NavigationBar
                title={this.props.title}
                backHidden={false}
                backIcon={true}
                barTintColor='white'
                barOpacity={this.state.opacity}
                barStyle = {styles.navBar} backFunc={()=>{
                    this.props.navigator.pop();
                }}
            />
        );

        return (
            <View needsOffscreenAlphaCompositing renderToHardwareTextureAndroid style={styles.container}>
                <ScrollView onScroll={this.onScroll} scrollEventThrottle={5} bounces={false} style={{marginTop:-64}}>

                    <Image source={{uri:thumbnail}} style={styles.headerImage}/>
                    <View style={{flex:1}}>
                        {this._getViews(contentData)}
                    </View>
                </ScrollView>
                {Header}
            </View>
        );
    }

    onScroll(event){
        const MAX = HEADER_HEIGHT-64;
        let y = event.nativeEvent.contentOffset.y;
        if(y>MAX){
            y=MAX;
        }
        const opacity = y/MAX;
        this.setState({
            opacity:opacity
        });
    }

    _getViews(contentData){
        return contentData.category.map((category,index)=>(
            <View key={index} style={styles.itemContainer}>
                <Text style={styles.category}> {category}</Text>
                {this.getItems(contentData,category)}
            </View>
        ))
    }

    getItems(contentData,category){
        return contentData.results[category].map((item,index)=>(
            <TouchableHighlight underlayColor='#aaaaaa'
                key={index} onPress={()=>{
                    this.props.navigator.push({
                        component:WebView,
                        title:item.desc,
                        url:item.url
                    })
                }}
            >
                <Text style={styles.title}>
                    *{item.desc} ({item.who})
                </Text>
            </TouchableHighlight>
        ))
    }
}

let styles = StyleSheet.create({
    container:{
        backgroundColor:'#252528',
        flex:1
    },
    headerImage:{
        height:HEADER_HEIGHT
    },
    itemContainer:{
        flex:1,
        backgroundColor:'white',
        margin:15,
        padding:15,
        borderRadius:3
    },
    category:{
        
        fontSize:18,
    },
    title:{
        fontSize:15,
        marginLeft:15
    },
    navBar:{
        top:0,
        left:0,
        right:0,
        position:'absolute'
    }
});

export default DailyConent;