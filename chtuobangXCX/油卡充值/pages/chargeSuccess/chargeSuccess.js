// pages/chargeSuccess/chargeSuccess.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money:"支付金额",
    date:"支付成功时间",
    carNum:"充值卡号",
    mobile:"充值手机号"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options)
      var that=this;
      that.setData({
        money: options.topMoney,
        carNum: options.carNumber,
        mobile: options.mobileNum,
        date:options.timeStamp
      })
      
  },
  /**
   * 返回主页
  */
  callBackHome:function(e){
    console.log("点击返回主页")
    wx.switchTab({
      url:'../index/index',
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
    return {
      title: '充值成功',
      path: '/pages/chargeSuccess/chargeSuccess'
    }
  }
})