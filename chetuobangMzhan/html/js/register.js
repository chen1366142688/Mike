window.onload=function () {
    var InterValObj; //timer变量，控制时间
    var count = 60; //间隔函数，1秒执行
    var curCount;//当前剩余秒数
    var oBtn=$("#btnSendCode");
    function sendMessage() {
        curCount = count;
        var tel=$('#tel').val();
        oBtn.attr("disabled", "true");
        oBtn.addClass('unlabed');
        oBtn.val(+curCount + "s再次获取");
        InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
        $.ajax({
            type: "POST", //用POST方式传输
            dataType: "jsonp", //数据格式:JSON
            url: 'https://sms.chetuobang.com/sms.php?sms_type=1', //目标地址
            data:'tel_phone='+tel,
            jsonP:"callback",
            success: function (data) {
                console.log(data);
                console.log("请求成功，正在处理响应消息");
            },
            error:function(){
                console.log("输入不正确");
            }
        });
    }
    function SetRemainTime() {
        if (curCount == 0) {
            window.clearInterval(InterValObj);//停止计时器
            oBtn.removeAttr("disabled");//启用按钮
            oBtn.val("获取验证码");
            oBtn.removeClass('unlabed');
        }
        else {
            curCount--;
            oBtn.val( + curCount + "s再次获取");
        }
    }
    oBtn.click(function () {
        var myreg = /^1[3|7|5|8]\d{9}$/;
        if(!myreg.test($("#tel").val())||$('#tel').val()=='') {
            alert('请输入有效的手机号码！');
            return false;
        }else {
            sendMessage();
        }
    });
    $('#bindphone').click(function () {
        var code=$('#code').val();
        var tel=$('#tel').val();
        if($('#tel').val()==''){
            alert("请输入手机号");
            return;
        }
        var myreg = /^1[3|7|5|8]\d{9}$/;
        if(!myreg.test($("#tel").val())||$('#tel').val()=='') {
            alert('请输入有效的手机号码！');
            return false;
        }
        if($('#code').val()==''){
            alert("请输入验证码");
            return;
        }
        $.ajax({
            type: "POST", //用POST方式传输
            dataType: "jsonp", //数据格式:JSON
            url: 'https://sms.chetuobang.com/sms.php?sms_type=2', //目标地址
            data:{
                tel_phone:tel,
                verify_code:code
            },
            jsonP:"callback",
            success: function (data) {
                console.log(data);
                if (data.code==200){
                    console.log('验证成功');
                    erc();

                }else{
                    console.log("验证失败");
                }
            }
        });
        function erc(){
            var uid=sessionStorage.uid;
            $.ajax({
                type:"get",
                url:"https://wzcx.chetuobang.com:9090/chetuobang/qwz/"+uid+"/"+tel+"/mobile",
                data:"",
                dataType:"jsonp",
                success:function(data){
                    console.log(data);
                    console.log("请求成功，正在处理响应消息");
                    window.location.href=window.location.href+"?id="+10000*Math.random();
                    /*window.location.reload();*/
                },
                error:function(info){
                    console.log("请求失败！");
                }
            });
        }
    })
};