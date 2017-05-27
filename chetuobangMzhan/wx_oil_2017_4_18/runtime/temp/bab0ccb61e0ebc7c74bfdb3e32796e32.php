<?php if (!defined('THINK_PATH')) exit(); /*a:1:{s:67:"/www/html/wx_oil/public/../application/member/view/index/index.html";i:1491967968;}*/ ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>用户详情</title>
    <link rel="stylesheet" href="/static/css/base.css">
    <link rel="stylesheet" href="/static/css/user.css">
    <script src="/static/js/jquery-1.11.3.js"></script>

</head>
<body>
    <!--top-->
    <div class="main">
        <!--用户头像-->
        <div class="Avatar" id="Avatar">
            <img src="<?php echo $info['u_headimgurl']; ?>" alt="avatar" id="img">
        </div>
        <!--用户名称-->
        <div class="userName" id="userName">
            <?php if($info['u_gender'] == 1): ?>
                <img id="imgs" src="/static/images/male.png" alt="gender">
            <?php else: ?>
                <img id="imgs" src="/static/images/female.png" alt="gender">
            <?php endif; ?>
            <b id="uN"><?php echo $info['u_nick']; ?></b>
        </div>
    </div>
    <!--details-->
    <div class="c_section">
        <a class="c_content" href="/member/index/account">
            <span class="c_Account fl">我的账户</span>
            <span></span>
        </a>
    </div>
    <!--订单-->
    <div class="c_section">
        <a class="c_content" href="/member/index/orders">
            <span class="c_Account fl">我的订单</span>
            <span ></span>
        </a>
    </div>
    <!--个人信息-->
    <div class="c_section">
        <a class="c_content" href="/member/index/info">
            <span class="c_Account fl" >个人信息</span>
            <span></span>
        </a>
    </div>
</body>
</html>