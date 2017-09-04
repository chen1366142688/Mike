// pages/result/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    results:'',
    height:'',
    weight:'',
    bug:'bug',
    c1:true,
    c2: true,
    c3: true,
    c4: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log(options)
    that.setData({
      height:options.height+'cm',
      weight:options.weight+'kg'
    })
    var height = options.height;
    height=height/100;
    console.log(height);
    var weight = options.weight;
    var c = parseFloat(weight / (height * height)).toFixed(1);
    console.log(c);
    if(c<18.5){
      c='('+c+')偏瘦';
      that.setData({
        c1:false
      })
    } else if (c > 18.5 && c < 24){
      c = '(' + c + ')正常';
      that.setData({
        c2: false,
        c1:true
      })
    }else if(c>24 && c<28){
      c = '(' + c + ')肥胖前期';
      that.setData({
        c3: false,
        c1: true,
        c2:true
      })
    }else{
      c = '(' + c + ')肥胖';
      that.setData({
        c4: false,
        c1: true,
        c2: true,
        c3:true
      })
    }
    that.setData({
      results:c
    })
    console.log("指数为:" + c);
  },
  callBackIndex:function(e){
    wx.reLaunch({
      url: '../index/index',
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