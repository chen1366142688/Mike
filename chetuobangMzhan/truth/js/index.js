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

$(function () {
    $('#close').click(function () {
        $('#opc').css('display','none');
    });
    $('#manage').click(function () {
        $('#opc').css('display','block');
    });
    $('.fa-heart').click(function () {
        $('.fa-heart').css('color','#fe6164');
    });
});
///////////////////////////////////////////////////////////////
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

function addRed() {
    $("#heart").click(function () {
        $("#heart").css('color','#fe6164');
    });
}
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
            var item = $(this.settings.wrap).find(".old");
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
                /*$.dialog({
                    showTitle : false,
                    contentHtml : '<p>发送成功！</p>',
                    autoClose:2500
                });*/
                $(_this.settings.wrap).prepend("<div class='new'><b class='flow"+ranNum(1,3)+"'></b><span class='text'><span class='fa fa-heart' id='heart'></span>" + value + "</span></div>");
                cliCks();
                alert(1111);
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
addRed();
////提交用户刚发送的留言
/*function cliCks(){
    var unionid=sessionStorage.uid;
    var _val = $("#txt");
    var value=_val.val();
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
}*/
function remove(oparent,ochild,start,offset){
        var  parent  = document.getElementById(oparent),
            chilren = parent.querySelectorAll(ochild),
            len     = chilren.length,
            start   = start || 0,
            offset  = offset ? start+offset : len;
        if(len<=start) return;
        for(var i = start; i< offset;i++ ){
            parent.removeChild(chilren[i]);
        }
    }
