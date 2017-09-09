/**
 * Created by simmon on 2017/9/7.
 */
$(function(){
    var a=0;
    $('.oneNotes').click(function(){
       console.log("用户刚才点了哪个价钱呢？oh no ?");
       $('.check').addClass('selected');
       a=25;
        $('.checks').removeClass('selected');
    });
    $('.twoNotes').click(function(){
        console.log("这他妈是点的第二个");
        $('.checks').addClass('selected');
        a=30;
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
