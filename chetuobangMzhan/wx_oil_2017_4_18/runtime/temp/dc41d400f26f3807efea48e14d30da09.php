<?php if (!defined('THINK_PATH')) exit(); /*a:1:{s:61:"/web/public/../application/oilcard/view/index/paysuccess.html";i:1491811389;}*/ ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <meta name = "format-detection" content = "telephone=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <title>充值成功</title>
    <!--<link href="css/base.css" rel="stylesheet"/>-->
    <style>
        body{
            text-align: center;
        }
        .content{
            margin-top: 8rem;
            text-align: center;
        }
        #btn{
            width: 5rem;
            height:2rem;
            display: inline-block;
            line-height:2rem;
            background: #ff4f31;
            color: #fff;
            border-radius: 0.5rem;
            font-size: 1rem;
            margin-top: 2rem;
        }
        .content h2{
            font-size: 1rem;
        }
        .content span{
            font-size:1rem;
        }
        p{
            margin-top: 2rem;
        }
    </style>
</head>
<body>
<div class="content">
    <h2>恭喜您成功为中石化油卡 <?php echo $info['c_num']; ?> 充值了<span id="number"><?php echo $info['money']; ?></span>元人民币!</h2>
    <a id="btn" href="http://oil.chetuobang.com/member/index/orders">
        确定
    </a>
</div>
<p>将在 <span id="mes">5</span> 秒钟后返回订单中心...</p>

</body>
<!--<script src="js/rem.js"></script>-->
<script>
    var i = 5;
    var intervalid;
    intervalid = setInterval("fun()", 1000);
    function fun() {
        if (i == 0) {
            window.location.href = "http://oil.chetuobang.com/member/index/orders";
            clearInterval(intervalid);
        }
        document.getElementById("mes").innerHTML = i;
        i--;
    }
</script>
</html>
