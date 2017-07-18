// pages/manage/manage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    insertLimitStatus:true,
    'route':"",
    'redirStatus': 0,
    startName: "",
    endName: "",
    add:true,
    deletes:true,
    page:"page"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var start_name = wx.getStorageSync('start');
    var end_name = wx.getStorageSync('end');
    this.setData({
      startName: start_name,
      endName: end_name
    })
    /*
    *判断用户是从删除进来的还是从添加进来的当前页面
    */
    var page=that.data.page;
    if(options.route == "add"){

      that.setData({
        deletes:true,
        add:false,
        page:page
        })
    }
     if(options.route == "deletes"){
      that.setData({
        add:true,
        deletes:false,
        page:""
      })
    }
    if(options.limit == 3){
      that.setData({
          insertLimitStatus:false,
          add: true,
          page: ""
        })
      that.setData({
        redirStatus: 1
      })
        setTimeout(function(){
          that.setData({
            insertLimitStatus: true
          }) 
        },2000);
    }
    var unionId = wx.getStorageSync('unionId');
    wx.request({
      url: 'https://oilprice.chetuobang.com/oil-price/route/routeList',
      method: 'GET',
      data: {
        unionId: unionId
      },
      // "first": {
      //   "titleRoute": "添加"
      // },
      // "second": {
      //   "titleRoute": "未添加"
      // },
      // "third": {
      //   "titleRoute": "未添加"
      // } 
      success: function (res) {
        //console.log(res);
        if (res.statusCode == 200) {

          var result = res.data.data;
          console.log(result);
          for(var i in result){
            if(i == 0){
                result[i].margin = '6';
            }else{
                result[i].margin = '14';
            }
          }
          that.setData({
            route: result
          })
          console.log(that.data.route);
        }
      },
      fail: function (res) {
        console.log("访问失败");
      }
    })
  },
  /**
   * 删除路线
   */
  deleteRoute:function(e){
    var that = this;
    // wx.showLoading({
    //   title: '正在删除...',
    // })
    var idValue = e.currentTarget.dataset.value;
    console.log(e.currentTarget.dataset.value);
    wx.request({
      url: 'https://oilprice.chetuobang.com/oil-price/route/deleteRoute?routeId=' + idValue,
      success:function(res){
        if (res.data.status == 200)
        console.log("删除成功");
        // var url = '/pages/navigation_car/navigation?deleteStatus=1';
        var url = '/pages/manage/manage';
        console.log(url)
        that.setData({
          redirStatus:1
        })
        var unionId = wx.getStorageSync('unionId');
        wx.request({
          url: 'https://oilprice.chetuobang.com/oil-price/route/routeList',
          method: 'GET',
          data: {
            unionId: unionId
          },
          // "first": {
          //   "titleRoute": "添加"
          // },
          // "second": {
          //   "titleRoute": "未添加"
          // },
          // "third": {
          //   "titleRoute": "未添加"
          // } 
          success: function (res) {
            //console.log(res);
            if (res.statusCode == 200) {

              var result = res.data.data;
              console.log(result);
              for (var i in result) {
                if (i == 0) {
                  result[i].margin = '6';
                } else {
                  result[i].margin = '14';
                }
              }
              that.setData({
                route: result
              })
             // wx.hideLoading();
              console.log(that.data.route);
            }
          },
          fail: function (res) {
            console.log("访问失败");
          }
        })
        // wx.redirectTo({
        //   url: url
        // })
        console.log(res)
      },
      fail:function(res){
        console.log("删除路线失败");
        console.log(res)
      }
    })
  },
  /**
 * 添加路线-调用后台添加接口
 * return bool
 */
  insertRoute: function (e) {
    if (e.detail.value.route == "") {
      return;
    }
    var routeName = e.detail.value.route;
    var start_name = wx.getStorageSync('start');
    var end_name = wx.getStorageSync('end');
    var unionId = wx.getStorageSync('unionId');
    var start_location = wx.getStorageSync('start_location');
    var endGeo = wx.getStorageSync('end_location');
    wx.request({
      url: 'https://oilprice.chetuobang.com/oil-price/route/addRoute',
      method: 'GET',
      data: {
        unionId: unionId,
        startAddress: start_name,
        endAddress: end_name,
        startGeo: start_location,
        endGeo: endGeo,
        routeName: routeName
      },
      success: function (res) {
        console.log(res);
        if (res.data.status == 200) {
          var url = '/pages/navigation_car/navigation?navigation=index';
          console.log(url)
          wx.reLaunch({
            url: url
          })
        } else {
          var url = '/pages/manage/manage?limit=3';
          console.log(url)
          wx.reLaunch({
            url: url
          })
        }
      },
      fail: function (res) {
        console.log("访问失败");
      }
    })

  },
  /**
   * 添加路线，取消提交
   */
  formResetaction: function () {
    wx.reLaunch({
      url: "/pages/navigation_car/navigation?navigation=index"
    })
  },
  /**
   * 用户输入路线名称的判断
  */
  routeName:function(e){
    console.log("用户输入的信息")
    console.log(e.detail.value)
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
      console.log("隐藏起来了");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var redirStatus = this.data.redirStatus;
    console.log("redirStatus的值是："+redirStatus);
    if (redirStatus == 1){
      var url = '/pages/navigation_car/navigation';
      console.log(url)
      wx.reLaunch({
        url: url
      })
    }
    
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