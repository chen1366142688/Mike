$(function(){

    disableTheButton();
    //c_items失去焦点的时候判断手机号是否为空，或者是否通过正则验证
    $('.c_items').blur(function(){
        var bu=$('.c_items').val();
        if(bu==""){
            $(this).css('border-color','red');
            $(this).val("手机号不能为空");
            if ($(this).hasClass('ok')) {
                $(this).removeClass('ok');
            }
            disableTheButton();
        }else if(!checkMobile(bu)){
            $(this).css('border-color','red');
            $(this).val("手机号不正确");
            if ($(this).hasClass('ok')) {
                $(this).removeClass('ok');
            }
            disableTheButton();
        }
    });
    $('.c_items').click(function(){
        if( $(this).val() == '手机号只能是11位数字！' ||  $(this).val() == '手机号不能为空' || $(this).val() == '手机号不正确'){
            $(this).val(null);
        }
    });
//卡号c_item
    $('.c_item').blur(function() {
        var bug = $('.c_item').val();
        console.log(typeof (bug));
        if (bug == "") {
            $(this).css('border-color', 'red');
            $(this).val("卡号不能为空");
            if ($(this).hasClass('ok')) {
                $(this).removeClass('ok');
            }
            disableTheButton();
        }else{
            if(!checkCard(bug)){
                $(this).css('border-color', 'red');
                $(this).val("卡号需要19位数字");
                if ($(this).hasClass('ok')) {
                    $(this).removeClass('ok');
                }
            }
        }
    });
    $('.c_item').click(function(){
        if( $(this).val() == '卡号不能为空' || $(this).val() == '卡号需要19位数字'){
            $(this).val(null);
        }
    });

    //姓名c_items2


    $('.c_items2').blur(function() {
        var bug = $('.c_items2').val();
        if (bug == "") {
            $(this).css('border-color', 'red');
            $(this).val("姓名不能为空");
            if ($(this).hasClass('ok')) {
                $(this).removeClass('ok');
            }
            disableTheButton();
        } else{
            $(this).css('border-color', '#ddd');
            $(this).addClass('ok');
            if ($('.c_items').hasClass('ok')&&$('.c_item').hasClass('ok')) {
                $('.c_bding').attr('disabled',false);
                $('.c_bding').css('background', '#ff4f31');
            }
        }
    });



    $('.c_items2').keyup(function() {
        var bug = $('.c_items2').val();
        $(this).css('border-color', '#ddd');
        $(this).addClass('ok');
        if ($('.c_items').hasClass('ok')&&$('.c_item').hasClass('ok')) {
            $('.c_bding').attr('disabled',false);
            $('.c_bding').css('background', '#ff4f31');
        }
    });
    $('.c_items2').click(function(){
        if( $(this).val() == '姓名不能为空'){
            $(this).val(null);
            if ($(this).hasClass('ok')) {
                $(this).removeClass('ok');
            }
        }
    });
    function disableTheButton(){
        if( $('.c_bding').attr('disabled') == undefined){
            $(this).attr('disabled','disabled');
            $('.c_bding').css('background', '#a4a4a4');
        }
    }

    function checkCard(str){
        if(/^\d{19}$/.test(str)){
            $('.c_item').css('border-color', '#ddd');
            $('.c_item').addClass('ok');
            if ($('.c_items').hasClass('ok') && $('.c_items2').hasClass('ok')) {
                $('.c_bding').attr('disabled',false);
                $('.c_bding').css('background', '#ff4f31');
            }
            return true;
        }else{
            return false;
        }
    }

    /*手机号验证*/
    function checkMobile(str){
        console.log(/^1(3|4|5|7|8)\d{9}$/.test(str));
        if(/^1(3|4|5|7|8)\d{9}$/.test(str)){
            $('.c_items').css('border-color','#ddd');
            $('.c_items').addClass('ok');
            if( $('.c_item').hasClass('ok')&&$('.c_items2').hasClass('ok')){
                $('.c_bding').attr('disabled',false);
                $('.c_bding').css('background', '#ff4f31');
            }
            return true;
        }else{
            return false;
        }
    }
    $('.c_bding').click(function(){
        var oilcard = $('.c_item').val();
        var mobile = $('.c_items').val();
        var name = $('.c_items2').val();
        var type = $('#cardType').val();
        if(oilcard == '' || mobile == '' ||  name == ''){
            alert('请填写完整信息再提交。');
            return false;
        }
        $.ajax({
            type: "POST",
            url: "binding",
            cache: false,
            dataType: 'json',
            //data: "oilcard=1234567890123456789&mobile=1326456811",
            data: "oilcard="+oilcard+"&mobile="+mobile+"&name="+name+"&type="+type,
            success: function(data){
                var obj = JSON.parse(data);
                console.log(obj);
                alert(obj.msg);
                window.location = window.location;
            }
        });
    });

});








































/*$('.c_item').blur(function(){
        var bu=$('.c_item').val();

        if(bu==""){
            $(this).css('border-color','red');
            $(this).val("卡号不能为空");
        }else if(checkYou(bu)){
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

$('.c_items2').blur(function(){
    var bug2=$('.c_items2').val();
    console.log(bug2);
    if(bug2==""){
        $(this).css('border-color','red').css('placeholder','姓名不能为空。')
    }
});
/!*手机号验证*!/
function checkMobile(str){
    if(/^1(3|4|5|7|8)\d{9}$/.test(str)){
        console.log("正确");
        $('.c_items').css('border-color','#ddd');
        return true;
    }else{
        $('.c_items').css('border-color','red');
        return false;
    }
}
/!*加油卡验证*!/
function checkYou(str){
    var reg = /^\d{19}$/;
    if(reg.test(str)){
        console.log("正确");
        $('.c_item').css('border-color','#ddd');
        return true;
    }else{
        $('.c_item').css('border-color','red');
        return false;
    }
}


$('.c_bding').click(function(){
    var oilcard = $('.c_item').val();
    var mobile = $('.c_items').val();
    var name = $('.c_items2').val();
    var type = $('#cardType').val();
    if(oilcard == ""){
        $('.c_item').css('border-color','red').css('placeholder','号码不能为空。');
        return false;
    }
    if(mobile == ""){
        $('.c_items').css('border-color','red').css('placeholder','号码不能为空。');
        return false;
    }
    if(name == ""){
        $('.c_items2').css('border-color','red').css('placeholder','姓名不能为空。');
        return false;
    }
    checkYou(oilcard);
    checkMobile(mobile);
    $.ajax({
        type: "POST",
        url: "binding",
        cache: false,
        dataType: 'json',
        //data: "oilcard=1234567890123456789&mobile=1326456811",
        data: "oilcard="+oilcard+"&mobile="+mobile+"&name="+name+"&type="+type,
        success: function(data){
            var obj = JSON.parse(data);
            alert(obj.msg);
            window.location = window.location;
        }
    });
});*/
