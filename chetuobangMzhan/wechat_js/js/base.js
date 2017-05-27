
var ur=encodeURIComponent(window.location.href.split("#")[0]);
//console.log(ur);
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
    if(xhr.readyState==4){
        if(xhr.status==200){
            doResponse(xhr);
        }else{
            console.log('响应完成但有问题');
        }
    }
};
xhr.open('GET','http://wzcx.chetuobang.com/wz_api/?service=default.jsapi&url='+ur,false);
xhr.send(null);

function  doResponse(xhr){
    //console.log('开始处理响应数据...');
    var obj = JSON.parse(xhr.responseText);
    //console.log(obj);
    var appId,nonceStr,rawString,signature,timestamp,url;
    appId=obj.data.appId;
    nonceStr=obj.data.nonceStr;
    rawString=obj.data.rawString;
    //rawString=rawString.slice(13);
    signature=obj.data.signature;
    timestamp=obj.data.timestamp;
    url=obj.data.url;

    //console.log(signature+"第一次输出");
    wx.config({
        debug:  false,  //调式模式，设置为ture后会直接在网页上弹出调试信息，用于排查问题
        appId: appId,
        timestamp: timestamp,
        nonceStr: nonceStr,
        signature: signature,
        jsApiList: [  //需要使用的网页服务接口
            'checkJsApi',  //判断当前客户端版本是否支持指定JS接口
            'onMenuShareTimeline', //分享给好友
            'onMenuShareAppMessage', //分享到朋友圈
            'onMenuShareQQ',  //分享到QQ
            'onMenuShareWeibo', //分享到微博
            'onMenuShareQZone',
            'chooseImage',
            'previewImage',
            'uploadImage'
        ]
    });
}
wx.ready(function () {
    wx.onMenuShareTimeline({
        title: '车托帮查违章',
        desc: '北京车托帮网络科技有限公司',
        link: 'http://wzcx.chetuobang.com',
        imgUrl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3217327445,710137008&fm=117&gp=0.jpg',
        success: function () {
            //alert("成功");
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            //alert("取消");
            // 用户取消分享后执行的回调函数
        }
    });
    // 分享给朋友
    wx.onMenuShareAppMessage({
        title: '查违章', // 商品名
        desc: '北京车托帮网络科技有限公司', // 店铺名
        link: 'http://wzcx.chetuobang.com', // 商品购买地址
        imgUrl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3217327445,710137008&fm=117&gp=0.jpg', // 分享的图标
        success: function () {
            // alert("成功");
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            //  alert("取消");
            // 用户取消分享后执行的回调函数
        }
    });
    wx.onMenuShareQQ({
        title: '查违章', // 分享标题
        desc: '北京车托帮网络科技有限公司', // 分享描述
        link: 'http://wzcx.chetuobang.com', // 分享链接
        imgUrl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3217327445,710137008&fm=117&gp=0.jpg', // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
            //  alert("成功");
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            //  alert("取消");
        }
    });
    wx.onMenuShareWeibo({
        title: '查违章', // 分享标题
        desc: '北京车托帮网络科技有限公司', // 分享描述
        link: 'http://wzcx.chetuobang.com', // 分享链接
        imgUrl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3217327445,710137008&fm=117&gp=0.jpg', // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
            //  alert("成功");
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            //  alert("取消");
        }
    });
    wx.onMenuShareQZone({
        title: '查违章', // 分享标题
        desc: '北京车托帮网络科技有限公司', // 分享描述
        link: 'http://wzcx.chetuobang.com', // 分享链接
        imgUrl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3217327445,710137008&fm=117&gp=0.jpg', // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
            // alert("成功");
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            // alert("取消");
        }
    });
    //拍照或者从手机相册中选取图片
    var images = {
        localId: [],
        serverId: []
    };
    document.querySelector('#done').onclick = function () {
        wx.chooseImage({
            success: function (res) {
                images.localId = res.localIds;
                $("#pic").find("img").attr("src", images.localId);
                //alert(res.localIds);
                alert("您以选择"+res.localIds.length+"图片");
                $('#pic').css('display','block');
            }
        });
    };
   /* //预览图片接口
    document.querySelector('#lan').onclick = function () {
        wx.previewImage({
            current:"",
            urls: []
        });
    };*/
    //上传图片接口
    // 5.3 上传图片
    document.querySelector('#toop').onclick = function () {
        if (images.localId.length == 0) {
            alert('请先使用 chooseImage 接口选择图片');
            return;
        }
        var i = 0, length = images.localId.length;
        images.serverId = [];
        function upload() {
            wx.uploadImage({
                localId: images.localId[i],
                isShowProgressTips: 1,
                success: function (res) {
                    console.log(res);
                    i++;
                   // alert('已上传：' + i + '/' + length);
                    images.serverId.push(res.serverId);
                    var uid=sessionStorage.uid;
                    $.ajax({
                       type:"GET",
                        url:"http://wzcx.chetuobang.com/wz_api/?service=media.index&media_id="+res.serverId+"&unionid="+uid,
                        data:"",
                        success:function(data){
                            var obj=data;
                            if(obj.ret==200){
                                var plate_no=obj.data[0].plate_no;
                                var select=plate_no.slice(0,1);
                                var rmb=plate_no.slice(1,7);
                                var vin=obj.data[0].vin;
                                var engine_no=obj.data[0].engine_no;
                                var model=obj.data[0].model.slice(0,3);
                                $('#chePai').val(rmb);
                                $('#cheJia').val(vin);
                                $('#faDong').val(engine_no);
                                $('#pinPai').val(model);
                                $('.select').val(select);
                                $('#pic').css('display','none');
                            }else if(obj.ret==401 || obj.ret==402){
                                alert(obj.msg);
                            }
                        },
                        error:function(info){
                            console.log(info);
                            alert("上传失败，请上传正确格式到照片");
                        }
                    });
                    if (i < length) {
                        upload();
                    }

                },
                fail: function (res) {
                    alert(JSON.stringify(res));
                }
            });
        }
        upload();
    };
});
wx.error(function (res) {
    alert(res.errMsg);  //打印错误消息。及把 debug:false,设置为debug:ture就可以直接在网页上看到弹出的错误提示
});