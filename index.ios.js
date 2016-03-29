/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
    AppRegistry,
    StyleSheet,
    Navigator,
    Component,
} from 'react-native';

import HomePage from './app/HomePage';

class GanHuo_Demo extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    render(){
        return(
            <Navigator
                style={styles.container}
                initialRoute={{component:HomePage}} 
                renderScene={(route,navigator)=>{
                    return <route.component navigator={navigator} {...route} {...route.passProps}/>
                }}
            />
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1//充满整个屏幕

    }
});

AppRegistry.registerComponent('GanHuo_Demo', () => GanHuo_Demo);
