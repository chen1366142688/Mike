<?php if (!defined('THINK_PATH')) exit(); /*a:1:{s:90:"/www/html/wx_oil/public/../application/oilbeanlotteryactivity/view/index/oilBeanLInfo.html";i:1492069345;}*/ ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>油量夺宝</title>
    <link href="__STATIC__/css/base.css" rel="stylesheet"/>
    <link href="__STATIC__/css/main.css" rel="stylesheet"/>
    <meta name = "format-detection" content = "telephone=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
</head>
<body>
<div class="content">
    <div class="tit">
        <!--期数-->

        <div id="phase">
            第&nbsp;<span id="periods"><?php echo $oilBeanLActInfo['0']['a_periods_parent']; ?>-<?php echo $oilBeanLActInfo['0']['a_periods']; ?>&nbsp;</span>期
        </div>
        <a href="result" class="past"></a>
    </div>
    <div class="gas_main">
        <!--倒计时-->
        <input type="hidden" id="count_down_stamp" value="<?php echo $oilBeanLActInfo['0']['end_time_stamp']; ?>">
        <div id="gas_time">
            <?php echo $oilBeanLActInfo['0']['end_time']; ?>
        </div>

        <div id="timeout">
            <!--不能参与活动#timeout变为display：block-->
        </div>

        <div id="cannotjoin">
            <!--不能参与活动#cannotjoin变为display：block-->
            <!--封盘时显示的期数-->
            <span>第<b id="act_num"><?php echo $oilBeanLActInfo['0']['a_periods_parent']; ?>-<?php echo $oilBeanLActInfo['0']['a_periods']; ?></b>期已开奖</span>
        </div>

        <div id="haslotteryed" style="display:none">
            <!--已经开奖和本期参与的油量-->
            <div id="thisgas"><?php echo $oilBeanLActInfo['0']['sum_oil']; ?></div>
        </div>

        <!--参加人数-->
        <div class="joined_people">
            <span id="joined_people"><?php echo $oilBeanLActInfo['0']['a_sum_people_num']; ?></span>
        </div>
        <!--油量-->
        <div id="gas_liter">
            <?php echo $oilBeanLActInfo['0']['sum_oil']; ?>
        </div>
        <div class="lookfor">
            <a id="showlistinfo" href="userlist?act_id=<?php echo $oilBeanLActInfo['0']['a_id']; ?>&u_id=<?php echo $uId; ?>">查看详情 &gt;&gt;</a>
        </div>
    </div>
    <!--封盘时 #main_btn更改display：none; #cannotclick_btn为display：block-->
    <div class="main_btn clearfix" id="main_btn">
        <!--减法-->
        <button id="cut" class="fl">-</button>
        <div id="num" class="fl">
            <!--油量单位 js表达式-->
            <input class="numbermain" id="number1" type="text" value="1">升/
            <input class="numbermain w04" id="number2" type="text" value="<?php echo $one_bet_oilBean_num; ?>">油豆
        </div>
        <!--加法-->
        <button id="add" class="fl">+</button>
    </div>
    <!--封盘时 #main_btn更改display：none;#cannotclick_btn为display：block-->
    <div class="cannotclick_btn clearfix" id="cannotclick_btn">
        <div class="btn l fl">-</div>
        <div class="text fl">
            <span id="oilSun"><?php echo $oilBeanLActInfo['0']['sum_oil']; ?></span>升/
            <span id="oilBeanSum"><?php echo $one_bet_oilBean_num; ?></span>油豆
        </div>
        <div class="btn r fl">+</div>
    </div>

    <div id="lotteryed"></div>
    <div class="btn_area clearfix">
        <a href="javascript:void(0);" onclick="user_bet()" class="start" id="start">
            开始夺宝
        </a>
        <!--剩余1分钟时无法参加活动waitmoment 显示 start隐藏 取消click事件-->
        <a href="javascipt:void(0);" class="waitmoment" disabled="disabled" id="waitmoment">
            等待开奖
        </a>
        <!--封盘时 按钮lkmainly显示 start隐藏-->
        <a href="javascript:;" class="lkmainly" id="lkmainly">
            查看详情
        </a>
    </div>
    <!--下面是操作成功和失败弹出层 如果用户操作成功#success显示 操作失败#unsuccess显示-->
    <div class="success" id="success">
        <div class="cyou">
            <span class="cyoutext mt135">恭喜你，众筹成功！</span>
            <div class="twobtn">
                <a href="javascript:;" class="looklook mb20" id="lookusernumber">
                    查看兑奖号码
                </a>
                <a href="javascript:void(0)" onclick="location.reload();" class="looklook" id="continue1">
                    继续夺宝
                </a>
            </div>
            <!--按钮关闭#success-->
            <a href="javascript:;" id="close_cyou" class="close_cyou">
                <span class="x"></span>
            </a>
        </div>
        <!--用户点击查看兑奖号码的弹出层-->
        <div class="cyou hauto" id="usernumberbox">
            <span class="cyoutext mt135">恭喜你，众筹成功！</span>
            <b class="yournumber">你的兑奖号码</b>
            <div class="numberbox">
                <!--用户的兑奖号码-->
                <ul class="clearfix" id="usernumber">
                </ul>
            </div>
            <div class="twobtn mt255">
                <a href="javascript:void(0)" onclick="location.reload();" class="looklook" id="continue2">
                    继续夺宝
                </a>
            </div>
            <!--按钮关闭#success-->
            <a href="javascript:;" id="close_cyou3" class="close_cyou">
                <span class="x"></span>
            </a>
        </div>
    </div>
    <div class="success" id="unsuccess">
        <div class="cyou h745 brn" id="notenough">
                <span class="cyoutext mt24">您的油豆余额不足
</span>
            <div class="go_or_cancel clearfix">
                <a href="recharge.html" class="recharge go_left fl">
                    去充值
                </a>
                <!--取消按钮关闭#unsuccess-->
                <a href="javascript:;" class="recharge cancel_right fl" id="cancel">
                    取消
                </a>
            </div>
            <!--取消按钮关闭#unsuccess-->
            <a href="javascript:;" id="close_cyou2" class="close_cyou">
                <span class="x"></span>
            </a>
        </div>
    </div>
</div>
<footer class="clearfix">
    <!--对应#htp-->
    <a href="javascript:;" id="howtoplay" class="bl1">玩法介绍</a>
    <!--对应#calue-->
    <a href="javascript:;" id="calculate">计算公式</a>
    <a href="javascript:;" id="playerskill" class="br1">玩家技巧</a>
</footer>
<div id="nav">
    <!--<div class="firstCon" id="first">-->
    <!--<span id="Bignum">100025-<b>1</b> </span>-->
    <!--</div>-->
    <?php foreach($oilBeanLActInfo as $key=> $vo): ?>
    <div class="AnotherNO" aid="<?php echo $vo['a_id']; ?>" id="<?php echo $key+1; ?>"><?php echo $key+1; ?></div>
    <?php endforeach; ?>
</div>
<!--玩法介绍 #howtoplay点击后显示-->
<div id="htp">
    <a href="javascript:;" id="close_cyou4" class="close_cyou">
        <span class="x"></span>
    </a>
    <div class="htp_con">
        <a href="javascript:;" id="gotocalculate"></a>
    </div>
</div>
<!--计算公式 #calculate点击后显示-->
<div id="calcu">
    <a href="javascript:;" id="close_cyou5" class="close_cyou">
        <span class="x"></span>
    </a>
    <div class="calcu_con">
        <a href="javascript:;" id="calculatemain"></a>
    </div>
</div>
<input type="hidden" id="todayOilPrice" value="<?php echo $one_bet_oilBean_num; ?>">
<input type="hidden" id="enoughBet" value="<?php echo $oilBeanLActInfo['0']['enoughBet']; ?>">
<input type="hidden" id="u_id" value="<?php echo $uId; ?>">
</body>
<script src="__STATIC__/js/rem.js"></script>
<script src="__STATIC__/js/jquery1.8.3.js"></script>
<script src="__STATIC__/js/main.js"></script>
</html>