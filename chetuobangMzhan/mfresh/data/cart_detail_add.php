<?php
/**
*向购物车中添加商品
*请求参数：
  uid-用户ID，必需
  pid-产品ID，必需
*输出结果：
* {"code":1,"msg":"succ", "productCount":1}
* 或
* {"code":400}
*/
@$uid = $_REQUEST['uid'] or die('uid required');
@$pid = $_REQUEST['pid'] or die('pid required');

require('init.php');

//查看指定用户是否有购物车，无则创建，获取到购物车编号
$sql = "SELECT cid FROM mf_cart WHERE userId=$uid";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_row($result);
if($row){ //购物车存在
  $cid = $row[0];
}else {   //购物车不存在
  $sql = "INSERT INTO mf_cart VALUES(NULL, $uid)";
  mysqli_query($conn,$sql);
  $cid = mysqli_insert_id($conn);
}

//判断购物车详情表中是否已经存在该商品记录
$sql = "SELECT did,count FROM mf_cart_detail WHERE cartId=$cid AND productId=$pid";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
if($row){   //之前曾经购买过该商品，则购买数量+1
  $count = intval($row['count']);
  $count++;
  $sql = "UPDATE mf_cart_detail SET count=$count WHERE cartId=$cid AND productId=$pid";
  mysqli_query($conn,$sql);
}else {     //之前从未购买过该商品，则添加购买记录，购买数量为1
  $count = 1;
  $sql = "INSERT INTO mf_cart_detail VALUES(NULL,$cid, $pid, $count)";
  mysqli_query($conn,$sql);
}
$output['productCount'] = $count;
$output['code'] = 1;
$output['msg'] = 'succ';


echo json_encode($output);