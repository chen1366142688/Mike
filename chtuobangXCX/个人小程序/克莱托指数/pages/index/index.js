//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    weightInfo:'',
    heightInfo:''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onload');
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      console.log(userInfo)
      that.setData({
        userInfo: userInfo
      })
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /*
  *点击计算判断并跳转
  */
  btn:function(e){
    var that=this;
    var weight = that.data.weightInfo;
    var height = that.data.heightInfo;
    console.log(/\d/.test(height))
    if ((weight == '') || (height == '') ){
      wx.showModal({
        title: '提示',
        content: '亲，请输入完整信息',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    } else if (weight < 30){
      wx.showModal({
        title: '提示',
        content: '我猜你的体重一定大于30kg',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    }else if(height < 120){
      wx.showModal({
        title: '提示',
        content: '我猜你的身高一定大于120cm',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    } else if (! /\d/.test(weight)){
      console.log(/\d/.test(weight))
      wx.showModal({
        title: '提示',
        content: '请输入数字',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    } else if (! /\d/.test(height)) {
      wx.showModal({
        title: '提示',
        content: '请输入数字',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    }else{
      wx.navigateTo({
        url: '../result/result?height=' + height + '&&weight=' + weight,
      })
    }
    
  },
  /**
   * 身高失去焦点的时候
  */
  height:function(e){
    var that=this;
    var heightInfo = e.detail.value;
    console.log(heightInfo)
    that.setData({
      heightInfo: heightInfo
    })
    // if (heightInfo == '') {
    //   wx.showModal({
    //     title: '提示',
    //     content: '请输入你的身高',
    //     showCancel: false,
    //     success: function (res) {
    //       if (res.confirm) {
    //         console.log('用户点击确定')
    //       }
    //     }
    //   })
    // } else if (heightInfo <120){
    //   wx.showModal({
    //     title: '提示',
    //     content: '我猜你的身高一定大于120cm',
    //     showCancel: false,
    //     success: function (res) {
    //       if (res.confirm) {
    //         console.log('用户点击确定')
    //       }
    //     }
    //   })
    // } else {
    //   that.setData({
    //     heightInfo: heightInfo
    //   })
    // }
  },
  /**
   * 体重失去焦点的时候
  */
  weight:function(e){
    var that=this;
    var weightInfo = e.detail.value;
    that.setData({
      weightInfo: weightInfo
    })
    // if (weightInfo == ''){
    //   wx.showModal({
    //     title: '提示',
    //     content: '请输入你的体重',
    //     showCancel: false,
    //     success: function (res) {
    //       if (res.confirm) {
    //         console.log('用户点击确定')
    //       }
    //     }
    //   })
    // } else if (weightInfo < 30){
    //   wx.showModal({
    //     title: '提示',
    //     content: '我猜你的体重一定大于30kg',
    //     showCancel: false,
    //     success: function (res) {
    //       if (res.confirm) {
    //         console.log('用户点击确定')
    //       }
    //     }
    //   })
    // }else{
    //   that.setData({
    //     weightInfo: weightInfo
    //   })
    // }
   
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
