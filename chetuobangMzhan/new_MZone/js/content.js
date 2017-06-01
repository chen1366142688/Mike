// 调用方法
$(function(){
    (function ($) {
        $.getUrlParam = function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        }
    })(jQuery);
    var xx = $.getUrlParam('object_id');
//console.log(xx)
    $.ajax({
        type:"GET",
        url:"https://scms.chetuobang.com/index.php?m=article&a=index&id="+xx,
        data:"",
        success:function(data){
            var details=eval("("+data+")");
            var smeta=eval("("+details.smeta+")");
            //console.log(details)
            smeta=details.link+smeta.thumb1;
            var title="<img src="+smeta+" class='con_pic'>";
            $('.main').prepend(title);
            $('.tit').html(details.post_title);
            var excerpt=details.post_content;

            $('.main').append(escapeChars(excerpt));
            //$('.main').append(excerpt);
        },
        error:function(info){
            //console.log("请求失败")
        }
    });

});

function escapeChars(str) {
    str = str.replace(/&amp;/g, '&');
    str = str.replace(/&lt;/g, '<');
    str = str.replace(/&gt;/g, '>');
    str = str.replace(/&quot;/g, '"');
    str = str.replace(/&brvbar;/g, '|');
    return str;
}

