var QQMapWX = require('../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city:"hello world"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //定位到当前城市
    var that = this
    qqmapsdk = new QQMapWX({
      key: 'SFHBZ-3IUK4-EMAUV-DBVJA-SSHTQ-EHBOO'
    });
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        that.setData({
          lat: latitude,
          long: longitude
        })
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function (res) {
            console.log(res);
            that.setData({
              city: res.result.ad_info.city
            })
            //发送请求获取当前城市的今日油价******************************
          },
          fail: function (res) {
            console.log(res);
          },
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})