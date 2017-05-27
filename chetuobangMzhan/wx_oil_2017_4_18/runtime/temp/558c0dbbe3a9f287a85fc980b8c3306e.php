<?php if (!defined('THINK_PATH')) exit(); /*a:1:{s:90:"/www/html/wx_oil/public/../application/oilbeanlotteryactivity/view/index/oilBeanLPast.html";i:1492052251;}*/ ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>开奖结果</title>
    <link rel="stylesheet" href="__STATIC__/css/base.css">
    <link rel="stylesheet" href="__STATIC__/css/result.css">
    <script src="__STATIC__/js/jquery-1.11.3.js"></script>
    <meta name = "format-detection" content = "telephone=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
</head>
<body>
<!--result-->
<?php foreach($actInfo as $vo): ?>
<div class="c_on">
    <!--期数-->
    <div class="c_transfrom">
        第<?php echo $vo['a_periods_parent']; ?>-<?php echo $vo['a_periods']; ?>期&nbsp;开奖结果
    </div>
    <div class="c_on1">
        <div class="c_on2">
            <div class="c_contenter">
                <p>本期众筹兑奖号码个数</p>
                <p class="c_number"><?php echo $vo['par_num']; ?></p>
            </div>
            <div class="c_contenter c_contentt">
                <p>时时彩开奖号码</p>
                <b class="c_b">第<?php echo $vo['a_ssc_periods']; ?>期</b>
                <a href="http://www.cqcp.net/game/ssc/" class="c_a">查看>></a>
                <p class="c_number"><?php echo $vo['a_ssc_winning_number']; ?></p>
            </div>
            <div class="c_contenter">
                <p>计算公式</p>
                <p class="c_number"><?php echo $vo['par_num']; ?>－<?php echo $vo['a_ssc_winning_number']; ?>%<?php echo $vo['par_num']; ?>＝<?php echo $vo['win_num']; ?></p>
            </div>
            <div class="c_contenter c_contentt c_connnn">
                <p>中奖名单</p>
                <a href="#" class="c_a">更多>></a>
                <div class="c_c">
                    <p id="c_num" class="c_number"><?php echo $vo['win_num']; ?></p>
                    <div class="c_rig">
                        <b><?php echo $vo['u_nick']; ?>&nbsp;<?php echo $vo['u_position']; ?></b>
                        <b><?php echo $vo['win_time']; ?></b>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>
<?php endforeach; ?>
</body>
</html>