$(function(){

    //-公用方法,两种情况都需要执行的函数
   //1用户是刚授权过来的。2.用户是经过别人的分享进来本页面的（不同之处是：1--包含制定字符串，2--没有制定字符串）
    //以下是方法：
    //1.获取地址中URL参数
    var lol=location.search;
    //GetRequest方法，用于获取用户的UID和access_token
    function GetRequest() {
        var url = location.search;
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }
    //调用GetRequest方法，传入参数，获取到用户的UID，存入session
    var Request = new Object();
    Request = GetRequest();
    var unionid,access_token;
    unionid = Request["unionid"];
    access_token = Request["access_token"];
    sessionStorage.uid= unionid;
    sessionStorage.token= access_token;
    //开始请求,提交用户信息入库
    function public() {
        $.ajax({
            type:"get",
            dataType:"jsonp",
            data:{"user":unionid},
            url:"http://message.chetuobang.com/create",
            success:function(status,code,data){
                //成功之后刷新当前页面
                // window.location.reload();
            },
            error:function(info){
                console.log("请求失败"+info);
            }
        });
    }
    //获取用户信息,填充用户头像和昵称
    function pic(){
        $.ajax({
            type:"GET",
            dataType:"json",
            data:"",
            url:"http://wzcx.chetuobang.com/wz_api/index.php?service=User.getBaseInfo&unionid="+unionid,
            success:function(data) {
                var result = eval(data);
                var pic = result.data.info.headimgurl;
                var name = result.data.info.nickname;
                sessionStorage.img = result.data.info.headimgurl;
                var user_text = "<img src=" + pic + " class=head>";
                $("#user").prepend(user_text);
                var user_info = '<span id="username">' + name + '</span>';
                $("#user").append(user_info);
            },
            error:function(info){
                console.log(info);
            }
        });
    }
    //3.4获取用户留言，填充用户的留言条数和留言内容，并且执行动画
    function bp(){
        $.ajax({
            type:"get",
            dataType:"jsonp",
            data:{"to_user":unionid},
            url:"http://message.chetuobang.com/get",
            success:function(data){
                console.log(data);
                var contentList="";
                for(var i=0;i<data.length;i++){
                    contentList="<div class='old'><b class='flow"+ranNum(1,3)+"'></b><span class='text'><span class='fa fa-heart' id='heart'></span>" + data[i].m_content + "</span></div>";
                    $('#content').append(contentList);
                }
                $(function () {
                    $("#content").barrager();
                });
                var uList="";
                for(var i=0;i<data.length;i++){
                    uList+="<li><input type='checkbox' class='radio' name="+data[i].m_id+"><span>"+data[i].m_content+"</span></li>";
                }
                $('#managebox ul').append(uList);
                var len="";
                if(!data.length){
                    len=0;
                }else{
                    len=data.length;
                }
                var num="<span class='num'>已收到<b id='num'>"+len+"</b>条真心话</span>";
                $("#user").append(num);
            },
            error:function(info){
                console.log(info);

            }
        });
        function getReandomTop() {
            var top = (Math.random() * 200).toFixed(1);
            return top;
        }
    }
    ////提交用户刚发送的留言
    function cliCks(){
        var _val = $("#txt");
        var value=_val.val();
        var unionid=sessionStorage.uid;
        console.log(value);
        console.log(unionid);
            $.ajax({
                type:"get",
                dataType:"jsonp",
                data:{"to_user":unionid,"content":value},
                url:"http://message.chetuobang.com/add",
                success:function(data){
                    console.log(data);
                    //3.4获取当前用户留言
                    $.ajax({
                        type:"get",
                        dataType:"jsonp",
                        data:{"to_user":unionid},
                        url:"http://message.chetuobang.com/get",
                        success:function(data){
                            var len="";
                            console.log(data.length);
                            if(!data.length){
                                len=0;
                            }else{
                                len=data.length;
                            }
                            $('#num').html(len);
                        },
                        error:function(info){
                            console.log("请求失败"+info);
                        }
                    });
                },
                error:function(){
                    $.dialog({
                        showTitle : false,
                        contentHtml : '<p>发送失败，请重新发送！</p>',
                        autoClose:2500
                    });
                }
            });
        }
    //删除留言
    $("#delete").click(function() {
        var oLi = $('#managebox li');
        var input = $('#managebox input');
        var c_len = input.length;
        for (var i = 0, m_id = []; i < c_len; i++) {
            if (input[i].checked == true) {
                m_id.push(input[i].name);
            }
        }
        //9.1屏蔽留言
        $.ajax({
            type:"get",
            dataType:"jsonp",
            data:{"m_id":JSON.stringify(m_id)},
            url:"http://message.chetuobang.com/shield",
            success:function(data){
                for(var i=0;i<c_len;i++){
                    if(input[i].checked==true){
                        oLi[i].remove();
                        $.dialog({
                            showTitle : false,
                            contentHtml : '<p>删除成功！</p>',
                            autoClose:2500
                        });
                        location.reload();
                    }
                }
            },
            error:function(info){
                console.log("请求失败"+info);
            }
        })
    });

    //2.判断。如果！=-1则表示找到规定字符串，说明这是用户刚授权的页面
    if(lol.indexOf("oauth") !=-1){
        //隐藏创建按钮，显示管理按钮
        $('#create').css('display','none');
        $('#manage').css('display','block');
        public();
        pic();
        bp();
    }else{
        //显示创建个人留言板，隐藏管理我的留言板
        $('#create').css('display','block');
        $('#manage').css('display','none');
        pic();
        bp();
    }
    (function () {
        var Barrager = function (ele, options) {
            var defaults = {
                wrap: ele
            };
            this.settings = $.extend({}, defaults, options || {});
            this._init();
            this.bindEven();
        };
        Barrager.prototype = {
            _init: function () {
                var item = $(this.settings.wrap).find("div");
                for (var i = 0; i < item.length; i++) {
                    item.eq(i).css({
                        top: this.getReandomTop()+ "px",
                    });
                }
                this.randomTime(0);
            },
            bindEven: function () {
                var _this = this;
                $("#send").on('click', function () {
                    _this._click(_this);
                });
            },
            getReandomTop: function () {
                var top = (Math.random() * 200).toFixed(1);
                return top;
            },
            getReandomTime: function () {
                var time =20000;
                return time ;
            },
            randomTime: function (n) {
                var obj = $('#content').find(".old");
                var _this = this;
                var len = obj.length;
                if (n >= len) {
                    n = 10;
                }
                setTimeout(function () {
                    n++;
                    _this.randomTime(n)
                }, 3000);
                var item = obj.eq(n), _w = item.outerWidth(!0);
                item.css('animation','conGo '+ranNum(8,12)+'s ease-in infinite');
                item.css('display','block');
            },
            _click: function (obj) {
                var _this = obj;
                var _val = $("#txt");
                var value=_val.val();
                if (_val.val() == "") {
                    $.dialog({
                        showTitle : false,
                        contentHtml : '<p>请留下一句真心话吧！</p>',
                        autoClose:2500
                    });
                    return false;
                }else {
                    $.dialog({
                        showTitle : false,
                        contentHtml : '<p>发送成功！</p>',
                        autoClose:2500
                    });
                    $(_this.settings.wrap).prepend("<div class='new'><b class='flow"+ranNum(1,3)+"'></b><span class='text'><span class='fa fa-heart' id='heart'></span>" + value + "</span></div>");
                    cliCks();
                    _val.val("");
                    var item = $('#content').find(".new");
                    for (var i = 0; i < item.length; i++) {
                        item.eq(i).css({
                            top: this.getReandomTop()+ "px",
                        });
                        item.css('animation','conGo '+ranNum(8,12)+'s ease-in infinite');
                        item.css('display','block');
                    }
                    setTimeout(function(){
                        var oCon=document.getElementById('content');
                        var oDiv=oCon.getElementsByTagName('div');
                        var len=oDiv.length;
                        remove('content','div','10','len-10');
                    }, 12000);
                    this.randomTime(0);
                }
            }
        };
        $.fn.barrager = function (opt) {
            var bger = new Barrager(this, opt);
        }
    })(jQuery);
});
