
    $('.c_item').blur(function(){
        var bu=$('.c_item').val();
        console.log(bu);
        if(bu==""){
            $(this).css('border-color','red').css('placeholder','号码不能为空。');
        }else{
            checkYou(bu);
        }
    });

$('.c_items').blur(function(){
    var bug=$('.c_items').val();
    console.log(bug);
    if(bug==""){
        $(this).css('border-color','red').css('placeholder','号码不能为空。')
    }else{
        checkMobile(bug)
    }
});
/*手机号验证*/
function checkMobile(str){
    var reg = /^1[0-9]{10}$/;
    if(reg.test(str)){
        console.log("正确");
        $('.c_items').css('border-color','#ddd');
    }else{
        $('.c_items').css('border-color','red');
        console.log("error");
    }
}
/*加油卡验证*/
function checkYou(str){
    var reg = /^\d{19}$/;
    if(reg.test(str)){
        console.log("正确");
        $('.c_item').css('border-color','#ddd');
    }else{
        $('.c_item').css('border-color','red');
        console.log("error");
    }
}
