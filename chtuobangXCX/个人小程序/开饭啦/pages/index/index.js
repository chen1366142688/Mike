//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    navItems:[
      {
        name:'食堂',
        url:'dishes'
      },
      {
        name:'外卖',
        url:'take',
        isSplot:true
      },
      {
        name:'外带',
        url:'out'
      },
      {
        name:'订单',
        url:'bill'
      },
      {
        name:'帐单',
        url:'bill',
        isSplot:true
      },
      {
        name:'报表',
        url:'bill'
      }
    ]
  },
  onLoad: function () {
    console.log('onLoad')
    wx.checkIsSupportSoterAuthentication({
      success:function(res) {
        console.log("这是调用成功返回的东西")
        console.log(res)
        // res.supportMode = [] 不具备任何被SOTER支持的生物识别方式
        // res.supportMode = ['fingerPrint'] 只支持指纹识别
        // res.supportMode = ['fingerPrint', 'facial'] 支持指纹识别和人脸识别
      },
      fail:function(info){
        console.log("这是失败的信息")
        console.log(info)
      }
    })
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.record']) {
          wx.authorize({
            scope: 'scope.record',
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              console.log("用户同意了使用此功能")
              wx.startRecord()
            },
            fail:function(info){
              console.log("用户拒绝了使用此功能")
              console.log(info)
              
            }
          })
        }
      }
    })








  }
    
})
