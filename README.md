## 点击添加购物车路径特效
## demo
### npm install react-native-parabola-card
<p align="center">
<img src="https://github.com/kliuj/react-native-parabola-card/blob/master/demo.gif">
</p>
录制的gif是视频压缩的，所以看起来不够流畅，实际上ios模拟器和安卓真机没有这种抖动现象，可以查看ios和android.mp4

### 用法
```javascript
//引入
import {Parabola,ParabolaImageContainer} from 'react-native-parabola-card';
//调用 ParabolaImageContainer 组件的 start 方法
showImg(options){
    this.refs.parabola.start({...options,element:this.ele,callback)
}
_renderItem(item,i){
    return(
        <Parabola onPress={this.showImg.bind(this)} key={i} ref={(ele)=> this.ele = ele}>
            <View style={styles.item} >
                <Image source={{uri:item.icon}} style={{height:69,width:120}}/>
                <Text style={{marginLeft:20}}>{item.gameName}</Text>
            </View>
        </Parabola>
    )
}
render() {
    return (
        <View style={{flex:1}}>
            {
                testData.map((item,i)=>{
                    return this._renderItem(item,i)
                })
            }
            <View style={styles.card}>
                <View style={{flex:1,alignItems:'center',borderRightColor:'#FFF',borderRightWidth:1}}>
                    <Text style={{color:'#fff'}}>全部缓存</Text>
                </View>
                <DownLoad ref="download"/>
            </View>
            <ParabolaImageContainer ref="parabola" endPointX={width*3/4} endPointY={height - 20}/>
        </View>
    )
}


```

### Props 属性介绍

```javascript
//Parabola 用于包裹被点击的商品
0.0.4
this.refs.parabola.start(options,callback)  callback 为完成动画的回调

//ParabolaImageContainer  只需要传递 购物车坐标
{
endPointX:number,//抛物线结束的位置，距离屏幕左边的距离，
endPointY:number,//抛物线结束的位置，距离屏幕顶部的距离，
}

0.0.5
兼容react 16 
start 方法传入实例组件参数 element:this.ele
this.refs.parabola.start({...options,element:this.ele,callback)

```
