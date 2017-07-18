var app=getApp();
// pages/myself/myself.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    phoneNumber:'绑定手机号'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
 

  binPhone:function(e){
    var that=this;
    console.log("用户点击后获取到的参数")
    console.log(e)
    var phoneNumberInfo=that.data.phoneNumber;
    console.log(phoneNumberInfo)
    if (phoneNumberInfo == "绑定手机号"){
        wx.navigateTo({
          url: '../bindPhone/bindPhone',
        })
    }else{
      wx.navigateTo({
        url: '../hasBindPhone/hasBindPhone?phoneNumber=' + phoneNumberInfo,
      })
    }
    
  },
  geRenXinXi:function(e){
    var that=this;
    var phoneNumber = that.data.phoneNumber;
      wx.navigateTo({
        url: '../hasBindPhone/hasBindPhone?phoneNumber=' + phoneNumber,
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
    var that = this;
    
    /**
  * 判断用户是否绑定手机号
 */
    var unionId = wx.getStorageSync("unionId");
    wx.request({
      url: 'https://oilcard.chetuobang.com/oilcard_recharge/binded/' + unionId,
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      data: {
        unionId: unionId
      },
      success: function (res) {
        console.log("请求成功，下面是用户是否绑定手机号的信息");
        console.log(res)
        if (res.data.code == 1) {
          if (res.data.results.isBind == false) {
            console.log("用户是真的没有绑定手机号啊");
          } else {
            that.setData({
              phoneNumber: res.data.results.mobile
            })
          }
        }
      },
      fail: function (info) {
        console.log("请求失败了哦，必须是服务器的问题")
        console.log(info)
        wx.showToast({
          title: '服务器出错了',
          icon: 'error',
          duration: 2000
        })
      }
    })
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