<?php if (!defined('THINK_PATH')) exit(); /*a:1:{s:54:"/web/public/../application/index/view/index/index.html";i:1489142057;}*/ ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>油量夺宝</title>
    <link href="/static/css/base.css" rel="stylesheet"/>
    <link href="/static/css/index.css" rel="stylesheet"/>
    <link href="/static/images/icon-ctb.jpg" rel="shortcut icon">
    <script src="/static/js/rem.js"></script>
</head>
<body>
    <nav>
        <a href="javascript:;">车主福利</a>
        <a href="javascript:;" class="active">油卡充值</a>
        <a href="javascript:;">积分商城</a>
        <a href="javascript:;">游戏中心</a>
    </nav>
    <div class="main">
        <div class="gas">
            <span class="gas_num">
                128
            </span>
        </div>
        <div>
            <a href="/member/index/index" class="user"></a>
        </div>
        <a href="/oilbeanl/showlist" id="join_btn">立即参与</a>
        <div class="buy">
            <!--Today_Gas_Price-->
            <div class="today_gas_price">
                <span id="price_yuan">6</span>
                <span class="d">.</span>
                <span id="price_jiaofen">50</span>
            </div>
            <a href="/oilcard/index/index?type=1" class="card_zsh"></a>
            <a href="/oilcard/index/index?type=2" class="card_zsy"></a>
        </div>
    </div>
</body>
</html>