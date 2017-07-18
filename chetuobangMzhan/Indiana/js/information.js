
$(function(){

    disableTheButton();
    //phone失去焦点的时候判断手机号是否为空，或者是否通过正则验证
    $('#phone').blur(function(){
        var bu=$('#phone').val();
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
    $('#phone').click(function(){
        if( $(this).val() == '手机号只能是11位数字！' ||  $(this).val() == '手机号不能为空' || $(this).val() == '手机号不正确'){
            $(this).val(null);
        }
    });

    $('#address').keyup(function() {
        var bug = $('#address').val();
        if (bug == "") {
            $(this).css('border-color', 'red');
           /* $(this).val("地址不能为空");*/
            if ($(this).hasClass('ok')) {
                $(this).removeClass('ok');
            }
            disableTheButton();
        } else{
            $(this).css('border-color', '#ddd');
            $(this).addClass('ok');
            if ($('#phone').hasClass('ok')) {
                $('#submit').attr('disabled',false);
                $('#submit').css('background', '#ff4f31');
            }
        }
    });
    /*$('#address').click(function(){
        if( $(this).val() == '地址不能为空'){
            $(this).val(null);
        }
    });*/

    function disableTheButton(){
        if( $('#submit').attr('disabled') == undefined){
            $(this).attr('disabled','disabled');
            $('#submit').css('background', '#ddd');
        }
    }

    /*手机号验证*/
    function checkMobile(str){
        console.log(/^1(3|4|5|7|8)\d{9}$/.test(str));
        if(/^1(3|4|5|7|8)\d{9}$/.test(str)){
            $('#phone').css('border-color','#ddd');
            $('#phone').addClass('ok');
            if( $('#address').hasClass('ok')){
                $('#submit').attr('disabled',false);
                $('#submit').css('background', '#ff4f31');
            }
            return true;
        }else{
            return false;
        }
    }
    $('#submit').click(function(){
        var telephone = $('#phone').val();
        var address = $('#address').val();
        if(telephone == '' || address == ''){
            alert('请填写完整信息再提交。');
            return false;
        }
        $.ajax({
            type: "POST",
            url: "alter",
            cache: false,
            dataType: 'json',
            data: "telephone="+telephone+"&address="+address,
            success: function(data){
                var obj = JSON.parse(data);
                alert(obj.msg);
                window.location = window.location;
            }
        });
    });

});







