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
var plate,engin,evin,num;
plate = Request["plate"];
engin = Request["engin"];
evin = Request["evin"];
num = Request["num"];
console.log(plate,engin,evin,num);
