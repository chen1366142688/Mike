$(function(){
    $(".header_box").load("header.html",function(){
        main();
    });
    $(".footer").load("footer.html");


    //实现登录功能
    $("#uname").blur(unameCheck);
    $("#pwd").blur(pwdCheck);

    $("#login").click(function(){
        var uname=$.trim($("#uname").val());
        var pwd=$.trim($("#pwd").val());
        if(unameCheck()&&pwdCheck()){
            $.ajax({
                type:"post",
                url:"data/user_login.php",
                data:{unameOrPhone:uname,upwd:pwd},
                success:function(d){
                    console.log(d);
                    if(d.code!=1){
                        $("#uname_tips").show().html("用户名或密码不正确");
                    }else{
                        sessionStorage.uid= d.uid;
                        sessionStorage.uname= d.uname;
                        //登录成功后，跳转到登录之前的页面
                        history.go(-1);
                    }
                }
            });
        }
    });


});
function unameCheck(){
    var uname=$.trim($("#uname").val());
    if(!uname){//用户名为空
        $("#uname_tips").show().html("请输入用户名");
        $("#uname_icon").show().addClass("icon_error");
        return false;
    }else{
        $("#uname_tips").hide();
        $("#uname_icon").hide();
        return true;
    }
}
function pwdCheck(){
    var pwd=$.trim($("#pwd").val());
    if(!pwd){//用户名为空
        $("#pwd_tips").show().html("请输入您的密码");
        $("#pwd_icon").show().addClass("icon_error");
        return false;
    }else{
        $("#pwd_tips").hide();
        $("#pwd_icon").hide();
        return true;
    }
}





