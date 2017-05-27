<?php
/**
*根据购物车详情记录编号修改该商品购买数量
*请求参数：
  did-详情记录编号
  pid-商品编号
  count-更新后的购买数量
*输出结果：
* {"code":1,"msg":"succ"}
* 或
* {"code":400}
*/
@$did = $_REQUEST['did'] or die('did required');
@$pid = $_REQUEST['pid'] or die('pid required');
@$count = $_REQUEST['count'] or die('count required');

require('init.php');

$sql = "UPDATE mf_cart_detail SET count=$count WHERE did=$did AND productId=$pid";
$result = mysqli_query($conn,$sql);
if($result){
  $output['code']=1;
  $output['msg']='succ';
}else {
  $output['code']=400;
}


echo json_encode($output);