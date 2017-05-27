<?php
/**
*根据新闻ID返回新闻详情
*请求参数：
  nid-新闻ID，必需
*输出结果：
  {
    "nid": 1,
    ...
  }
*/
@$nid = $_REQUEST['nid'] or die('nid required');

require('init.php');

$sql = "SELECT * FROM mf_news WHERE nid=$nid";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
if($row){
  $output = $row;
}

echo json_encode($output);