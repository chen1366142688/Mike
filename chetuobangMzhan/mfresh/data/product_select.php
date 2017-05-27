<?php
/**
*分页获取产品信息
*请求参数：
  pageNum-需显示的页号；默认为1
  type-可选，默认为1
*输出结果：
  {
    totalRecord: 37,
    pageSize: 6,
    pageCount: 7,
    pageNum: 1,
    type: 1,
    data: [{},{} ... {}]
  }
*/
require('init.php');

@$pageNum = $_REQUEST['pageNum'] or $pageNum = 1;
@$type = $_REQUEST['type'] or $type = 1;

$output['pageNum'] = intval($pageNum);
$output['type'] = intval($type);
$output['pageSize'] = 3;

//获取总记录数和总页数
$sql = "SELECT COUNT(*) FROM mf_product WHERE type=$type";
$result = mysqli_query($conn,$sql);
$output['totalRecord'] = intval( mysqli_fetch_row($result)[0] );
$output['pageCount'] = ceil($output['totalRecord']/$output['pageSize']);

//获取指定页中的数据
$start = ($output['pageNum']-1)*$output['pageSize'];
$count = $output['pageSize'];
$sql = "SELECT * FROM mf_product WHERE type=$type ORDER BY pid DESC LIMIT $start,$count";
$result = mysqli_query($conn,$sql);
$output['data'] = mysqli_fetch_all($result, MYSQLI_ASSOC);


echo json_encode($output);