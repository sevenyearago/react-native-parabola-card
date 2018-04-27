/**
 * Created by kerwinliu on 2017/10/20.
 */
import React,{Component,PropTypes} from 'react'
import {
    StyleSheet,
    TouchableOpacity,
    Modal,
    Dimensions,
    TouchableWithoutFeedback,
    Animated,
    View,
    UIManager
} from 'react-native';
const {width,height} = Dimensions.get('window')
const ReactNativeComponentTree = require('ReactNativeComponentTree');


function Point(x, y) {
    this.x = x;
    this.y = y;
}

function Size(width, height) {
    this.width = width;
    this.height = height;
}

function Rect({left, top, width, height}) {
    this.left = left;
    this.top = top ;
    this.width = width;
    this.height = height;
}

export  class Parabola extends Component{
    static propTypes = {
        onPress:PropTypes.func
    }
    static defaultProps = {
        onPress:()=> null
    }
    press(e){
        let currentT = e.currentTarget
        let cur = ReactNativeComponentTree.getInstanceFromNode(currentT);
        UIManager.measure(currentT, (x, y, width, height, pageX, pageY) => {
            this.showImg(pageX,pageY,width,height,cur._currentElement)
        });

    }
    showImg(left,top,width,height,element){
        this.props.onPress && this.props.onPress({left,top,width,height,element})
    }
    render(){
        return(
            <TouchableWithoutFeedback activeOpacity={1} onPress={this.press.bind(this)}>
                {this.props.children}
            </TouchableWithoutFeedback>
        )
    }
}

export class ParabolaImageContainer extends Component{
    static propTypes = {
        endPointX:PropTypes.number,
        endPointY:PropTypes.number,
    }
    static defaultProps = {
        endPointX:width * 0.5,
        endPointY:height - 20
    }
    constructor(props){
        super(props)
        this.state={
            element:null,
            visible:false,
            defaultAnimatedValues: {
                scale: new Animated.Value(1),
                translate: new Animated.ValueXY(0,0),
            }
        }
    }
    start(options,callback){
        this.displayOptions = options
        this.setState({
            visible:true,
            element:options.element.props.children
        })
        this._startAnimation(options,callback)
    }
    _startAnimation(options,callback){
        let animDuration = 400;
        let values = this.state.defaultAnimatedValues;

        let commonConfig = {
            duration: animDuration,
        }
        const {endPointX,endPointY} = this.props
        Animated.parallel([
            Animated.timing(values.translate, {
                toValue:new Point(endPointX  - options.left  - options.width * 0.5, endPointY - options.top - options.height * 0.5 ),
                ...commonConfig,
            }),
            Animated.timing(values.scale, {
                toValue:0.1,
                ...commonConfig,
            })
        ]).start(()=>{
            this.setState({
                visible: false
            })
            let values = this.state.defaultAnimatedValues;
            values.translate.setValue(new  Point(0, 0));
            values.scale.setValue(1);
            callback && callback()
        });
    }
    render(){
        if(!this.state.visible){
            return null
        }
        const areaOrigin = new Rect(this.displayOptions)
        const contentSize = {height:areaOrigin.height,width:areaOrigin.width}
        const translateOrigin = this.state.defaultAnimatedValues
        const transformContent = {
                transform: [
                    {
                        translateY: translateOrigin.translate.y,
                    },{
                        translateX: translateOrigin.translate.x,
                    },{
                        scale:translateOrigin.scale
                    }
                ]
        }
        return(
            <Modal visible={this.state.visible}  transparent={true} onRequestClose={()=>{}}>
                <Animated.View
                    style={[styles.content,{top:areaOrigin.top,left:areaOrigin.left},transformContent]} >
                    {React.cloneElement(this.state.element)}
                </Animated.View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    content:{
    }
})