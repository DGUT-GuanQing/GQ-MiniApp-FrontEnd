// 2.request.js 这个文件是二次封装的逻辑文件
import { navigateTo } from './navigateTo.js'

// 引入公用url
const {baseUrl}=require('./env').dev //这里用的是ES6的写法
module.exports={
// 二次封装wx.request
request:(url,method,data,state)=>{
  var app = getApp()
// url： 为网络接口后面要拼接的动态路径
//method :为请求方式
//data:为要传递的参数 object类型
//state:这里我是为了添加不添加子域名用的默认给了一个true
  let _url=`${baseUrl}/${state? "子域名":""}${url}` //子域名按需添加
// 我们需要通过构建promise来将接受的数据导出
 return  new Promise((resolve,reject)=>{
  wx.request({
    url:_url, 
    data:data,
    method:method,
    header:{
      'token':app.globalData.token,
     
    },
    //成功回调
    success:(res)=>{
      // 成功，如果code是3002
      console.log(res.data.code)
      // navigateTo('/pages/schoolCentralCertification/schoolCentralCertification')
      if (res.data.code==3002) {
        // console.log("1111111111111111111111111111111111111111111")
        // wx.navigateTo({
        //   url:'../pages/schoolCentralCertification/schoolCentralCertification'
        // })
        navigateTo('/pages/schoolCentralCertification/schoolCentralCertification')
        console.log("222222222222222222222222222222222")
      }
      
      //成功抛出
      resolve(res.data)
    },
    //失败回调
    fail:()=>{
    //失败抛出
      reject("请求失败")
    },
  })
 }) 
},

requestPOST:(url,method,data,state)=>{
  var app = getApp()
// url： 为网络接口后面要拼接的动态路径
//method :为请求方式
//data:为要传递的参数 object类型
//state:这里我是为了添加不添加子域名用的默认给了一个true
  let _url=`${baseUrl}/${state? "子域名":""}${url}` //子域名按需添加
// 我们需要通过构建promise来将接受的数据导出
 return  new Promise((resolve,reject)=>{
  wx.request({
    url:_url, 
    data:data,
    method:method,
    header:{
      'token':app.globalData.token,
      'content-type':'application/x-www-form-urlencoded'
    },
    //成功回调
    success:(res)=>{

      // 成功，如果cood是3002
      console.log(res.data.code)
      
      if (res.data.code==3002) {
        console.log("1111111111111111111111111111111111111111111")
        // wx.navigateTo({
        //   url:'../pages/schoolCentralCertification/schoolCentralCertification'
        // })
        navigateTo('/pages/schoolCentralCertification/schoolCentralCertification')
        console.log("222222222222222222222222222222222")
      }
      
      //成功抛出
      resolve(res.data)
    },
    //失败回调
    fail:()=>{
    //失败抛出
      reject("请求失败")
    },
  })
 }) 
}

}
