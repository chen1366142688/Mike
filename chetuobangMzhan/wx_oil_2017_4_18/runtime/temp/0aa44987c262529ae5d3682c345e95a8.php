<?php if (!defined('THINK_PATH')) exit(); /*a:1:{s:56:"/web/public/../application/member/view/index/orders.html";i:1491816115;}*/ ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>充值详情</title>
    <link rel="stylesheet" href="/static/css/base.css">
    <link rel="stylesheet" href="/static/css/pterol_detail.css">
    <script src="/static/js/jquery-1.11.3.js"></script>
</head>
<body>
    <!--总容器-->
    <?php if(is_array($info) || $info instanceof \think\Collection): $i = 0; $__LIST__ = $info;if( count($__LIST__)==0 ) : echo "$empty" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?>
        <div class="main">
            <!--details-->
            <div class="details">
                <div class="c_date">
                    <span><?php echo $vo['b_time']; ?></span>
                    <p><?php echo $vo['b_money']; if($vo['b_money_type'] == 2): ?>
                        <b>元人民币</b>
                    <?php else: ?>
                        <b>油豆</b>
                    <?php endif; ?>

                    </p>
                </div>
                <p class="num">
                    <?php switch($vo['b_channel_id']): case "1": ?>现金充值油卡<b><?php echo $vo['b_money']; ?></b>元人民币<?php break; case "3": ?>兑换码获得<b><?php echo $vo['b_money']; ?></b>油豆<?php break; case "4": ?>夺宝中奖获得<b><?php echo $vo['b_money']; ?></b>油豆<?php break; case "5": ?>充值获得<b><?php echo $vo['b_money']; ?></b>油豆<?php break; case "6": ?>充值油卡<b>&nbsp;<?php echo isset($card) ? $card :  '123'; ?>&nbsp;</b>消费<b><?php echo abs($vo['b_money']); ?></b>油豆<?php break; case "7": ?>积分商城消费<b><?php echo abs($vo['b_money']); ?></b>油豆<?php break; case "8": ?>夺宝下注消费<b><?php echo abs($vo['b_money']); ?></b>油豆<?php break; endswitch; ?>
                     </p>
                <?php if($vo['b_money_type'] == 2): ?>
                <p class="num_2"> 价值<?php echo abs($vo['b_money'] ); ?>元</p>
                <?php else: ?>
                <p class="num_2"><?php echo abs($vo['b_money']); ?>油豆&nbsp;价值<?php echo abs($vo['b_money']/100 ); ?>元</p>
                <?php endif; ?>
            </div>
        </div>
    <?php endforeach; endif; else: echo "$empty" ;endif; ?>
</body>
</html>