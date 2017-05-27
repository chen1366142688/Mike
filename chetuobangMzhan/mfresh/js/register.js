$(function() {
    $(".header_box").load("header.html", function () {
        main();
    });
    $(".footer").load("footer.html");

    $("#uname").blur(unameCheck);
    $("#pwd").blur(pwdCheck);
    $("#pwd2").blur(pwd2Check);
    $("#phone").blur(phoneCheck);
    $("#mycheck").click(function(){
        //if($("#mycheck").prop("checked")){
        //    $("#register").removeProp("disabled").removeClass();
        //}else{
        //    $("#register").prop("disabled",true).addClass("disabled");
        //}
        $("#register").prop("disabled",!$("#mycheck").prop("checked")).toggleClass("disabled");
    });

    $("#register").click(function(){
        var unameC=unameCheck();
        var pwdC=pwdCheck();
        var pwd2C=pwd2Check();
        var phoneC=phoneCheck();
        var uname=$("#uname").val();
        var pwd=$("#pwd").val();
        var phone=$("#phone").val();
        if(unameC&&pwdC&&pwd2C&&phoneC){
            $.ajax({
                type:"post",
                url:"data/user_register.php",
                data:{uname:uname,upwd:pwd,phone:phone},
                success:function(d){
                    console.log(d);
                    if(d.code==1){
                        sessionStorage.uid= d.uid;
                        sessionStorage.uname= d.uname;
                        alert("注册成功，并且自动登录，确定后返回到之前页面");
                        history.go(-1);
                    }else{
                        alert("服务器出错啦")
                    }
                }
            });
        }
    });

});
//验证邮箱
function unameCheck(){
    var uname= $.trim($("#uname").val());
    var regEmail= /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

    if(!uname){//邮箱为空时
        $("#uname").siblings("em").show().attr("class","icon_error");
        $("#uname").siblings("i").show().html("邮箱不能为空");
        return false;
    }else if(!regEmail.test(uname)){
        $("#uname").siblings("em").show().attr("class","icon_error");
        $("#uname").siblings("i").show().html("您输入的邮箱格式不正确");
        return false;
    }else if(unameIf(uname)){
        $("#uname").siblings("em").show().attr("class","icon_error");
        $("#uname").siblings("i").show().html("该邮箱名已经存在");
        return false;
    }else{
        $("#uname").siblings("em").show().attr("class","icon_ok");
        $("#uname").siblings("i").hide();
        return true;
    }

}
//验证邮箱是否存在
function unameIf(uname){
    var back=true;
    $.ajax({
        type:"post",
        url:"data/user_check_uname.php",
        data:{uname:uname},
        async:false,
        success:function(d){
            if(d.code==1){
                back=true;
            }else{
                back=false;
            }
        }
    });
    return back;
}

//密码验证
function pwdCheck(){
    var pwd= $.trim($("#pwd").val());
    if(!pwd){
        $("#pwd").siblings("em").show().attr("class","icon_error");
        $("#pwd").siblings("i").show().html("请输入密码");
        return false;
    }else if(pwd.length<6||pwd.length>12){
        $("#pwd").siblings("em").show().attr("class","icon_error");
        $("#pwd").siblings("i").show().html("密码长度应该在6~12之间");
        return false;
    }else{
        $("#pwd").siblings("em").show().attr("class","icon_ok");
        $("#pwd").siblings("i").hide()
        return true;
    }

}
//重复密码验证
function pwd2Check(){
    var pwd= $.trim($("#pwd").val());
    var pwd2= $.trim($("#pwd2").val());
    if(!pwd2){
        $("#pwd2").siblings("em").show().attr("class","icon_error");
        $("#pwd2").siblings("i").show().html("请重复输入密码");
        return false;
    }else if(pwd!=pwd2){
        $("#pwd2").siblings("em").show().attr("class","icon_error");
        $("#pwd2").siblings("i").show().html("两次密码不一致");
        return false;
    }else{
        $("#pwd2").siblings("em").show().attr("class","icon_ok");
        $("#pwd2").siblings("i").hide()
        return true;
    }
}
//验证手机号
function phoneCheck(){
    var phone= $.trim($("#phone").val());
    var regPhone=/^(13[0-9]|15[0-9]|18[0-9])\d{8}$/;
    if(!phone){
        $("#phone").siblings("em").show().attr("class","icon_error");
        $("#phone").siblings("i").show().html("请输入手机号");
        return false;
    }else if(!regPhone.test(phone)){
        $("#phone").siblings("em").show().attr("class","icon_error");
        $("#phone").siblings("i").show().html("手机号格式不正确");
        return false;
    }else if(phoneIf(phone)){//验证是否已被绑定
        $("#phone").siblings("em").show().attr("class","icon_error");
        $("#phone").siblings("i").show().html("该手机号已被其他用户绑定");
        return false;
    }else{
        $("#phone").siblings("em").show().attr("class","icon_ok");
        $("#phone").siblings("i").hide();
        return true;
    }
}
//验证手机号是否被绑定
function phoneIf(phone){
    var back=false;
    $.ajax({
        type:"post",
        url:"data/user_check_phone.php",
        data:{phone:phone},
        async:false,
        success:function(d){
            //console.log(d);
            if(d.code==1){
                back=true;
            }else{
                back=false;
            }
        }
    });
    return back;
}




