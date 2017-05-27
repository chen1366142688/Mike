$(function(){
    $(".header_box").load("header.html",function(){
        main();
        navText("公司动态");
    });
    $(".footer").load("footer.html");

    //获取pid
    var str=window.location.href;
    var pid=str.substr(str.lastIndexOf("=")+1);
    $.ajax({
        type:"post",
        url:"data/product_detail.php",
        data:{pid:pid},
        success:function(d){
            //console.log(d);
            $(".pdinfo_img>img").attr("src",d.pic);
            $(".pdinfo_text>h2").append(d.title1);
            $(".pdinfo_text>h2").attr("data-pid", d.pid);
            var listHtml="";
            listHtml+='<li>型号：'+ d.model+'</li>';
            listHtml+='<li>功能：'+ d.func+'</li>';
            listHtml+='<li>噪音：'+ d.noise+'</li>';
            listHtml+='<li>风量：'+ d.wind+'</li>';
            listHtml+='<li>适用对象：'+ d.applyTo+'</li>';
            listHtml+='<li>适用面积：'+ d.size+'</li>';
            listHtml+='<li>空气净化能效等级：'+ d.level+'</li>';
            $(".pdinfo_text>ul").append(listHtml);
            $("#price").append(d.price);
            $(".pd_details").append(d.detail);
        }

    });

    $("#addCart").click(function(e){
        e.preventDefault();
        var uid=sessionStorage.uid;
        var pid=$(".pdinfo_text>h2").attr("data-pid");
        //console.log(uid)
        if(uid){
            $.ajax({
                type:"post",
                url:"data/cart_detail_add.php",
                data:{uid:uid,pid:pid},
                success:function(d){
                    //console.log(d);
                    if(d.code==1){
                        alert("添加购物车成功！");
                        cartUp(uid);
                    }
                }
            });
        }else{
            location.href="login.html";
        }
    });

})






