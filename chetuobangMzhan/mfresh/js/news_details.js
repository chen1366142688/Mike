$(function(){
    $(".header_box").load("header.html",function(){
        main();
        navText("��˾��̬");
    });
    $(".footer").load("footer.html");


    //��ȡnid
    var str=window.location.href;
    var nid=str.substr(str.lastIndexOf("=")+1);
    //console.log(nid);

    $.ajax({
        type:"post",
        url:"data/news_detail.php",
        data:{nid:nid},
        success:function(d){
            console.log(d);
            var t= parseInt(d.pubTime);//���ַ���ת��Ϊ��������
            $(".news_details>h2").html(d.title);
            $(".news_details>span").html(dateFormat(t));
            $(".news_content").html(d.content);
        }
    });


})





