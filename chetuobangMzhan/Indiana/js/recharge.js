/*$('#main_1 ul li').click(
 a = $('#main_1 ul').attr("datatype")
console.log(a);
    function(){
        if($(this).parent().dataType=="1"){
            $(this).addClass('cur').siblings().removeClass('cur');
        }else if($(this).parent().dataType=="2"){
            $('.c_money li').removeClass('cur');
            $(this).addClass('cur').siblings().removeClass('cur');
        }


    }
)*/
/*$('.c_you ul li').click(
    function(){
        $(this).addClass('cub').siblings().removeClass('cub');
    }
)*/
$('#main_1 ul li').click(
    function(){
        if($(this).parent('.c_ch')){
            $('.c_you .c_cb').children().removeClass("cur");
            $(this).addClass('cur').siblings().removeClass('cur');
            if($(this).parent('.c_cb')){
                $('.c_money .c_ch').children().removeClass('cur');
                $(this).addClass('cur').siblings().removeClass('cur');
            }

        }

    }
);


$('#c_cong').click(function(){
    var product_type = $('.cur').attr('id');
    var qian = product_type.substring(3,6);
    var arr = ['100','500','1000'];
    if(product_type.substring(0,3) == 'rmb' && ($.inArray(qian,arr) >= 0)){
        window.location = "http://wzcx.chetuobang.com/pay/?service=pay.index&type=wechat&product=cash"+qian+"&desc=cash"+qian+"&money="+qian;
        return false;
    }
    $.ajax({
        type: "POST",
        url: "recharge_oil_card",
        cache: false,
        dataType: 'json',
        data: "product_type="+product_type,
        success: function(data){
            var obj = JSON.parse(data);
            if(obj.code == 200){
                window.location = "https://oil.chetuobang.com/oilcard/index/paysuccess";
            }else{
                alert(obj.msg);
                window.location = "https://oil.chetuobang.com/member/index/orders";
            }
        }
    });
});
