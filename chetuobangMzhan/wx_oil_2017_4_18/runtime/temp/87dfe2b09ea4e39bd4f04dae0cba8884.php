<?php if (!defined('THINK_PATH')) exit(); /*a:1:{s:66:"/www/html/wx_oil/public/../application/member/view/index/info.html";i:1491967968;}*/ ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>
        <?php if(empty($info['u_address']) && empty($info['u_telephone'])): ?>
        个人信息修改
        <?php else: ?>
        我的个人信息
        <?php endif; ?>
    </title>
    <link rel="stylesheet" href="/static/css/base.css">
    <link rel="stylesheet" href="/static/css/information.css">
    <script src="/static/js/jquery-1.11.3.js"></script>
    <script src="/static/js/rem.js"></script>
    <script src="/static/js/information.js"></script>
</head>
<body>
    <!--总容器-->
    <div class="main" id="main">
        <?php if(empty($info['u_address']) && empty($info['u_telephone'])): ?>
        <p>修改我的个人信息</p>
            <input id="phone" type="text" placeholder="请输入手机号码" name="telephone">
        <textarea id="address"  type="text" placeholder="请输入地址" name="address"></textarea>
            <input id="submit" disabled="disabled" type="button" value="提&nbsp;交" name="sub">
        <?php else: ?>
        <p>我的个人信息</p>
        <span id="ph">手机号码：<?php echo $info['u_telephone']; ?></span>
        <span id="ad">地址名称：<?php echo $info['u_address']; ?></span>
        <?php endif; ?>
    </div>
</body>
</html>