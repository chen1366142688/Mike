var amapFile = require('../../libs/amap-wx.js');
var config = require('../../libs/config.js');

// pages/searchArea/searchArea.js
Page({
  data: {
    tips: {},
    sessionKey:"",
    history:{},
    noHistory:true,
    cancel:false,
    userInput:"",
    roteList:false,
    clearHistory:false
  },
  onLoad: function (options) {
    var that=this;
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({ key: key });
    myAmapFun.getRegeo({
      iconPath: "../../img/marker.png",
      iconWidth: 22,
      iconHeight: 32,
      success: function (data) {
        that.setData({
          start_name: data[0].name
        })
        var cityName = data[0].regeocodeData.addressComponent.province;
        wx.setStorageSync("cityName", cityName)
        //成功回调
      },
      fail: function (info) {
        console.log("高德定位当前信息失败");
        //失败回调
        console.log(info)
      }
    })
    console.log(options)
    if(options.button_type == 'start'){
      this.data.sessionKey= "start";
    }else{
      this.data.sessionKey = "end";
    }
    /**
     *  请求用户历史记录
    */
    var unionId = wx.getStorageSync('unionId');
    wx.request({
      url: 'https://oilprice.chetuobang.com/oil-price/route/historyAddress?unionId='
,
  method:"GET",
  data:{
    unionId: unionId
  },
  success:function(res){
    console.log("调用成功，请求到用户历史记录")
    console.log(res)
    var HistoricalRecord=res.data;
    if(res.data.status == 200){
      var i = 0;
      for (var j in HistoricalRecord.data){
        i++;
      }
      if (i == 0){
        that.setData({
          noHistory:false,
          clearHistory:true
        })
      }
      that.setData({
        history: HistoricalRecord.data
      })
    }else{
      conosle.log("请求成功，但有问题！")
    }
    console.log(that.data.history)
  },
  fail:function(res){
    throw new("ERROR 又是服务器出错了，")
  }
    })
  },
  /**
   * 点击取消，清空input的值
  */
  clearInput:function(e){
    var that = this;
    wx.redirectTo({
      url: '/pages/navigation_car/navigation?navigation=index',
    })
    //console.log("点击了去洗哦")
    // that.setData({
    //   roteList: false,
    //   cancel: true,
    //   userInput: "",
    // });
    // that.setData({
    //   cancel:true,
    //   userInput:"",
    //   roteList:false
    // })
  },
    bindInput: function (e) {
    var that = this;
    if (e.detail.value == ""){
      that.setData({
        roteList: false,
        cancel: true
      });
    }
    var keywords = e.detail.value;
    var key = config.Config.key;
    var cityName = wx.getStorageSync('cityName');
    console.log("当前城市的名称：" + cityName);
    var myAmapFun = new amapFile.AMapWX({ key: key });
    myAmapFun.getInputtips({
      keywords: keywords,
      location: '',
      city: cityName,
      success: function (data) {
        console.log("这里是输入联想词的返回数据");
        console.log(data);
        if (data && data.tips) {
          that.setData({
            tips: data.tips,
            roteList:true,
            clearHistory:true,
            cancel:false
          });
        }

      }
    })
  },
  bindSearch: function (e) {
    var historyKeyword = e.target.dataset.value;
    // console.log(historyKeyword);
    // console.log(historyKeyword.addressGeo);
    if (historyKeyword != undefined){
      var keywords = historyKeyword.address;
      var location = historyKeyword.addressGeo
    }else{
      var keywords = e.target.dataset.keywords;
      var tips = this.data.tips;
      for (var i in tips) {
        if (tips[i].name == keywords) {
          var location = tips[i].location;
        }
      }
    }
    console.log("这里是location");
    var z =0;
    for(var i in location){
        z++;
    }
    if(z == 0){
      console.log(tips);
      for (var i in tips) {
        if (tips[i].name.indexOf('政府') != -1) {
          var location = tips[i].location;
        }
      }
    }
    console.log(location);
    // console.log("keywords的值是"+keywords);
    // console.log(location);
    // console.log(e);
    // console.log("keywords的key是" + this.data.sessionKey);
    wx.setStorage({
      key: this.data.sessionKey,
      data: keywords,
    })
    if (this.data.sessionKey == 'start'){
      var locationKey = 'start_location';
    }else{
      var locationKey = 'end_location';
    }
    wx.setStorage({
      key: locationKey,
      data: location,
    })
    if (historyKeyword == undefined) {
    var unionId = wx.getStorageSync('unionId');
    wx.request({
      url: 'https://oilprice.chetuobang.com/oil-price/route/recordAddress',
      // ?unionId=oJc0Xv830J4GOqM - 9GcGzACfXkL8&address=testaddressinfo&addressGeo=111.2323232,39.2323232
      data:{
        'unionId': unionId,
        'address': keywords,
        'addressGeo': location,
      },
      success:function(e){
        console.log(e);
      }
    })
    }
    var url = '/pages/navigation_car/navigation?navigation=index';
    console.log(url)
    wx.reLaunch({
      url: url
    })
  },
  clear:function(e){
    var that = this;
    var unionId = wx.getStorageSync('unionId');
    wx.request({
      url: 'https://oilprice.chetuobang.com/oil-price/route/clearAddress?unionId=',
      method:"GET",
      data:{
        unionId: unionId
      },
      success:function(res){
        that.setData({
          history: []
        })
        console.log("清空历史记录")
        console.log(res)
      },
      fail:function(info){
        console.log("clear Error")
      }
    })
  },
  onShareAppMessage: function () {

  }
})
