<?php if (!defined('THINK_PATH')) exit(); /*a:1:{s:57:"/web/public/../application/member/view/index/account.html";i:1491547492;}*/ ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>我的账户</title>
    <link rel="stylesheet" href="/static/css/base.css">
    <link rel="stylesheet" href="/static/css/wandou.css">
    <script src="/static/js/jquery-1.11.3.js"></script>

</head>
<body>
    <!--top-->
<div class="main">
    <!--内部容器-->
    <div class="c_nice">
        <!--content-->
        <div class="c_content">
            <p>您账户中的油豆</p>
            <p class="c_yue">
                <b><?php echo $info['u_oilbean']; ?></b>
                <span>油豆</span>
            </p>
        </div>
    </div>
</div>
    <!--2more-->
<div class="c_section">
    <p class="overflow">
        <a href="#" id="aa">更多免费油豆>></a>
    </p>
    <!--充值-->
    <ul class="article">
        <li>
            <b></b>
            <span>1000&nbsp;油豆</span>
            <a href="http://wzcx.chetuobang.com/pay/?service=pay.index&type=wechat&product=oilbean1000&desc=oilbean1000&money=10">10元购买</a>
        </li>
        <li>
            <b></b>
            <span>2000&nbsp;油豆</span>
            <a href="http://wzcx.chetuobang.com/pay/?service=pay.index&type=wechat&product=oilbean2000&desc=oilbean2000&money=20">20元购买</a>
        </li>
        <li>
            <b></b>
            <span>3000&nbsp;油豆</span>
            <a href="http://wzcx.chetuobang.com/pay/?service=pay.index&type=wechat&product=oilbean3000&desc=oilbean3000&money=30">30元购买</a>
        </li>
        <li>
            <b></b>
            <span>5000&nbsp;油豆</span>
            <a href="http://wzcx.chetuobang.com/pay/?service=pay.index&type=wechat&product=oilbean5000&desc=oilbean5000&money=50">50元购买</a>
        </li>
        <li>
            <b></b>
            <span>10000&nbsp;油豆</span>
            <a href="http://wzcx.chetuobang.com/pay/?service=pay.index&type=wechat&product=oilbean10000&desc=oilbean10000&money=100">100元购买</a>
        </li>
    </ul>
</div>

    <div id="Recharge_window">
        <span class="cyoutext">油豆兑换</span>
        <a href="javascript:;" class="close_cyou" id="close"><span class="x"></span></a>
        <input type="text" placeholder="请输入油豆兑换码" id="text">
        <div class="twobutton clearfix">
            <a href="javascript:;" id="exchange">兑换</a>
            <a href="javascript:;" id="cancel">取消</a>
        </div>
    </div>
    <script>
        var Recharge_window=document.getElementById('Recharge_window');
        var aa=document.getElementById('aa');
        var close=document.getElementById('close');
        var cancel=document.getElementById('cancel');
        aa.onclick=function(){
            Recharge_window.style="display:block";
        }
        close.onclick=function(){
            Recharge_window.style="display:none";
        }
        cancel.onclick=function(){
            Recharge_window.style="display:none";
        }
    </script>
</body>
</html>