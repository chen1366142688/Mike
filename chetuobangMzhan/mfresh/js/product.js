$(function(){
    $(".header_box").load("header.html",function(){
        main();
        navText("产品中心");
    });
    $(".footer").load("footer.html");

    var pageCur=1;//当前页码
    var pageC;//总页码
    var type=1;

    var str=window.location.href;
    if(str.lastIndexOf("=")!=-1){
        type=str.substr(str.lastIndexOf("=")+1);
        if(type!=1){
            $(".pl_header a").removeClass().eq(type-1).addClass("cur");
        }
    }
    proList(pageCur,type);

    //当点击产品类型时
    $(".pl_header a").click(function(e){
        e.preventDefault();
        type=$(this).attr("href");
        pageCur=1;
        $(".pl_header a").removeClass().eq(type-1).addClass("cur");
        proList(pageCur,type);
    });

    $(".pages").on('click','a',function(e){
        e.preventDefault();
        var pageN=$(this).index();//当前点击的页码
        //当pageN==0，上一页；当pageN==pageC+1，下一页
        if(pageN==0){//当点击上一页的时候
            if(pageCur==1) return;//当前页面是第一页的时候
            pageCur--;
        }else if(pageN==pageC+1){
            if(pageCur==pageC) return;
            pageCur++;
        }else{
            pageCur=pageN;
        }
        proList(pageCur,type)
    });
    function proList(pageCur,type){
        $.ajax({
            type:"post",
            url:"data/product_select.php",
            data:{pageNum:pageCur,type:type},
            success:function(d){
                console.log(d);
                var data= d.data;
                var n= data.length;
                //console.log(n);
                var htmlText="";
                for(var i=0;i<n;i++){
                    htmlText+='<li><a href="product_details.html?pid='
                    +data[i].pid
                    +'"><img src="'
                    +data[i].pic
                    +'" alt=""/></a><div class="pdlist_text clearfloat"><h3><p>'
                    +data[i].model
                    +'</p><span>'
                    +data[i].title2
                    +'</span></h3><a href="'
                    +data[i].pid
                    +'">查看详情</a></div></li>';
                }
                $(".product_list").html(htmlText);


                //    动态添加页码
                var pageHtml='<a href="" >上一页</a>';
                pageC=d.pageCount;
                for(var i=1;i<pageC+1;i++){
                    pageHtml+='<a href="'+i+'">'+i+'</a>';
                }
                pageHtml+='<a href="" >下一页</a>';
                $(".pages").html(pageHtml);
                $(".pages a").eq(pageCur).addClass("cur");
                if(pageCur==1){
                    $(".pages a:first").addClass("disabled");
                }
                if(pageCur==pageC){
                    $(".pages a:last").addClass("disabled");
                }

            }

        });
    }

});