var ur=encodeURIComponent(window.location.href.split("#")[0]);
//console.log(ur);
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
    if(xhr.readyState==4){
        if(xhr.status==200){
            doResponse(xhr);
        }else{
            //console.log('响应完成但有问题');
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
            'onMenuShareQZone'
        ]
    });
}

wx.ready(function () {
    //获取地址中URL参数
    var lol=location.search;
    var s=lol.substring(0,lol.length-13);
    wx.onMenuShareTimeline({
        title: '您有一句真心话，待查看',
        desc: '匿名真心话，为你打开TA的心扉',
        link: 'http://guestbook.chetuobang.com/main.html'+s,
        imgUrl: 'http://guestbook.chetuobang.com/images/ppt.jpg',
        success: function () {
            //alert("成功");
            // 用户确认分享后执行的回调函数
            window.location.href="http://guestbook.chetuobang.com/share.html";
        },
        cancel: function () {
            //alert("取消");
            // 用户取消分享后执行的回调函数
        }
    });
    // 分享给朋友
    wx.onMenuShareAppMessage({
        title: '您有一句真心话，待查看',
        desc: '匿名真心话，为你打开TA的心扉',
        link: 'http://guestbook.chetuobang.com/main.html'+s,
        imgUrl: 'http://guestbook.chetuobang.com/images/ppt.jpg',
        success: function () {
            // alert("成功");
            // 用户确认分享后执行的回调函数
            window.location.href="http://guestbook.chetuobang.com/share.html";
        },
        cancel: function () {
            //  alert("取消");
            // 用户取消分享后执行的回调函数
        }
    });
    wx.onMenuShareQQ({
        title: '您有一句真心话，待查看',
        desc: '匿名真心话，为你打开TA的心扉',
        link: 'http://guestbook.chetuobang.com/main.html'+s,
        imgUrl: 'http://guestbook.chetuobang.com/images/ppt.jpg',
        success: function () {
            // 用户确认分享后执行的回调函数
            //  alert("成功");
            window.location.href="http://guestbook.chetuobang.com/share.html";
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            //  alert("取消");
        }
    });
    wx.onMenuShareWeibo({
        title: '您有一句真心话，待查看',
        desc: '匿名真心话，为你打开TA的心扉',
        link: 'http://guestbook.chetuobang.com/main.html'+s,
        imgUrl: 'http://guestbook.chetuobang.com/images/ppt.jpg',
        success: function () {
            // 用户确认分享后执行的回调函数
            //  alert("成功");
            window.location.href="http://guestbook.chetuobang.com/share.html";
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            //  alert("取消");
        }
    });
    wx.onMenuShareQZone({
        title: '您有一句真心话，待查看',
        desc: '匿名真心话，为你打开TA的心扉',
        link: 'http://guestbook.chetuobang.com/main.html'+s,
        imgUrl: 'http://guestbook.chetuobang.com/images/ppt.jpg',
        success: function () {
            // 用户确认分享后执行的回调函数
            // alert("成功");
            window.location.href="http://guestbook.chetuobang.com/share.html";
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            // alert("取消");
        }
    });


});
wx.error(function (res) {
    alert(res.errMsg);  //打印错误消息。及把 debug:false,设置为debug:ture就可以直接在网页上看到弹出的错误提示
});