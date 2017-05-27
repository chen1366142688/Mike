<?php if (!defined('THINK_PATH')) exit(); /*a:1:{s:58:"/web/public/../application/oilcard/view/index/binding.html";i:1491371859;}*/ ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>油卡充值</title>
    <link rel="stylesheet" href="/static/css/base.css">
    <link rel="stylesheet" href="/static/css/pterol.css">
    <link href="/static/images/icon-ctb.jpg" rel="shortcut icon">
    <script src="/static/js/jquery-1.11.3.js"></script>
    <style>
        .c_c1,.c_c2{
            font-family: "Adobe Heiti Std";
            font-size: 1.2rem;
        }
        .c_c2{
            margin-bottom: 1rem;
        }
        p span{
            font-size: 1.2rem;
        }
    </style>
</head>
<body>
    <!--总容器-->
    <div class="main">
        <!--油卡-->
        <div class="c_top"></div>
        <input id="cardType" type="hidden" value="<?php echo \think\Request::instance()->get('type'); ?>">
        <!--卡号，手机号-->
        <div class="c_hao">

                <input class="c_item" type="text" placeholder="请输入卡号">
                <input  class="c_items" type="text" placeholder="请输入手机号">
        </div>
        <!--立即绑定-->
            <a href="javascript:;" class="c_bding">立即绑定</a>
        <!--备注-->
        <p class="c_jin">ⓘ 仅支持中国石化加油卡充值</p>
    </div>
    <script src="/static/js/pterol.js"></script>
</body>
</html>