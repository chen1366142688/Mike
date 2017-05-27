<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/4/13
 * Time: 13:16
 */
function getCqsscCode(){
    //设定编码
    header("content-type:text/html;charset=utf8");
    //获取内容
    $html_string = file_get_contents("http://www.cqcp.net/game/ssc/");

    //截取开奖列表代码
    $html_string = substr($html_string,strpos($html_string,"<div id=\"openlist\">"));
    //重庆时时彩官网采用GBK编码，转码为UTL8
    $html_string =   mb_convert_encoding($html_string,"utf-8","GBK");
    //摘取列表内UL列表内容，列表内为开奖信息
    $search = '/<ul>(.*?)<\/ul>/is';
    preg_match_all($search,$html_string,$r,PREG_SET_ORDER );
    //截取有效UL内容
    for($i=0;$i<=9;$i++){
        $res[]=$r[$i][1];
    }
    //对UL进行内容匹配，正则表达式
    $reg = '/<li style=\'width:65px;\'>(.*?)<\/li><li style=\'width:80px;\'>(.*?)<\/li><li style=\'width:50px;\'>(.*?)<\/li><li style=\'width:40px;\'>(.*?)<\/li><li style=\'width:40px;\'>(.*?)<\/li><li style=\'width:40px;\'>(.*?)<\/li><li style=\'width:40px;\'>(.*?)<\/li><li style=\'width:40px;\'>(.*?)<\/li>.*/is';
    $i = 0;
    //内容匹配结果进行分析入组
    foreach($res as $key=>$value){
        preg_match_all($reg,$value,$result,PREG_SET_ORDER );
        $result_array[$i]['persom'] = "20".$result[0][1];
        $open_lotto_number = (int)implode(explode("-",$result[0][2]),"");
        $result_array[$i]['winnum'] = $open_lotto_number;
        $i++;
    }
    //返回组内数据
    return $result_array;
}

