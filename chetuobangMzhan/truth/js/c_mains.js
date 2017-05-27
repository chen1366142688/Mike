$(function () {
    $('#close').click(function () {
        $('#opc').css('display','none');
    });
    $('#manage').click(function () {
        $('#opc').css('display','block');
    });
    /*$('.fa-heart').click(function () {
        $('.fa-heart').css('color','#fe6164');
    });*/
});
function ranNum (x,y){
    return Math.floor((Math.random()*(y-x))+x);
}
$(function () {
    $("#content").barrager();
});
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
            var time = 10000;
            return time;
        },
        randomTime: function (n) {
            var obj = $(this.settings.wrap).find("div");
            var _this = this;
            var len = obj.length;
            if (n >= len) {
                n = 10;
            }
            if(len>=6){
                remove('content','div',6,len-6)
            }
            setTimeout(function () {
                n++;
                _this.randomTime(n)
            }, 3000);
            var item = obj.eq(n), _w = item.outerWidth(!0);
            item.css('animation','conGo '+ranNum(7,12)+'s linear infinite');
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
                var unionid=sessionStorage.uid;
                //提交发送内容
                $.ajax({
                    type:"get",
                    dataType:"jsonp",
                    data:{"to_user":unionid,"content":value},
                    url:"http://message.chetuobang.com/add",
                    success:function(data){
                        console.log(data);
                        //提交成功
                        $.ajax({
                            type: "get",
                            dataType: "jsonp",
                            data: {"to_user": unionid},
                            url: "http://message.chetuobang.com/get",
                            success: function (data) {
                                $('#num').html(data.length);
                                $(_this.settings.wrap).prepend("<div><b class='flow"+ranNum(1,3)+"'></b><span class='text'><span class='fa fa-heart' id='heart'></span>" + value + "</span></div>");
                                _val.val("");
                                window.location.reload();
                            }
                        })
                    },
                    error:function(info){
                        console.log("请求失败"+info);
                    }
                });
            }
        }
    };
    $.fn.barrager = function (opt) {
        var bger = new Barrager(this, opt);
    }
})(jQuery);
///////////////////////////////////////////////////////////////
function goUl() {
    var oUl1=document.getElementById('ul_fir');
    var oUl2=document.getElementById('ul_sec');
    var oTxt=document.getElementById('txt');
    var oLi=oUl1.getElementsByTagName('li');
    var oLi2=oUl2.getElementsByTagName('li');
    var len=oLi.length;
    var len2=oLi2.length;
    for(var i=0;i<len;i++){
        oLi[i].onclick=function () {
            oTxt.value=this.innerHTML;
        }
    }
    for(var j=0;j<len2;j++){
        oLi2[j].onclick=function () {
            oTxt.value=this.innerHTML;
        }
    }
}
goUl();

function addRed() {
    $('#content').find("#heart").click(function () {
        $('#heart').css('color','#fe6164');
    });
}
addRed();

function ranNum (x,y){
    return Math.floor((Math.random()*(y-x))+x);
}

function remove(oparent,ochild,start,offset){
    var  parent  = document.getElementById(oparent), // 获取父级元素
        chilren = parent.querySelectorAll(ochild), // 获取子级元素
        len     = chilren.length,// 子元素的长度
        start   = start || 0, // 开始的位置
        offset  = offset ? start+offset : len; // 删除的数量，offset大于0，如果offset存在的话，那么开始位置加上位移，否则就是元素的长度剩余的长度；
    if(len<=start) return;
    for(var i = start; i< offset;i++ ){
        parent.removeChild(chilren[i]);
    }
}

function toggle() {
    var oBox=document.getElementById('box');
    var oUl=oBox.getElementsByTagName('ul');
    var oBtn=document.getElementById('huan');
    var n=0;
    oBtn.onclick=function () {
        for(var i=0;i<oUl.length;i++){
            oUl[i].style.display='none';
        }
        if(n>oUl.length-2) {
            n=0;
        }
        else {
            ++n;
        }
        oUl[n].style.display='block';
    }
}

$(function(){
    //1.获取地址中URL参数
    var lol=location.search;

    //一。2.判断。如果！=-1，说明这是用户刚授权的页面，执行if
    if(lol.indexOf("oauth") !=-1){
        //隐藏创建按钮，显示管理按钮
        $('#create').css('display','none');
        $('#manage').css('display','block');
    // 3.GetRequest方法，用于获取用户的UID和access_token
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
    //4.调用GetRequest方法
        var Request = new Object();
        Request = GetRequest();
        var unionid,access_token;
        unionid = Request["unionid"];
        access_token = Request["access_token"];
        sessionStorage.uid= unionid;
        sessionStorage.token= access_token;
        //5.获取到用户信息
        var url=location.search;
        //6.判断用户地址是否具备UID和access_token，如果OK，则执行以下步骤，否则，return false
        IsLoad(url,function(res){
            //7.定义随机添加class flow1,2,3方法
            function ranNum (x,y){
                return Math.floor((Math.random()*(y-x))+x);
            }
            //8.如果res为TRUE
            if(res){
                //8.1提交用户信息
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
                //8.2.页面刚进来获取用户信息进行页面填充(头像和用户名)
                $.ajax({
                    type:"GET",
                    dataType:"json",
                    data:"",
                    url:"http://wzcx.chetuobang.com/wz_api/index.php?service=User.getBaseInfo&unionid="+unionid,
                    success:function(data){
                        var result = eval(data);
                        var pic=result.data.info.headimgurl;
                        var name=result.data.info.nickname;
                        sessionStorage.img=result.data.info.headimgurl;
                        var user_text="<img src="+pic+" class=head>";
                        $("#user").prepend(user_text);
                        var user_info='<span id="username">'+name+'</span>';
                        $("#user").append(user_info);
                        //3.3用户信息填充完成之后，判断用户是否已有创建的留言板
                    $.ajax({
                        type:"get",
                        dataType:"jsonp",
                        data:{"user":unionid},
                        url:"http://message.chetuobang.com/iscreate",
                        success:function(data){
                            //console.log(data);
                            if(data.status){
                                //$('#create').css('display','none').next('a').css('display','block');
                            }else{
                                //$('#create').css('display','block').next('a').css('display','none');
                            }

                            //3.4获取当前用户留言
                            $.ajax({
                                type:"get",
                                dataType:"jsonp",
                                data:{"to_user":unionid},
                                url:"http://message.chetuobang.com/get",
                                success:function(data){
                                    console.log(data);
                                    console.log(111);
                                    var contentList="";
                                        for(var i=0;i<data.length;i++){
                                            contentList="<div><b class='flow"+ranNum(1,3)+"'></b><span class='text'><span class='fa fa-heart' id='heart'></span>" + data[i].m_content + "</span></div>";
                                            $('#content').append(contentList);
                                        }
                                        var uList="";
                                        for(var i=0;i<data.length;i++){
                                            //console.log(data[i].m_id);
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

                                        //执行动画
                                        $(function () {
                                            $("#content").barrager();
                                        });
                                   //}
                                    },
                                error:function(info){
                                    console.log(info);

                                }
                            });
                        },
                        error:function(info){
                            //console.log("请求失败"+info);
                        }
                    });

                },
                error:function(){
                    //console.log("请求失败");
                }
            });
                //9.用户删除留言，先取出用户选中的留言
                $("#delete").click(function(){
                    var oLi=$('#managebox li');
                    var input=$('#managebox input');
                    var c_len=input.length;
                    for(var i=0,m_id=[];i<c_len;i++){
                        if(input[i].checked==true){
                            m_id.push(input[i].name);
                        }
                    }
                    console.log(m_id);
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
        }else{
            history.go(-1);
        }
    });

    //判断一个url是否可以访问
    function IsLoad(url,fun){
        $.ajax({
            url:url,
            type:"get",
            contentType:"application/x-www-form-urlencoded; charset=utf-8",
            success:function(){
                //说明请求的url存在，并且可以访问
                if($.isFunction(fun)){
                    fun(true);
                }
            },
            statusCode:{
                404:function(){
                    //说明请求的url不存在
                    if($.isFunction(fun)){
                        fun(false);
                    }
                }
            }
        });
    }

    }
    //以上是判断用户状态为刚创建然后授权过来的时候，
    //二。以下是用户为游客的状态
    else{
        //显示创建个人留言板，隐藏管理我的留言板
        $('#create').css('display','block');
        $('#manage').css('display','none');
        //定义获取URL信息方法
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
        var Request = new Object();
        Request = GetRequest();
        var unionid,access_token;
        unionid = Request["unionid"];
        access_token = Request["access_token"];
        sessionStorage.uid= unionid;
        sessionStorage.token= access_token;
        //获取到用户信息
        var url=location.search;
        IsLoad(url,function(res){
            //定义随机添加flow的class的方法
            function ranNum (x,y){
                return Math.floor((Math.random()*(y-x))+x);
            }
            if(res){
                //3.1提交用户信息
                $.ajax({
                    type:"get",
                    dataType:"jsonp",
                    data:{"user":unionid},
                    url:"http://message.chetuobang.com/create",
                    success:function(status,code,data){
                        console.log("提交成功");
                    },
                    error:function(info){
                        console.log("请求失败"+info);
                    }
                });
                //3.2.页面刚进来获取用户信息进行页面填充
                $.ajax({
                    type:"GET",
                    dataType:"json",
                    data:"",
                    url:"http://wzcx.chetuobang.com/wz_api/index.php?service=User.getBaseInfo&unionid="+unionid,
                    success:function(data){
                        var result = eval(data);
                        var pic=result.data.info.headimgurl;
                        var name=result.data.info.nickname;
                        var user_text="<img src="+pic+" class=head>";
                        $("#user").prepend(user_text);
                        var user_info='<span id="username">'+name+'</span>';
                        $("#user").append(user_info);
                        //3.3用户信息填充完成之后，判断用户是否已有创建的留言板
                        $.ajax({
                            type:"get",
                            dataType:"jsonp",
                            data:{"user":unionid},
                            url:"http://message.chetuobang.com/iscreate",
                            success:function(data){
                                console.log(data);
                                if(data.status){
                                    //$('#create').css('display','none').next('a').css('display','block');
                                }else{
                                    //$('#create').css('display','block').next('a').css('display','none');
                                }

                                //3.4获取当前用户留言
                                $.ajax({
                                    type:"get",
                                    dataType:"jsonp",
                                    data:{"to_user":unionid},
                                    url:"http://message.chetuobang.com/get",
                                    success:function(data){
                                        var contentList = "";
                                        for(var i=0;i<data.length;i++){contentList="<div><b class='flow"+ranNum(1,3)+"'></b><span class='text'><span class='fa fa-heart' id='heart'></span>" + data[i].m_content + "</span></div>";
                                            $('#content').prepend(contentList);
                                        }
                                        var uList="";
                                        for(var i=0;i<data.length;i++){
                                            console.log(data[i].m_id);
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
                                        //执行动画
                                        $(function () {
                                            $("#content").barrager();
                                        });
                                    },
                                    error:function(info){
                                        console.log("请求失败"+info);
                                    }
                                });
                            },
                            error:function(info){
                                console.log("请求失败"+info);
                            }
                        });

                    },
                    error:function(){
                        console.log("请求失败");
                    }
                });
                //4.用户删除留言，先取出用户选中的留言
                $("#delete").click(function(){
                    var oLi=$('#managebox li');
                    var input=$('#managebox input');
                    var c_len=input.length;
                    for(var i=0,m_id=[];i<c_len;i++){
                        if(input[i].checked==true){
                            m_id.push(input[i].name);
                        }
                    }
                    console.log(m_id);

                    //4.1屏蔽留言
                    $.ajax({
                        type:"get",
                        dataType:"jsonp",
                        data:{"m_id":JSON.stringify(m_id)},
                        url:"http://message.chetuobang.com/shield",
                        success:function(data){
                            console.log(data);
                            for(var i=0;i<c_len;i++){
                                if(input[i].checked==true){
                                    oLi[i].remove();
                                    window.location.reload();
                                    $.dialog({
                                        showTitle : false,
                                        contentHtml : '<p>删除成功！</p>',
                                        autoClose:2500
                                    });
                                }
                            }
                        },
                        error:function(info){
                            console.log("请求失败"+info);
                        }
                    })
                });
            }else{
                history.go(-1);
            }
        });

        //判断一个url是否可以访问
        function IsLoad(url,fun){
            $.ajax({
                url:url,
                type:"get",
                contentType:"application/x-www-form-urlencoded; charset=utf-8",
                success:function(){
                    //说明请求的url存在，并且可以访问
                    if($.isFunction(fun)){
                        fun(true);
                    }
                },
                statusCode:{
                    404:function(){
                        //说明请求的url不存在
                        if($.isFunction(fun)){
                            fun(false);
                        }
                    }
                }
            });
        }
    }
});
