<?php
/**
*按发布时间逆序返回新闻列表
*请求参数：
  pageNum-需显示的页号；默认为1
*输出结果：
  {
    totalRecord: 58,
    pageSize: 10,
    pageCount: 6,
    pageNum: 1,
    data: [{},{} ... {}]
  }
*/

require('init.php');

@$pageNum = $_REQUEST['pageNum'] or $pageNum = 1;

$output['pageNum'] = intval($pageNum);
$output['pageSize'] = 5;

//获取总记录数和总页数
$sql = "SELECT COUNT(*) FROM mf_news";
$result = mysqli_query($conn,$sql);
$output['totalRecord'] = intval( mysqli_fetch_row($result)[0] );
$output['pageCount'] = ceil($output['totalRecord']/$output['pageSize']);

//获取指定页中的数据
$start = ($output['pageNum']-1)*$output['pageSize'];
$count = $output['pageSize'];
$sql = "SELECT * FROM mf_news ORDER BY pubTime DESC LIMIT $start,$count";
$result = mysqli_query($conn,$sql);
$output['data'] = mysqli_fetch_all($result, MYSQLI_ASSOC);


echo json_encode($output);

