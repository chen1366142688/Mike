<?php if (!defined('THINK_PATH')) exit(); /*a:1:{s:94:"/www/html/wx_oil/public/../application/oilbeanlotteryactivity/view/index/oilBeanLUserList.html";i:1492052252;}*/ ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>油量夺宝</title>
    <link href="__STATIC__/css/base.css" rel="stylesheet"/>
    <link href="__STATIC__/css/lottery.css" rel="stylesheet"/>
    <script src="__STATIC__/js/rem.js"></script>
    <meta name = "format-detection" content = "telephone=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">

</head>
<body>
<?php
    if($actArr['a_activity_status']==1 || $actArr['a_activity_status']==2){
        $time_arr = explode(":",$actArr['end_time']);
?>
<div id="head1">
    <header>
        <!--传值区-->
        第<span id="number"><?php echo $actArr['a_periods_parent']; ?>-<?php echo $actArr['a_periods']; ?></span>期 开奖倒计时
    </header>
    <input type="hidden" id="count_down_stamp_list" value="<?php echo $actArr['end_time_stamp']; ?>">
    <section class="clock" id="clock">
        <span id="h"><?php echo $time_arr['0']; ?></span>
        <span id="m"><?php echo $time_arr['1']; ?></span>
        <span id="s"><?php echo $time_arr['2']; ?></span>
    </section>
    <section class="text">
        <!--传值区-->
        已众筹<span id="gasnumber">128</span>升汽油 开奖前1分钟封盘停止众筹
    </section>
</div>
<?php } ?>
<!--开奖之后这里要显示 #head1隐藏-->
<?php
    if($actArr['a_activity_status']==3){
?>
<div id="head2">
    <header>
        <!--传值区-->
        第<span id="number2"><?php echo $actArr['a_periods_parent']; ?>-<?php echo $actArr['a_periods']; ?></span>期 已开奖
    </header>
    <section class="text mt05">
        <!--传值区-->
        共众筹<span id="gasnumber2">128</span>升汽油
    </section>
    <a href="javascript:;" class="lookmain">查看开奖详情 &gt;&gt;</a>
</div>
<?php } ?>
<div class="party1">
    <div class="mynumber" id="mynumber">
        <span>我的兑奖号码</span>
        <div class="number">
            <ul class="clearfix" id="thisisusernumber">
                <?php if(empty($num_list) || ($num_list instanceof \think\Collection && $num_list->isEmpty())): ?>
                    您还没有号码，去下注吧
                <?php endif; foreach($num_list as $vo): ?>
                    <li><?php echo $vo['p_get_activity_num']; ?></li>
                <?php endforeach; ?>
            </ul>
        </div>

    </div>
</div>
<div class="party2">
    <div class="party_area">
        <div class="tit clearfix">
            <div class="t1 fl">号码</div>
            <div class="t2 fl">用户名</div>
            <div class="t3 fl">众筹时间</div>
        </div>
        <ul>
            <?php foreach($user_list as $vo): ?>
            <li>
                <span id="no" class="no"><?php echo $vo['p_get_activity_num']; ?></span>
                <span id="userinfo" class="userinfo">
                        <b id="username" class="username"><?php echo $vo['u_nick']; ?></b>
                        <b id="userarea" class="userarea"><?php echo $vo['u_position']; ?></b>
                    </span>
                <span id="time" class="time"><?php echo $vo['p_time']; ?></span>
            </li>
            <?php endforeach; ?>
        </ul>
    </div>
</div>
</body>
<script src="__STATIC__/js/jquery1.8.3.js"></script>
<script>
    var count_q_list = setInterval("count_down_user_list()",1000);
    function count_down_user_list(){
        var nowstamp = $("#count_down_stamp_list").val();
        var nextstamp = nowstamp - 1 ;
        if(nextstamp < 0){
            clearInterval(count_q_list);
        }
        $("#count_down_stamp_list").val(nextstamp);
        //alert(nextstamp);
        if(nextstamp/3600>0){
            var hour = Math.floor(nextstamp/3600);
            nextstamp = nextstamp-(3600*hour);
        }else{
            var hour = 0;
        }
        if(nextstamp/60>0){
            var min = Math.floor(nextstamp/60);
            nextstamp = nextstamp-(60*min);
        }else{
            var min = 0;
        }
        var timeStr ="";
        if(hour < 10){
            hour="0"+hour;
        }
        if(min < 10){
            min="0"+min;
        }
        if(nextstamp < 10){
            nextstamp="0"+nextstamp;
        }
        $("#h").html(hour);
        $("#m").html(min);
        $("#s").html(nextstamp);
    }
</script>
</html>