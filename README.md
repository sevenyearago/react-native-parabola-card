## qyparabola 添加购物车抛物线特效
## demo

<p align="center">
<img src="https://github.com/kliuj/react-native-parabola-card/blob/master/demo.gif">
</p>

### 用法
```javascript
npm install react-native-parabola-card
//引入
import {Parabola,ParabolaImageContainer} from '@iqiyi/rn-parabola';
//调用 ParabolaImageContainer 组件的 start 方法
showImg(options){
    this.refs.parabola.start(options,callback)
}
_renderItem(item,i){
    return(
        <Parabola onPress={this.showImg.bind(this)} key={i}>
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
this.refs.parabola.start(options,callback)  callback 为完成动画的回调

//ParabolaImageContainer  只需要传递 购物车坐标
{
endPointX:number,//抛物线结束的位置，距离屏幕左边的距离，
endPointY:number,//抛物线结束的位置，距离屏幕顶部的距离，
}

```
