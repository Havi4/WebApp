'use strict';
import React, {
    WebView,
    View,
    Text,

} from 'react-native';

import NavigationBar from 'react-native-navigationbar';

class WebPageView extends React.Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    render(){
        return (
            <View style={{flex:1}}>
                <NavigationBar
                    backHidden={false}
                    barTintColor="white"
                    backFunc={()=>{
                        this.props.navigator.pop();
                    }} title={this.props.title}
                />
                <WebView source={{uri:this.props.url}}/>
            </View>
        );
    }

}

export default WebPageView;