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
