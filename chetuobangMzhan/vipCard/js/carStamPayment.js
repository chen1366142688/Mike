/**
 * Created by simmon on 2017/9/7.
 */
$(function(){
    //0，在这里首先加载header文本信息
    //$('.headerBox').load('header.html');
    //1.首先得获取缓存中的信息
    var uid=localStorage.unionId;
    var oid=localStorage.openId;
    var a=0;
    //2.获取购买洗车券页面的参数；
    $.ajax({
        type:'',
        url:'',
        contentType:'application/json;charset=utf-8',
        data:{},
        success:function(data){
            console.log("获取成功购买洗车券页面的数据，如下：");
            console.log(data);
            //2.1这里处理获取过来的数据
        },
        fail:function(info){
            console.log("获取购买新车券页面的数据失败了，如下：");
            console.log(info);
            alert("获取后端接口数据失败")
        }
    });
    //3.这里是用户对页面进行的选择金额操作
    $('.oneNotes').click(function(){
       console.log("这他妈是点的第一个");
       $('.check').addClass('selected');
       a=$('.oneNotes .moneys').html().slice(1,3)+'.';
       console.log(a);
        $('.money b').html(a);
        $('.checks').removeClass('selected');
    });
    $('.twoNotes').click(function(){
        console.log("这他妈是点的第二个");
        $('.checks').addClass('selected');
        a=$('.twoNotes .moneys').html().slice(1,3)+'.';
        console.log(a);
        $('.money b').html(a);
        $('.check').removeClass('selected');

    });
    //4.这里是用户点击了购买按钮的处理
    $('.btn').click(function(){
        console.log("你刚才点了支付按钮哦，去支付");
        if(a != ''){
            console.log(a);
            $.ajax({
                type:'',
                url:'',
                data:{
                    goodsName:goodsName,
                    goodsPrice:goodsPrice,
                    mark:mark,
                    area:area,
                    unionId:uid,
                    openId:oid
                },
                contentType:'application/json;charset=utf-8',
                success:function(data){
                    console.log("调起微信支付成功，返回结果如下：");
                    console.log(data);
                },
                fail:function(info){
                    console.log("支付失败，失败原因如下：");
                    console.log(info);
                    alert("支付失败，请重新支付")
                }
            });
        }else{
            alert("请选择购买金额！")
        }
    });
});
