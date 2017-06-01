var unionid=sessionStorage.uid;
var token=sessionStorage.token;

$('.cwz').click(function(){
    console.log("您点击了查违章");
    if(unionid){
        location.href="https://bwzcx.chetuobang.com/index.html?unionid="+unionid;
    }else{
        location.href="https://traffictrlpub.chetuobang.com/";
    }

});
$('.hm').click(function(){
    location.href="https://cms.chetuobang.com/index.html?unionid="+unionid+"&access_token="+token;
});


