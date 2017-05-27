<?php if (!defined('THINK_PATH')) exit(); /*a:1:{s:71:"/www/html/wx_oil/public/../application/oilcard/view/index/recharge.html";i:1491967968;}*/ ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>充值</title>
    <link href="/static/images/icon-ctb.jpg" rel="shortcut icon">
    <link rel="stylesheet" href="/static/css/base.css">
    <link rel="stylesheet" href="/static/css/recharge.css">
    <script src="/static/js/jquery-1.11.3.js"></script>
</head>
<body>
    <!--总容器-->
    <div class="main" id="main">
        <!--卡号-->
        <div class="c_china">
            <p class="c_china1"> 中 国 石 油 化 工 集 团</p>
            <p id="c_china2"><?php echo $info['c_num']; ?></p>
        </div>
    </div>
    <div class="main" id="main_1">
        <!--金额-->
        <div class="c_money">
            <ul class="c_ch">
                <li id="rmb50" class="cur">50元</li>
                <li id="rmb100">100元</li>
                <li id="rmb200">200元</li>
                <li id="rmb500">500元</li>
                <li id="rmb1000">1000元</li>
            </ul>
        </div>
        <!--提示-->
        <p class="c_cue">可使用<strong>10000</strong>油豆抵用<strong>100</strong>元</p>
        <!--油豆-->
        <div class="c_you">
            <ul class="c_cb">
                <li id="ob100">100油豆</li><!--class="cub"-->
                <li id="ob1000">1000油豆</li>
                <li id="ob10000">10000油豆</li>
            </ul>
        </div>
        <a id="c_cong" href="javascript:;">充值</a>
        <footer>
            <input type="checkbox" id="checkbox-1" checked="checked"><label for="checkbox-1">✔</label>&nbsp;同意服务协议
            <a href="/member/index/orders">充值纪录>></a>
        </footer>

    </div>

    <script src="/static/js/recharge.js"></script>
</body>
</html>