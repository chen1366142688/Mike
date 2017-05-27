window.onload=function () {

    $('#cheJia').keyup(function () {
        $('#cheJia').removeClass('invalid');
    });
    $('#faDong').keyup(function () {
        $('#faDong').removeClass('invalid');
    });
    $('#chePai').keyup(function () {
        $('#chePai').removeClass('invalid3');
        $('#db1').removeClass('invalid2');
    });
    $('#submit').click(function () {
        var myreg=/^[A-Z]{1}[A-Z_0-9]{5}$/;
        if(!myreg.test($('#chePai').val())){
            $('#db1').addClass('invalid2');
        }
        if($('#chePai').val()==''){
            $('#db1').addClass('invalid2');
            $('.chepai').addClass('invalid3');
        }
        if($('#cheJia').val()==''){
            $('.chejia').addClass('invalid');
        }
        if($('#faDong').val()==''){
            $('.fadong').addClass('invalid');
        }
        if($('#csS').prop('checked')==false){
            $('.span').addClass('error');
        }
    });
}


//提交用户信息
$("#submit").click(function(){
    var  uid=sessionStorage.uid;
    var select=$(".select").find("option:selected").attr("value");
    var  chePai=$("#chePai").val();
    var  plate=select+chePai;
    var  engine=$("#faDong").val();
    var  evin=$("#cheJia").val();
    var brand=$("#pinPai").val();
    console.log(uid,plate,engine,evin,brand);
    function GetJsonData() {
        var json = {
            "plate": plate,
            "engine": engine,
            "evin": evin,
            "brand": brand
        };
        return json;
    }
    var url="http://wzcx.chetuobang.com:9090/chetuobang/qwz/"+uid+"/plate";
    //var ul="http://192.168.90.16:9090/chetuobang/qwz/"+uid+"/plate";
    if(plate&&engine&&evin&&brand){
        var data_json_test = JSON.stringify(GetJsonData());
        console.log(data_json_test);
        $.ajax({
            type:"post",
            url:url,
            data:data_json_test,
            dataType:'json',
            success:function(data){
                if(data.status==1){
                    console.log(data);
                    self.location = document.referrer;
                }else{
                    alert("添加失败");
                }
            },
            error:function(info){
                console.log(info);
                alert("服务器出错啦");
            }
        });
    }else{
        alert("信息填写不够完整！");
        return false;
    }
});