<?php
/**
*验证电话号码是否已经存在
*请求参数：
  phone-用户名
*输出结果：
* {"code":1,"msg":"exist"}
* 或
* {"code":2,"msg":"non-exist"}
*/
@$phone = $_REQUEST['phone'] or die('phone required');

require('init.php');

$sql = "SELECT uid FROM mf_user WHERE phone='$phone'";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
if($row){
  $output['code'] = 1;
  $output['msg'] = 'exist';
}else {
  $output['code'] = 2;
  $output['msg'] = 'non-exist';
}

echo json_encode($output);
