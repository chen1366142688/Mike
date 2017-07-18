// pages/edit/edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startName:"",
    endName:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var start_name = wx.getStorageSync('start');
    var end_name = wx.getStorageSync('end');
    this.setData({
      startName:start_name,
      endName:end_name
    })
  },
/**
 * 添加路线-调用后台添加接口
 * return bool
 */
insertRoute:function(e){
  if (e.detail.value.route == ""){
    return ;
  }
  var routeName = e.detail.value.route;
  var start_name = wx.getStorageSync('start');
  var end_name = wx.getStorageSync('end');
  var unionId = wx.getStorageSync('unionId');
  var start_location = wx.getStorageSync('start_location');
  var endGeo = wx.getStorageSync('end_location');
  wx.request({
    url: 'https://oilprice.chetuobang.com/oil-price/route/addRoute',
    method:'GET',
    data:{
      unionId: unionId,
      startAddress: start_name,
      endAddress:end_name,
      startGeo: start_location,
      endGeo: endGeo,
      routeName:routeName
    },
    success:function(res){
      console.log(res);
      if (res.data.status==200){
        var url = '/pages/navigation_car/navigation?navigation=index';
        console.log(url)
        wx.reLaunch({
          url: url
        })
      }else{
        var url = '/pages/manage/manage?limit=3';
        console.log(url)
        wx.navigateTo({
          url: url
        })
      }
    },
    fail:function(res){
        console.log("访问失败");
    }
  })

},
/**
 * 添加路线，取消提交
 */
formResetaction:function(){
  wx.reLaunch({
    url: "/pages/navigation_car/navigation?navigation=index"
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