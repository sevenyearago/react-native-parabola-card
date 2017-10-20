/**
 * Created by kerwinliu on 2017/10/17.
 */
import React,{Component,PropTypes} from 'react'
import {
    StyleSheet,
    UIManager,
    TouchableOpacity,
    Modal,
    Dimensions,
    TouchableWithoutFeedback,
    Animated,
    View,
    Image
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
        cur._currentElement._owner._instance.measure((marginLeft, marginTop, width, height, left, top) => {
            UIManager
                .takeSnapshot(currentT, {format: 'png', quality: 1})
                .then(this.showImg.bind(this,left,top,width,height))
                .catch((error) => console.log(error));
        })

    }
    showImg(left,top,width,height,uri){
        this.props.onPress && this.props.onPress({left,top,width,height,uri})
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
            uri:null,
            visible:false,
            defaultAnimatedValues: {
                scale: new Animated.Value(1),
                translate: new Animated.ValueXY(0,0),
            }
        }
    }
    start(options,callback){
        console.log(options)
        this.displayOptions = options
        this.setState({
            visible:true,
            uri:options.uri
        })
        this._startAnimation(options,callback)
    }
    _startAnimation(options,callback){
        let animDuration = 400;
        let values = this.state.defaultAnimatedValues;

        // values.translate.setValue(new  Point(0, 0));

        let commonConfig = {
            duration: animDuration,
            // easing: show ? Easing.out(Easing.back()) : Easing.inOut(Easing.quad),
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
                    }
                ]
        }
        const transformImage = {
            transform: [
                {
                    scale:translateOrigin.scale
                }
            ]
        }
        return(
            <Modal visible={this.state.visible}  transparent={true}>
                <Animated.View
                    style={[styles.content,{top:areaOrigin.top,left:areaOrigin.left},transformContent]} >
                    <Animated.Image style={[contentSize,transformImage]} source={{uri:this.state.uri}} />
                </Animated.View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    content:{
    }
})