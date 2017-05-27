$(function() {
    $(".header_box").load("header.html", function () {
        main();
    });
    $(".footer").load("footer.html");

    //删除购物车
    $(".cart_con>ul").on("click","em",function(){
        var did=$(this).siblings(".cart_title").attr("data-did");
        var thisLi=$(this).parent();
        $.ajax({
            type:"post",
            url:"data/cart_detail_delete.php",
            data:{did:did},
            success:function(d){
                //console.log(d);
                if(d.code==1){
                    thisLi.remove();
                }
            }
        });

    });

    $(".cart_con>ul").on("click",".jia",function(){
        var cur=$(this).siblings("input").val();
        cur=parseInt(cur)+1;
        $(this).siblings("input").val(cur);
        var did=$(this).parent().siblings(".cart_title").attr("data-did");
        var pid=$(this).parent().siblings(".cart_title").attr("data-pid");
        var count=$(this).parent().siblings(".cart_title").attr("data-count");
        $.ajax({
            type:"post",
            url:"data/cart_detail_update.php",
            data:{did:did,pid:pid,count:count},
            success:function(d){
                //console.log(d);
                if(d.code==1){
                //    更新金额和总金额，并更新购物车数量和下拉菜单
                }
            }
        });
    });

    if(sessionStorage.uid){
        $.ajax({
            type:"post",
            url:"data/cart_detail_select.php",
            data:{uid:sessionStorage.uid},
            success:function(d){
                //console.log(d);
                if(d.products.length!=0){
                    var listHtml="";
                    var data= d.products;
                    for(var i=0;i<data.length;i++){
                        var ps=data[i].price*data[i].count;
                        listHtml+='<li><input type="checkbox" class="cart_checkbox"/><a href="" class="cart_img"><img src="'
                            +data[i].pic
                            +'" alt=""/></a><a href="" class="cart_title" data-did="'
                            +data[i].did
                            +'" data-pid="'
                            +data[i].pid
                            +'" data-count="'
                            +data[i].pid
                            +'">'
                            +data[i].title1
                            +'</a><i>¥'
                            +data[i].price
                            +'</i><div><span class="jian">-</span><input type="text" value="'
                            +data[i].count
                            +'"/><span class="jia">+</span></div><strong>¥'
                            +ps.toFixed(2)
                            +'</strong><em></em></li>';
                    }
                    $(".cart_con>ul").html(listHtml);

                }
            }
        });
    }



});