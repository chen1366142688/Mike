var unionid=sessionStorage.uid;
var token=sessionStorage.token;
$('.hm').click(function(){
    location.href="https://cms.chetuobang.com/index.html?unionid="+unionid+"&access_token="+token;
});