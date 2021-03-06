<?php
namespace app\crontab\controller;
use app\oilbeanLotteryActivity\model\ctb_user;
use app\oilbeanLotteryActivity\model\oil_price;
use app\oilbeanLotteryActivity\model\oilbean_lottery_activity;
use app\oilbeanLotteryActivity\model\oilbean_lottery_activity_participator;
use app\oilbeanLotteryActivity\model\user_bill;
use phpDocumentor\Reflection\DocBlock\Tags\Example;
use think\Controller;
header("content-type:text/html; charset=utf-8");
/**
 * Created by PhpStorm.
 * User: zmx_up
 * Date: 2017/2/16
 * Time: 下午10:20
 */

/**
 * Class OilbeanLotteryActivity
 * @package app\crontab\controller
 * 进行油豆夺宝活动的定时任务处理
 */
class Ola extends Controller
{
    const LottoServerCharge = 0.2; //平台服务费20%
    const DefaultNewOpenActivity = 3;//默认新开期打开活动数目
    const OpenCaiApi             = "http://a.apiplus.net/newly.do?token=885d2f84af0ada00&code=cqssc&format=json";
    /**
     *定时查询进行封盘操作
     */
    public function CloseOilbeanLotteryActivity(){
        //获取当前时时彩还有多久时间开奖，即最近一期开奖时间加上8m50s，10s为系统时间误差
        try{
            echo "开始封盘，进行开彩网接口调用".PHP_EOL;
            $open_cai_api_info = file_get_contents(self::OpenCaiApi);
            echo "开彩网接口调用完成，进行数据处理".PHP_EOL;
            $open_cai_api_array = json_decode($open_cai_api_info,true);
            $open_time=$open_cai_api_array['data'][0]['opentimestamp'];
        }catch (\Exception $e){
            echo "开始封盘，进行管网正则匹配".PHP_EOL;
            $result = $this->getCqsscCode();
            echo "匹配完成，进行数据处理".PHP_EOL;
            $open_lotto_periods = $result[0]['persom'];
            $person = substr($open_lotto_periods,-2);
            if($person<=24){
                $time = date("Y-m-d")." 00:00:00";
                $time = strtotime($time);
                $time=300*$person+$time;//10分钟一期
            }elseif($person>24 && $person<=96){
                $time = date("Y-m-d")." 10:00:00";
                $time = strtotime($time);
                $time =$time+600*($person-24);
            }else{
                $time = date("Y-m-d")." 22:00:00";
                $time = strtotime($time);
                $time =$time+($person-96)*300;
            }
            $open_time = $time;
        }
        $next_open_time = $open_time + 530;
        //获取当前运行活动是否拥有大于或等于下一次开奖时间
        $oil_act_obj = new oilbean_lottery_activity();
        $next_open_time = date("Y-m-d H:i:s",$next_open_time);
        $oil_act_yet_close_act = $oil_act_obj -> getYetCloseActivityInfo($next_open_time);
        if(is_null($oil_act_yet_close_act)){
            exit( "暂无封盘操作" ) ;
        }
        $ids="";
        foreach($oil_act_yet_close_act as $key => $value){
                $ids.= $value['a_id'].",";

        }
        $ids = substr($ids,0,strlen($ids)-1);
        $oil_act_obj -> CloseActivity($ids);
        exit("封盘的活动ID".$ids);
    }
    function getCqsscCode(){
        //设定编码
        //header("content-type:text/html;charset=utf8");
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
    public function startlotto(){
        //查询当前时时彩最近一期的开奖记录,并减少60s作为标识，60s为系统时间误差
//        $open_time=1988164446;
//        $open_lotto_number = 12345;
//        $open_lotto_periods = 20151515;
        //查询当前时时彩最近一期的开奖记录,并减少60s作为标识，60s为系统时间误差
        try{
            echo "开始开奖，调用开彩网接口";
            $open_cai_api_info = file_get_contents(self::OpenCaiApi);
            echo "调用完成";
            $open_cai_api_array = json_decode($open_cai_api_info,true);
            //print_r($open_cai_api_array);die;
            $open_time=$open_cai_api_array['data'][0]['opentimestamp'];
            $open_lotto_number = $open_cai_api_array['data'][0]['opencode'];

            $open_lotto_number = (int)implode(explode(",",$open_lotto_number),"");
            $open_lotto_periods = $open_cai_api_array['data'][0]['expect'];
        }catch (\Exception $e){
            $opencaiStatus = "开彩网无效";

        }
        if(isset($opencaiStatus)){
            echo "开彩网调用失败，进行管网获取数据";
            $result = $this->getCqsscCode();
            echo "获取完成";
            $open_lotto_number = $result[0]['winnum'];
            $open_lotto_periods = $result[0]['persom'];
            $person = substr($open_lotto_periods,-2);
            if($person<=24){
                $time = date("Y-m-d")." 00:00:00";
                $time = strtotime($time);
                $time=300*$person+$time;//10分钟一期
            }elseif($person>24 && $person<=96){
                $time = date("Y-m-d")." 10:00:00";
                $time = strtotime($time);
                $time =$time+600*($person-24);
            }else{
                $time = date("Y-m-d")." 22:00:00";
                $time = strtotime($time);
                $time =$time+($person-96)*300;
            }
            $open_time = $time;
        }
        //获取当前封盘并且达到开奖时间的
        $oil_act_obj = new oilbean_lottery_activity();
        $start_lotto_act = $oil_act_obj -> getStartLottoActivityInfo($open_time);
        if(empty($start_lotto_act)){
            exit( "没有需要开奖的记录" ) ;
        }
        $oil_act_par_obj = new oilbean_lottery_activity_participator();
        $ctb_user_obj = new ctb_user();
        foreach($start_lotto_act as $key => $value){
            //如果活动无人参与，到时自动终止
            if($value['a_sum_people_num'] <= 0) {
                echo "有开奖，但本期无人参与；时时彩号码：".$open_lotto_number.",期数：".$open_lotto_periods."</br>";
                $oil_act_obj -> startLottoActivity($value['a_id'] , 0 , $open_lotto_number , $open_lotto_periods);
            }else{
                echo "有开奖，时时彩号码：".$open_lotto_number.",期数：".$open_lotto_periods."</br>";
                //计算出幸运号码
                $open_lotto_number_temp = $value['a_sum_people_num'] - ($open_lotto_number%$value['a_sum_people_num']);
                //获取幸运参与者的ID
                $oil_act_par_id = $oil_act_par_obj -> getLottoParticipator($value['a_id'],$open_lotto_number_temp);
                //计算出奖池抽取服务费之后的内容，进行油豆充值
                $lotto_oil_bean = $value['a_sum_money'] *(1-self::LottoServerCharge);
                $ctb_user_obj -> updateUserOilbean($oil_act_par_id['u_id'],$lotto_oil_bean);
                $oil_act_obj -> startLottoActivity($value['a_id'] , $oil_act_par_id['u_id'],$open_lotto_number,$open_lotto_periods);
                $bill_obj = new user_bill();
                $bill_obj ->addUserBillRecard($oil_act_par_id['u_id'],$lotto_oil_bean,$bill_obj::MONEY_TYPE_OIL_BEAN,$bill_obj::PAY_CHANNEL_LATTERY_PRIZE);
            }
        }
        if(!empty($start_lotto_act)){
            $today_ten_stamp = strtotime(date("Y-m-d",time())." 22:00:00");
            if($today_ten_stamp <= $open_time){
                $periods_time = 300;
            }else{
                $periods_time = 600;
            }
            $new_activity['a_periods_parent'] = $open_lotto_periods+1;
            for($i=1;$i<=self::DefaultNewOpenActivity;$i++){
                $new_activity['a_periods']      = $i;
                $begin_time_stamp = $open_time+30;
                $new_activity['a_begin_time']   = date("Y-m-d H:i:s",$begin_time_stamp);//增加三十秒
                $new_activity['a_end_time']     = date("Y-m-d H:i:s",($begin_time_stamp + $periods_time));//十分钟后开奖时间
                $new_activity_data_arr[]=$new_activity;
            }
            $oil_act_obj -> newActivityCreate($new_activity_data_arr);
        }else{
            exit( "没有需要开奖的记录" ) ;
        }

        return ;
    }
    /**
     * 更新今日油价，自动添加
     */
    public function todayOilPrice(){
        $oil_price_obj = new oil_price();
        $oil_price_obj -> updateTodayPrice();
    }
}
