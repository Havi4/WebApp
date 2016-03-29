/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  StatusBar,
  Text,
  View,
    BackAndroid,
    Navigator,
} from 'react-native';

import HomePage from './app/HomePage';

class GanHuo_Demo extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
        this.handleBack = this.handleBack.bind(this);
    }

    componentDidMount(){
        BackAndroid.addEventListener('hardwareBackPress',this.handleBack);
    }

    componentWillUnMount(){
        BackAndroid.addEventListener('hardwareBackPress',this.handleBack);
    }

    handleBack(){
        var navigator = this.navigator;
        if(navigator && navigator.getCurrentRoutes().length>1){
            navigator.pop();
            return true;
        }
        return false;
    }

    render(){
        return(
            <View style={styles.container}>
                <StatusBar backgroundColor='transparent' translucent={true}/>
                <Navigator
                    ref={component=>this.navigator=component}
                    configureScene={(route)=>{
                        return Navigator.SceneConfigs.HorizontalSwipeJump;
                    }}
                    initialRoute={{component:HomePage}}
                    renderScene={(route,navigator)=>{
                        return <route.component navigator={navigator} {...route} {...route.passProps}/>
                    }}
                />
            </View>
        );

    }
}

const styles = StyleSheet.create({
    container:{
        flex:1//充满整个屏幕

    }
});

AppRegistry.registerComponent('GanHuo_Demo', () => GanHuo_Demo);
