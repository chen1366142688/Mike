var unionid=sessionStorage.uid;
var token=sessionStorage.token;
console.log(unionid);
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
    if(xhr.readyState==4){
        if(xhr.status==200){
            doResponse(xhr);
        }
    }else{
        console.log("hello")
    }
};
xhr.open('GET','https://wzcx.chetuobang.com/wz_api/index.php?service=User.getBaseInfo&unionid='+unionid,true);
xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
xhr.send(null);

function doResponse(xhr){
    var result = JSON.parse(xhr.responseText);
    console.log(result);
    var pic=result.data.info.headimgurl;
    var name=result.data.info.nickname;
    var sex=result.data.info.sex;
    var country=result.data.info.country;
    /*if(sex==1){
        $('.male').css('display','inlineBlock');
        $('.famale').css('display','none');
    }else{
        $('.male').css('display','none');
        $('.famale').css('display','inlineBlock');
    }*/
    var user_text="<img src="+pic+">";
    $(".head").prepend(user_text);
    //var user_info='<span class="fl">'+name+'</span>';
    $(".userName").html(name);
    $(".yjh").html(country);

}

