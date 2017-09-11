/**
 * Created by simmon on 2017/9/7.
 */
$(function(){
    //0，在这里首先加载header文本信息
    //$('.headerBox').load('header.html');
    //1。在这里获取到用户的信息
    var cid=localStorage.cardId;
    var uid=localStorage.unionId;
    var oid=localStorage.openId;
    var a=0;
    //2.获取到购买会员卡的金额，说明，有效期及使用范围
    $.ajax({
        type:'',
        url:'',
        contentType:'application/json;charset=utf-8',
        data:{},
        success:function(data){
            console.log("获取到购买会员页面的金额及说明等信息，如下：");
            console.log(data);
        },
        fail:function(info){
            console.log("获取购买会员页面的详细信息失败了,下面是失败原因：");
            console.log(info);
            alert("获取数据失败了！")
        }
    });
    //3.下面是页面加载完成后，根据用户动作修改样式
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
    //这里是选择好金额，点击购买后的操作
    $('.btn').click(function(){
        console.log("你刚才点了支付按钮哦，去支付");
        if(a != ''){
            //如果用户选择的已经选择的话，则调用后端支付；
            console.log(a);
            $.ajax({
                type:'POST',
                url:'',
                contentType:'application/json;charset=utf-8',
                data:{
                    cardId:cid,
                    unionId:uid,
                    openId:oid
                },
                success:function(data){
                    console.log("调用微信支付成功，信息如下：");
                    console.log(data);
                    //支付成功之后，这里应该是跳转到我的洗车券页面的未使用中
                    location.href='';
                },
                fail:function(info){
                    console.log("调用微信支付失败了，信息如下：");
                    console.log(info);
                    alert("支付失败，请重新支付！")
                }
            })
        }else{
            alert("请选择购买金额！")
        }
    });
});
