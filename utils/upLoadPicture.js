// // 选择图片
// chooseImg= async()=>{
//   let res= await wx.chooseMedia({
//     count: 9,
//     mediaType: ['image','video'],
//     sourceType: ['album', 'camera'],
//     maxDuration: 30,
//     camera: 'back',
//   });
//   this.setData({
//     srcI:res.tempFiles[0].tempFilePath
//   })
//   console.log("选择图片： 获得本地地址",res)
// }

// // 上传图片
// sendImg= async()=>{
//     let res= await wx.p.uploadFile({
//       url: "https://historyhangqin.com:8083/picture/upload",
//       method: 'POST',
//       filePath: this.data.srcI,
//       name: 'file',
//     });
//     console.log("上传图片：获得数据库地址",res)
//     this.setData({
//       DMSsrcI:res.data.split("\"")[9]
//     })
// }

// upLoadPicture=()=>{
//   chooseImg();
//   sendImg();
// }

// module.exports = {
//   upLoadPicture()
// }