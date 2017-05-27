$(function(){
    $(".header_box").load("header.html",function(){
        main();
        navText("公司动态");
    });
    $(".footer").load("footer.html");

    var pageCur=1;//当前页码
    var pageC;//总页码
    newList(pageCur);

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
        newList(pageCur);
    });
    function newList(pageCur){
        $.ajax({
            type:"post",
            url:"data/news_select.php",
            data:{pageNum:pageCur},
            success:function(d){
                console.log(d);
                var data= d.data;
                var n= data.length;
                //console.log(n);
                var htmlText="";
                for(var i=0;i<n;i++){
                    var t=dateFormat(parseInt(data[i].pubTime));
                    htmlText+='<li><span>'
                    +t
                    +'</span><a href="news_details.html?nid='+data[i].nid+'">'
                    +data[i].title
                    +'</a></li>';
                }
                $(".news>ul").html(htmlText);


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