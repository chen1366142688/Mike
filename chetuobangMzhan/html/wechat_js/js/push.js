$(function(){
    $('#cheWu').click(function(){
        huo();
    });
    //传用户信息，获得地址
    function huo(){
        //获得电话
        var phone=sessionStorage.bu;
        console.log(phone);
        //获得车辆信息
        var uid=sessionStorage.uid;
        console.log(uid);
        var str=sessionStorage.data;
        var licenSelate=$('.licenselate').text();
        var obj=JSON.parse(str);
        //获得当前车辆车牌，在车辆信息中查找当前车辆的信息传输
        var messageObj=JSON.parse(obj.message);
        for(var i =0;i<messageObj.length;i++){
            if(messageObj[i].plate == licenSelate){
                if(messageObj[i]){
                    var result=messageObj[i];
                    console.log(messageObj[i]);
                    break;
                }
            }
        }
        $.ajax({
            type:"get",
            url:"http://wzcx.chetuobang.com:9090/chetuobang/qwz/"+uid+"/"+result.plate+"/"+result.engine+"/"+result.evin+"/"+phone+"/cleanpunish",
            data:{"uid":uid,"plate":result.plate,"engine":result.engine},
            dataType:"json",
            success:function(data){
                console.log("开始处理响应消息");
                var txt=JSON.parse(data.message)
                console.log(txt.url);
                window.location.href=txt.url;
            },
            error:function(){
                console.log("请求失败");
            }
        })
    }
});