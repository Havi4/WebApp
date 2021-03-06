'use strict'
import React,{
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Animated,
    Text,
    TouchableHighlight,
} from 'react-native';

import RequestUtils from './utils/RequestUtils';
import SnackBar from './customViews/SnackBar';
import WebPageView from './WebPage';
import HistoryList from './HistoryList';

class HomePage extends React.Component{

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isError:false,
            isLoading:true,
            isPlaying:true,
            fadeAnimLogo:new Animated.Value(0),
            fadeAnimText0:new Animated.Value(0),
            fadeAnimText1:new Animated.Value(0),
            fadeAnimLayout:new Animated.Value(1)
        };
    }
    //进行渲染动画
    async componentDidMount(){
        let timing = Animated.timing;
        Animated.sequence([
            timing(this.state.fadeAnimLogo,{
                toValue:1,
                duration:800
            }),
            timing(this.state.fadeAnimText0,{
                toValue:1,
                duration:800
            }),
            timing(this.state.fadeAnimText1,{
                toValue:1,
                duration:800
            })
        ]).start(async ()=>{
            this.setState({
                isPlaying:false
            });
            setTimeout(()=>this._hideWelcome(),0);
        });

        try{
            this.dateArray = (await RequestUtils.getDateArray()).results;
            this.contentDataGroup = await RequestUtils.getContents(this.dateArray.slice(0,10));//加载10条
            if(typeof this.contentDataGroup === 'undefined'){
                return;
            }
            this.setState({
                isLoading:false
            })
        } catch(e) {
            console.log('请求失败',e);
            this.setState({
                isError:true
            });
        }

        setTimeout(()=>this._hideWelcome(),0);
    }

    _hideWelcome(){
        if(this.state.isLoading || this.state.isPlaying){
            return;
        }
        Animated.timing(this.state.fadeAnimLayout,{
            toValue:0,
            duration:1000
        }).start(()=>{
            this.setState({
                welcomeEnd:true
            });
        });
    }

    _welcome(){
        if(this.state.welcomeEnd){
            return null;
        }

        let snackBar = this.state.isError ? (<SnackBar/>) : null;
        return (
            <Animated.View style={[styles.indicatorWrapper,{opacity:this.state.fadeAnimLayout}]}>
                <Animated.View style={{
                    opacity:this.state.fadeAnimLogo,
                    bottom:200,
                    transform:[{
                        translateX:this.state.fadeAnimLogo.interpolate({
                            inputRange:[0,1],
                            outputRange:[-40,0]
                        })
                    }]
                }}>
                    <Image source={require('./images/gank_launcher@1x.png')} style={{width:100,height:100}}/>
                </Animated.View>

                <Animated.View style={{
                    opacity:this.state.fadeAnimText0,
                    bottom:-110,
                    transform:[{
                        translateX:this.state.fadeAnimText0.interpolate({
                            inputRange:[0,1],
                            outputRange:[50,0]
                        })
                    }]
                }}>
                    <Text style={styles.footerText}>Gank.io支持</Text>
                </Animated.View>

                <Animated.View style={{
                    opacity:this.state.fadeAnimText1,
                    bottom:-130,
                    transform:[{
                        translateX:this.state.fadeAnimText1.interpolate({
                            inputRange:[0,1],
                            outputRange:[30,0]
                        })
                    }]
                }}>
                    <Text style={styles.footerText}>上海恒企测试</Text>
                </Animated.View>
                {snackBar}
            </Animated.View>
        );
    }
    
    _skipIntoHistory(contentDataGroup,dateArray){
        this.props.navigator.push({
            component:HistoryList,
            passProps:{contentDataGroup,dateArray}
            
        });
    }

    render(){
        let content;
        if(this.state.isLoading){
            content = (<View style={{backgroundColor:'black',flex:1}}/>);//全屏黑色
        }else {
            let homePageContent = this.contentDataGroup[0].results;
            content = (
                <View style={styles.container}>
                    <View style={styles.headerWrapper}>
                        <Image source={{uri:homePageContent.福利[0].url}} style={{flex:1}}/>
                        <View style={styles.editorWrapper}>
                            <Text style={styles.imageEditors}>{'via:' + homePageContent.福利[0].who}</Text>
                        </View>
                    </View>

                    <View style={styles.contentWrapper}>
                        <TouchableHighlight
                            style={{flex:2,marginTop:17}}
                            underlayColor={'#333333'}
                            onPress={()=>{
                                this.props.navigator.push({
                                    component:WebPageView,
                                    title:homePageContent.休息视频[0].desc,
                                    url:homePageContent.休息视频[0].url
                                })
                            }}>
                            <View style={styles.content}>
                                <Text style={styles.videoTitle}>{homePageContent.休息视频[0].desc}</Text>
                                <Text style={styles.dateAuthor}>{this.contentDataGroup[0].date+ ' ' + 'via:' + homePageContent.休息视频[0].who}</Text>
                                <Text style={styles.toVideo}>--->去看视频~</Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight
                            style={styles.buttonStyle}
                            underlayColor={'#333333'} onPress={()=>this._skipIntoHistory(this.contentDataGroup,this.dateArray)}
                        >
                            <Text style={styles.toHistory}>查看往期</Text>

                        </TouchableHighlight>
                    </View>
                </View>
            );
        }

        return (
            <View style={styles.content} needsOffscreenAlphaCompositing renderToHardwareTextureAndroid>
                {content}
                {this._welcome()}
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container:{
        flex:1
    },
    headerWrapper:{
        flex:4
    },
    editorWrapper:{
        position:'absolute',
        bottom:0,
        left:0,
        right:0,
        height:17,
        backgroundColor:'black',
        opacity:0.5
    },
    imageEditors:{
        fontSize:12,
        color:'white',
        position:'absolute',
        bottom:1.5
    },
    contentWrapper:{
        flex:3,
        backgroundColor:'#252528'
    },
    content:{
        flex:1,
        backgroundColor:'#434243'
    },
    indicatorWrapper:{
        flex:1,
        backgroundColor:'black',
        alignItems:'center',
    },
    footerText:{
        fontSize:15,
        color:'#aaaaaa',
        textAlign:'center'
    },
    videoTitle:{
        fontSize:18,
        color:'white',
        marginTop:17,
        left:15,
        lineHeight:21,
        marginRight:25
    },
    dateAuthor:{
        fontSize:14,
        color:'white',
        position:'absolute',
        left:15,
        bottom:17
    },
    toVideo:{
        fontSize:14,
        color:'white',
        position:'absolute',
        bottom:8,
        right:15
    },
    buttonStyle:{
        backgroundColor:'#434243',
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        marginTop:17,
        marginBottom:17
    },
    toHistory:{
        fontSize:18,
        color:'white'
    }

});

module.exports = HomePage;