function GetRequest() {
    var url = location.search;
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
var Request = new Object();
Request = GetRequest();
var unionid,access_token;
unionid = Request["unionid"];
access_token = Request["access_token"];
sessionStorage.uid= unionid;
sessionStorage.token= access_token;
//调用
var url = location.search;
IsLoad(url,function(res){
    if(res){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.readyState==4){
                //console.log(xhr);
                if(xhr.status==200){
                    doResponse(xhr);
                }
            }else{
               // console.log('响应完成但有问题');
            }
        };
        xhr.open('GET','http://wzcx.chetuobang.com/wz_api/index.php?service=User.getBaseInfo&unionid='+unionid,true);
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xhr.send(null);

        function doResponse(xhr){
            var result = JSON.parse(xhr.responseText);
           // console.log(result);
            var pic=result.data.info.headimgurl;
            var name=result.data.info.nickname;
            var user_text="<img src="+pic+" class=headpic>";
            $(".userpic").append(user_text);
            var user_info='<span class="username">'+name+'</span>';
            $(".userinfo").prepend(user_info);
        }

        //调用户车辆信息
        url="https://wzcx.chetuobang.com:9090/chetuobang/qwz/"+unionid+"/violatesublime";
        //var ul="https://wzcx.chetuobang.com:9090/chetuobang/qwz/"+unionid+"/violatesublime?callback=?";
        $.ajax({
            type:"get",
            url:url,
            dataType:'jsonp',
            success:function(data){
                //console.log(data);
                ge();
                var json=JSON.stringify(data);
                sessionStorage.data=json;
              var result=eval("("+data.message+")");
                if(result){
                    for(var i=0,licenseLate="";i<result.length;i++){
                         licenseLate="<section id='carinfo'><div class='carhead clearfix'><div id='licenselate' class='fl'>"+result[i].plate+"</div><div class='menu fr'><a href='javascript:;' class='modify'></a><span class='line'>|</span><a href='javascript:;' class='delete'></a><span class='line'>|</span><a href='recording_will.html?plate="+result[i].plate+"' class='lookmain fr'>未处理违章</a></div></div><ul class='ownerinfo'><li><span class='ownerkind'>发动机号：</span><b id='engine'>"+result[i].engine+"</b></li><li><span class='ownerkind'>车架号：</span><b id='frame'>"+result[i].evin+"</b></li><li><span class='ownerkind'>车辆品牌：</span><b id='frame'>"+result[i].brand+"</b></li></ul><div id='list' class='list clearfix'><div id='frequency'><span>"+result[i].amount+"次</span><b>违章次数</b></div><div id='money'><span>"+result[i].punishMoney+"元</span><b>罚款金额</b></div><div id='deduction'><span>"+result[i].punishPoint+"分</span><b>扣分情况</b></div></section>";
                        $(".ucenter").after(licenseLate);
                    }
                    //修改车辆
                     $('body').find('.modify').click(
                         function(){
                             var plate=$(this).parent().prev().html();
                             var engin=$(this).parent().parent().next().find("li").get(0).lastElementChild.innerHTML;
                             var evin=$(this).parent().parent().next().find("li").get(1).lastElementChild.innerHTML;
                             var num=$(this).parent().parent().next().find("li").get(2).lastElementChild.innerHTML;
                             window.location.href="modify.html?plate="+plate+"&engin="+engin+"&evin="+evin+"&num="+num;
                         }
                     );
                    //删除车辆信息
                    $('body').find('.delete').click(
                        function(){
                            if(confirm("确定删除该车辆吗?")){
                                var plate=$(this).parent().prev().html();
                                console.log(plate);
                                var uid=sessionStorage.uid;
                                var ul="https://wzcx.chetuobang.com:9090/chetuobang/qwz/"+uid+"/"+plate+"/plate";
                                $.ajax({
                                    type:"post",
                                    url:ul,
                                    data:"",
                                    success:function(data){
                                        if(data.status==1){
                                            console.log(data);
                                            window.location.href=window.location.href+"?id="+10000*Math.random();
                                            console.log("成功");
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
                                console.log("用户已取消删除车辆");
                            }

                        }
                    );
                    $('#nocarinfo').css('display','none');
                }else{

                    $("#nocarinfo").css("display","block");
                }
            },
             error:function(xhr,error){
                console.log(xhr);
                 alert("服务器出错啦");
             }
        });
    }
    else{
        return false;
    }


});
//判断用户是否绑定手机号
function ge(){
    var uid=sessionStorage.uid;
    $.ajax({
        type:"get",
        url:"https://wzcx.chetuobang.com:9090/chetuobang/qwz/"+uid+"/mobile",
        data:"",
        dataType:"json",
        success:function(data){
            var bBu=JSON.parse(data.message);
            //console.log(bBu.mobile);
            //console.log(window.location.href);
            sessionStorage.bu=bBu.mobile;
            if(bBu.mobile){//说明用户有绑定过手机号
                $('.cAdd').css('display','none');
            }else{
                $('.cAdd').css('display','block');
                $('.list').html("＊请先绑定手机号，轻松查违章！＊").css('color','red');
                $('.recordingbtn').css('display','none');
                $('.lookmain').css('display','none');
                console.log("error")
            }
        },
        error:function(info){
            console.log("请求失败！");
        }
    });
}



//判断一个url是否可以访问
function IsLoad(url,fun){
    $.ajax({
        url:url,
        type:"get",
        contentType:"application/x-www-form-urlencoded; charset=utf-8",
        success:function(){
            //说明请求的url存在，并且可以访问
            if($.isFunction(fun)){
                fun(true);
            }
        },
        statusCode:{
            404:function(){
                //说明请求的url不存在
                if($.isFunction(fun)){
                    fun(false);
                }
            }
        }
    });
}

