

function main(){

    //购物车下拉菜单
    $(".s_cart").mouseover(function(){
        $(".cart_dropdown").stop().slideDown();
    });
    $(".s_cart").mouseout(function(){
        $(".cart_dropdown").stop().slideUp();
    });


    //顶部登录或个人中心
    var top_uname=sessionStorage.uname;
    if(!top_uname){//未登录
        var user_text='<li><a href="login.html" class="h_login">登录</a></li><li><em>|</em></li><li><a href="register.html" class="h_register">注册</a></li>';
        $(".h_con>ul").append(user_text);
    }else{//已登录
        var user_text='<li><a href="#">'+top_uname+'</a></li><li id="top_quit"><a href="">退出</a></li>';
        $(".h_con>ul").append(user_text);
        $("#top_quit").click(function(){
            sessionStorage.clear();
        });
        cartUp(sessionStorage.uid);
    }



}



function navText(text){
    $(".nav>ul>li").each(function(){
        var thisText=$(this).children("a").text();
        if(thisText==text){
            $("nav li").removeClass("cur");
            $(this).addClass("cur");
        }
    });
}

//时间转换函数
function dateFormat(time){
    var t=new Date(time);
    var year= t.getFullYear();
    var month= t.getMonth()+1;
    var day= t.getDate();
    return year+"-"+month+"-"+day;
}

function cartUp(uid){
    $.ajax({
        type:"post",
        url:"data/cart_detail_select.php",
        data:{uid:uid},
        success:function(d){
            //console.log(d);
            if(d.products.length!=0){
                var listHtml="";
                var data= d.products;
                var countSum=0;//购物车商品总数量
                var priceSum=0;//总额
                for(var i=0;i<data.length;i++){
                    var ps=data[i].price*data[i].count;
                    listHtml+='<li><a href=""><img src="'
                    +data[i].pic
                    +'" alt=""/></a><div><span>-</span><input type="text" value="'
                    +data[i].count
                    +'"/><span>+</span></div><strong>¥'
                    +ps.toFixed(2)
                    +'</strong><em></em></li>';
                    countSum+=parseInt(data[i].count);
                    priceSum+=parseInt(ps);
                }
                $(".cart_dropdown>ul").html(listHtml);
                $(".count_sum").text(countSum);
                $(".cd_js strong").text(priceSum.toFixed(2));

            }
        }
    });
}

  //todo index  小图片的轮播
setInterval(dong,3000);
function dong(){
    //console.log( $('#dong').css('left'));
    var first=($('#dong li').eq(0)).clone();
    first.appendTo($('#dong'));
    $('#dong').animate({'left':'-345px'},500,function(){
        $('#dong li').eq(0).remove();
        $('#dong').css('left','0px');
    });
}

