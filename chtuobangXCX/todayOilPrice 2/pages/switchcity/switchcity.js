//var city = require('../../utils/city.js');
//https://oilprice.chetuobang.com/oil-price/oilPrice?code=577
Page({
  data: {
    searchLetter: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    showLetter: "",
    winHeight: 0,
    tHeight:0,
    bHeight:0,
    startPageY:0,
    cityList:[],
    finalCityList:[],
    isShowLetter:false,
    scrollTop:0,
    city:"",
    hot:[],
    tempObj:"",
    locations:"北京",
    userInput: '',
    hide: false,
    guan:{},
    guanL:false,
    times:true,
  },
  clearInput: function () {
    this.setData({
      userInput: '',
      hide: false,
      times: true,
      guanL: true,
    });
  },
  bindFocus: function (e) {
    this.setData({
      hide: true
    })
  },
  blurFocus: function (e) {
    this.setData({
      hide: false
    })
  },
  submit:function(e){
    var that=this;
    var chengShi=that.data.cityList;
    var ui;
     ui = e.detail.value;
     console.log("输入了");
     console.log(ui);
     that.setData({
       times:false,
       hide:true
     })
     if(ui){
       for (var i = 0, obj = []; i < chengShi.length; i++) {
         if (chengShi[i].city.indexOf(ui) == -1) {
           console.log("没有匹配的关键词")
         } else {
           console.log("找到了")
           obj.push(chengShi[i].city)
           console.log(typeof (obj))
           that.setData({
             guanL: false,
             guan: obj
           })
         }
       }
     }else{
       that.setData({
         guanL:true,
         hide:false
       })
     }
    
    console.log(that.data.guan)
  },
  //根据下面列表跳转
  mast:function(e){
    var ct=e.currentTarget.dataset.city;
    console.log(ct)
    wx.redirectTo({
      url: '../index/index?name='+ct,
    })
  },
  //根据上面列表跳转
  matols:function(e){
    var that=this;
    var dexin;
    var selected=that.data.guan;
    dexin = e.currentTarget.id;
    var ct=selected[dexin];
    wx.redirectTo({
      url: '../index/index?name=' + ct,
    })
    console.log(selected[dexin])
  },

  onLoad: function (options) {
    var diZhi=options.code;
    var that=this;
    that.setData({
        locations:diZhi
    });
    //onload
    wx.request({
      url: 'https://oilprice.chetuobang.com/oil-price/oilcity',
      success:function(res){
        //console.log(res.data)
        that.setData({
          cityList: res.data
        })
        //console.log(that.data.cityList)
        var tempObj = [];
         var searchLetter = that.data.searchLetter;
         var cityList = that.data.cityList;
        //console.log(searchLetter.length)
        //console.log(cityList)
        for (var i = 0; i < searchLetter.length; i++) {
          var initial = searchLetter[i];
          var cityInfo = [];
          var tempArr = {};
          tempArr.initial = initial;
          for (var j = 0; j < cityList.length; j++) {
            if (initial == cityList[j].initial) {
              cityInfo.push(cityList[j]);
            }
          }
          tempArr.cityInfo = cityInfo;
          tempObj.push(tempArr);
        }
        var tempTwo = [];
        for (var x in tempObj) {
          if(tempObj[x].cityInfo.length != 0){
            tempTwo.push(tempObj[x]);
          }
        }
        console.log(tempObj);
        that.setData({
          finalCityList: tempTwo
        })
        //console.log(tempObj)
        
        var sysInfo = wx.getSystemInfoSync();
        //console.log(sysInfo);
        var winHeight = sysInfo.windowHeight;

        //添加要匹配的字母范围值
        //1、更加屏幕高度设置子元素的高度
        var itemH = winHeight / searchLetter.length;
        var tempObj = [];
        for (var i = 0; i < searchLetter.length; i++) {
          var temp = {};
          temp.name = searchLetter[i];
          temp.tHeight = i * itemH;
          temp.bHeight = (i + 1) * itemH;

          tempObj.push(temp)
        }
        that.setData({
          winHeight: winHeight,
          itemH: itemH,
          searchLetter: tempObj,
          cityList: cityList
        })

      }
    })
    ////console.log(city);
    
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  onShow: function () {
    // 生命周期函数--监听页面显示

  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载

  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数

  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  },
  searchStart: function (e) {
    var showLetter = e.currentTarget.dataset.letter;
    var pageY = e.touches[0].pageY;
    this.setScrollTop(this,showLetter);
    this.nowLetter(pageY,this);
      this.setData({
        showLetter: showLetter,
        startPageY: pageY,
        isShowLetter:true,
      })
  },
  searchMove: function (e) {
    var pageY = e.touches[0].pageY;
    var startPageY=this.data.startPageY;
    var tHeight=this.data.tHeight;
    var bHeight=this.data.bHeight;
    var showLetter = 0;
    //console.log(pageY);
    if(startPageY-pageY>0){ //向上移动
        if(pageY<tHeight){
          // showLetter=this.mateLetter(pageY,this);
          this.nowLetter(pageY,this);
        }
    }else{//向下移动
        if(pageY>bHeight){
            // showLetter=this.mateLetter(pageY,this);
            this.nowLetter(pageY,this);
        }
    }
  },
  searchEnd: function (e) {
    // //console.log(e);
    // var showLetter=e.currentTarget.dataset.letter;
    var that=this;
    setTimeout(function(){
      that.setData({
      isShowLetter:false
    })
    },1000)
    
  },
  nowLetter: function (pageY, that) {//当前选中的信息
    var letterData = this.data.searchLetter;
    var bHeight = 0;
    var tHeight = 0;
    var showLetter="";
    for (var i = 0; i < letterData.length; i++) {
      if (letterData[i].tHeight <= pageY && pageY<= letterData[i].bHeight) {
        bHeight = letterData[i].bHeight; 
        tHeight = letterData[i].tHeight;
        showLetter = letterData[i].name;
        break;
      }
    }

    this.setScrollTop(that,showLetter);

    that.setData({
      bHeight:bHeight,
      tHeight:tHeight,
      showLetter:showLetter,
      startPageY:pageY
      })
  },
  bindScroll:function(e){
    //console.log(e.detail)
  },
  setScrollTop:function(that,showLetter){
      var scrollTop=0;
      var cityList=that.data.cityList;
      var cityCount=0;
      var initialCount=0;
      for(var i=0;i<cityList.length;i++){
         if(showLetter==cityList[i].initial){
           scrollTop=initialCount*30+cityCount*41;
            break;
         }else{
            initialCount++;
            cityCount+=cityList[i].cityInfo.length;
         }
      }

      that.setData({
        scrollTop:scrollTop
      })
  },
  // bindCity:function(e){
  //   var city=e.currentTarget.dataset.city;
  //   this.setData({city:city})
  // }
})