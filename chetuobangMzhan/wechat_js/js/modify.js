function GetRequest() {
    var url = decodeURI(location.search);

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
var plate,engin,evin,num;
plate =  Request["plate"];
engin = Request["engin"];
evin = Request["evin"];
num = Request["num"];
console.log(plate,engin,evin,num);
sessionStorage.ppt=plate;

$('#plate').val(plate);
$('#Engine').val(engin);
$('#female').val(evin);
$('#vehicle').val(num);
$('#sub').click(modify);
//修改车辆信息,先删除
function modify(){
    var uid=sessionStorage.uid;
    var plate=sessionStorage.ppt;
    console.log(plate,engin,evin,num);
    var ul="http://wzcx.chetuobang.com:9090/chetuobang/qwz/"+uid+"/"+plate+"/plate";
    $.ajax({
        type:"post",
        url:ul,
        data:"",
        success:function(data){
            if(data.status==1){
                console.log(data);
                zeng();
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
}
//在新增
    function zeng(){
        var  uid,plate,engin,evin,num;
            uid=sessionStorage.uid;
        plate= $('#plate').val();
        engin=$('#Engine').val();
        evin=$('#female').val();
        num=$('#vehicle').val();
        console.log(uid,plate,engin,evin,num);
        function GetJsonData() {
            var json = {
                "plate": plate,
                "engine": engin,
                "evin": evin,
                "brand": num
            };
            return json;
        }
        //var url="http://wzcx.chetuobang.com:9090/chetuobang/qwz/"+uid+"/plate";
        var ul="http://wzcx.chetuobang.com:9090/chetuobang/qwz/"+uid+"/plate";
        if(plate&&engin&&evin&&num){
            var data_json_test = JSON.stringify(GetJsonData());
            console.log(data_json_test);
            $.ajax({
                type:"post",
                url:ul,
                data:data_json_test,
                dataType:'json',
                success:function(data){
                    if(data.status==1){
                        console.log(data);
                        self.location = document.referrer;
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
            alert("信息填写不够完整！");
            return false;
        }
    }