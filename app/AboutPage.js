'use strict';
import React, {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Image,
} from 'react-native';

import WebView from './WebPage';
import NavigationBar from 'react-native-navigationbar';

class AboutPage extends React.Component {

    render(){
        let content = (
            <View style={styles.contentContainer}>
                <Text style={{lineHeight:18}}>每天一张精选妹纸图,一个短小视频,一篇程序猿干货</Text>
                <Text style={styles.contentText}>数据来源于代码家的
                    <Text style={{textDecorationLine:'underline'}} onPress={()=>{
                        this.props.navigator.push({
                            component:WebView,
                            title:'gank.io',
                            url:'http://gank.io'
                        })
                    }}
                    >
                        http://gank.io
                    </Text>
                    这是一款react-native作品
                </Text>

                <Text style={styles.contentText}>My Github:
                    <Text style={{textDecorationLine:'underline'}} onPress={()=>{
                        this.props.navigator.push({
                            component:WebView,
                            title:'github',
                            url:'http://github.com'
                        });
                    }}
                    >
                        http://github.com
                    </Text>
                </Text>

                <Text>上海恒企信息科技有限公司</Text>
            </View>
        );
        return(
            <View style={styles.container}>
                <NavigationBar
                    backTintColor='white'
                    title='关于开发者'
                    barOpacity={0.8}
                    barStyle={styles.navBar} backFunc={()=>{
                        this.props.navigator.pop();
                    }}
                />
                <ScrollView>
                    <Image source={require('./images/gank_launcher@1x.png')} style={styles.imgLaunch}/>
                    <Text style={styles.versionText}>干客</Text>
                    <Text style={styles.versionText}>v1.0.0</Text>
                    <Text style={styles.aboutText}>关于开发者</Text>
                    {content}
                </ScrollView>
            </View>
        );
    }

}

let styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#252528'
    },
    contentContainer:{
        backgroundColor:'white',
        margin:8,
        padding:15,
        borderRadius:5
    },
    contentText:{
        marginTop:13,
        lineHeight:18
    },
    imgLaunch:{
        alignSelf:'center',
        marginTop:14,
        width:90,
        height:90
    },
    versionText:{
        color:'white',
        fontSize:16,
        alignSelf:'center',
        marginTop:13
    },
    aboutText:{
        fontSize:15,
        marginTop:30,
        marginBottom:5,
        marginLeft:8,
        color:'#434243'
    }

});

export default AboutPage;