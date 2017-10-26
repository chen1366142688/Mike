//index.js
var amapFile = require('../../libs/amap-wx.js');
var config = require('../../libs/config.js');
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    oli93Price:5.55,
    oli97Price: 5.99,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this;
    wx.getLocation({
      success: function(res) {
        console.log("获取到当前用户地理位置：如下")
        console.log(res)
        var key = config.Config.key;
        var myAmapFun = new amapFile.AMapWX({ key: key });
        myAmapFun.getRegeo({
          //iconPath: "../../img/marker.png",
          iconWidth: 22,
          iconHeight: 32,
          location: res.longitude + "," + res.latitude,
          success: function (data) {
            console.log("高德定位当前信息");
            console.log(data);
            console.log("定位到当前省份："+data[0].regeocodeData.addressComponent.province)  
            var ThisCity = data[0].regeocodeData.addressComponent.province;
            that.setData({
              motto:ThisCity
            })          
          },
          fail: function (info) {
            console.log("高德定位当前信息失败");
            //失败回调
            console.log(info)
          }
        })
      },
    })



    
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
