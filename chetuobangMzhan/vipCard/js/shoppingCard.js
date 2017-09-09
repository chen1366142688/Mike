/**
 * Created by simmon on 2017/9/7.
 */
$(function(){
    var a=0;
    $('.container').click(function(){
        console.log("用户刚才点了哪个价钱呢？oh no ?");
        $('.check').addClass('selected');
        a=$('.money39').html();

        $('.checks').removeClass('selected');
    });
    $('.container2').click(function(){
        console.log("这他妈是点的第二个");
        $('.checks').addClass('selected');
        a=$('.money99').html();
        $('.check').removeClass('selected');

    });
    $('.btn').click(function(){
        console.log("你刚才点了支付按钮哦，去支付");
        if(a != ''){
            console.log(a);
        }else{
            alert("请选择购买金额！")
        }
    });
});
