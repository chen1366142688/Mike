var utils=require('../../utils/util.js');
// pages/order/order.js
Page({
  data: {
    hide:true,
    results:[],
    len:'0',
    no:true,
    nos:true
  },
  failReason:function(e){
      this.setData({
          hide:false
      })
  },
  closeWindow:function(e){
      this.setData({
          hide:true
      })
  },
  onLoad: function (options) {
    var that=this;
    /**
     * 请求用户的点单详情
    */
    var unionId=wx.getStorageSync('unionId');
    wx.request({
      url: 'https://oilcard.chetuobang.com/oilcard_recharge/topupHistory/' + unionId,
      method:'GET',
      success:function(res){
        console.log("请求成功，下面是用户的充值订单：")
       
        console.log(res.data.code)
        if (res.data.code == 1  ){
          var historyList = res.data.results;
          
          if (historyList == "NULL"){
            that.setData({
              no: false,
              nos:true
            })
          } else {
            that.setData({
              no: true,
              nos:false
            })
            var g = 0;
          for (var f in historyList) {
            g++;
          }
            that.setData({
              results: res.data.results,
              len: g
            })
          }
        }else{
          that.setData({
            no: false,
            nos: true
          })
        }
       
        
       
        
      },
      fail:function(info){
        console.log("请求后端接口失败了，下面是失败信息详情：")
        console.log(info)
      }
    })
    
    
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onHide: function () {
  
  },
  onUnload: function () {
  
  },
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
      title: '充值记录',
      path: '/pages/order/order'
    }
  }
})
//时间戳转换时间  
function toDate(number) {
  var n = number * 1000;
  var date = new Date(n);
  var Y = date.getFullYear() + '/';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  return (Y + M + D)
}  