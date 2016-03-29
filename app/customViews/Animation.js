'use strict';
import React, {
    Animated,
    View,
    Text,
    PropTypes,
} from 'react-native';

class Animation extends React.Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            animatedValue:new Animated.Value(0)
        };
    };
    
    static propTypes = {
        timingLength:PropTypes.number,
        duration:PropTypes.number,
        bodyColor:PropTypes.string,
        radius:PropTypes.number
    };
    
    static defaultProps = {
        timingLength:50,
        duration:500,
        bodyColor:'white',
        radius:5
    };

    componentDidMount(){
        this._createAnim(this);
    }
    
    _createAnim(that){
        Animated.timing(this.state.animatedValue,{
            toValue:1,
            duration:500
        }).start(()=>{
            Animated.timing(this.state.animatedValue,{
                toValue:0,
                duration:500
            }).start(()=>{
                this._createAnim(that);
            });
        });
    };
    
    render(){
        return (
            <Animated.View style={{
                width:this.props.radius *2,
                height:this.props.radius*2,
                borderRadius:this.props.radius,
                backgroundColor:this.props.bodyColor,
                transform:[{
                    translateX:this.state.animatedValue.interpolate({
                        inputRange:[0,1],
                        outputRange:[-this.props.timingLength/2,this.props.timingLength/2]
                    })
                }]
            }}/>
        );
    }

}

export default Animation;