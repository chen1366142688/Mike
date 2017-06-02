$(function(){
    var  uid=sessionStorage.uid;
    //调用户车辆信息
    var url,ul,ull;
    url="https://wzcx.chetuobang.com:9090/chetuobang/qwz/"+uid+"/violate";
    //ul="http://192.168.90.16:9090/chetuobang/qwz/"+uid+"/violate?callback=?";
    //ull="https://wzcx.chetuobang.com:9090/chetuobang/qwz/"+uid+"/violate?callback=?"
    $.ajax({
        type:"get",
        url:url,
        //contentType:"application/x-www-form-urlencoded",
        dataType:'jsonp',
        data:"",
        success:function(data){
            data=eval("("+data.message+")");
            if(data){
                var listHtml="";
                var plateHtml="";
                var state="";
                console.log(data);
                plateHtml="<div class='licenselate'>"+data[0].plate+"</div>";
                $("header").append(plateHtml);
                for(var i=0;i<data.length;i++){
                    if(data[i].state==1){
                        state="待处理"
                    }else{
                        state="已处理"
                    }
                    listHtml+="<li><span class='tit'>罚款"+data[i].punishMoney+"元，扣"+data[i].punishPoint+"分</span><b class='con'>"+data[i].reason+"<br>"+data[i].location+"</b><span class='time'>"+data[i].violateTime+"</span><span class='type'>"+state+"</span></li>";
                }
                $(".content>ul").append(listHtml);
            }else{
                var items="<li>您没有违章记录！</li>";
                $(".content>ul").append(items);
            }
        },
        error:function(){
            alert("服务器出错啦");
        }
    });
    //点击车务代办的时候。判断用户是否有手机号，如果有，直接带信息跳转到ulr，如果没有手机号，请用户输入手机号。做验证
});
