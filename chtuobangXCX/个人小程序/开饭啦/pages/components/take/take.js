var app = getApp()
Page({
  data: {
    take:"没有外卖小哥？雅美碟！肿么办。。",
    jin:"付款"
  },
  fuMoney:function(){
      //调起微信支付
      wx.requestPayment({
        'timeStamp': '',
        'nonceStr': '',
        'package': '',
        'signType': 'MD5',
        'paySign': '',
        'success':function(res){
            console.log(res)
        },
        'fail':function(res){
            console.log(res.data)
        }
    })  
  },
  })