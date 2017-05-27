<?php
/**
*根据购物车详情记录编号删除该购买记录
*请求参数：
  did-详情记录编号
*输出结果：
* {"code":1,"msg":"succ"}
* 或
* {"code":400}
*/
@$did = $_REQUEST['did'] or die('did required');

require('init.php');

$sql = "DELETE FROM mf_cart_detail WHERE did=$did";
$result = mysqli_query($conn,$sql);
if($result){
  $output['code']=1;
  $output['msg']='succ';
}else {
  $output['code']=400;
}


echo json_encode($output);