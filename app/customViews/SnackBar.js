'use strict';
import React,{
    Component,
    Animated,
    Text,
    View,
    StyleSheet,
    PropTypes,
} from 'react-native';

class SnackBar extends Component{

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            showValue:new Animated.Value(0)
        };
    };

    static propTypes = {
        stayTime:PropTypes.number,
        bodyColor:PropTypes.string,
        height:PropTypes.number,
        message:PropTypes.string
    };

    static defaultProps = {
        stayTime:1500,
        bodyColor:'red',
        height:40,
        message:'Something Error'
    };

    componentDidMount(){
        this._showBar();
    }
    
    _showBar(){
        Animated.timing(this.state.showValue,{
            toValue:1,
            duration:550
        }).start(()=>{
            setTimeout(()=>{
                this._hideBar()
            },this.props.stayTime);
        })
    }
    
    _hideBar(){
        Animated.timing(this.state.showValue,{
            toValue:0,
            duration:550
        }).start();
    }

    render(){
        return(
            <Animated.View style={[styles.container,{opacity:this.state.showValue,height:this.props.height,backgroundColor:this.props.bodyColor}]}>
                <Text>{this.props.message}</Text>
            </Animated.View>
        );
    }
}

let styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        bottom:0,
        left:0,
        right:0
    } 
});

export default SnackBar;