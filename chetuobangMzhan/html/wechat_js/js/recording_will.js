$(function(){
    var  uid=sessionStorage.uid;
    function GetRequest() {
        var url = location.search; //获取url中"?"符后的字串

        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }
    var Request = new Object();
    Request = GetRequest();
    var plate;
    plate = Request["plate"];
    var url,ul,ull;
    url="http://wzcx.chetuobang.com:9090/chetuobang/qwz/"+uid+"/"+plate+"/violate";
    //ul="http://192.168.90.16:9090/chetuobang/qwz/"+uid+"/"+plate+"/violate?callback=?";
    //ull="http://wzcx.chetuobang.com:9090/chetuobang/qwz/"+uid+"/"+plate+"/violate?callback=?"
    $.ajax({
        type:"get",
        url:url,
        contentType:"application/x-www-form-urlencoded",
        dataType:'json',
        data:"",
        success:function(data){
            data=eval("("+data.message+")");
            if(data){
                var listHtml="";
                var plateHtml="";
                var state="";
                console.log(data);
                sessionStorage.plate=data;
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
})

