<?php
namespace app\crontab\controller;
use app\oilbeanLotteryActivity\model\ctb_user;
use app\oilbeanLotteryActivity\model\oil_price;
use app\oilbeanLotteryActivity\model\oilbean_lottery_activity;
use app\oilbeanLotteryActivity\model\oilbean_lottery_activity_participator;
use app\oilbeanLotteryActivity\model\user_bill;
use think\Controller;

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
class OilbeanLotteryActivity extends Controller
{
    const LottoServerCharge = 0.2; //平台服务费20%
    const DefaultNewOpenActivity = 3;//默认新开期打开活动数目
    /**
     *定时查询进行封盘操作
     */
    public function CloseOilbeanLotteryActivity(){
        //获取当前时时彩还有多久时间开奖，即最近一期开奖时间加上8m50s，10s为系统时间误差
         $next_open_time=1488164446;
        //获取当前运行活动是否拥有大于或等于下一次开奖时间
        $oil_act_obj = new oilbean_lottery_activity();
        $next_open_time = date("Y-m-d H:i:s",$next_open_time);
        $oil_act_yet_close_act = $oil_act_obj -> getYetCloseActivityInfo($next_open_time);
        if(is_null($oil_act_yet_close_act)){
            return "暂无封盘操作";
        }
        $ids="";
        foreach($oil_act_yet_close_act as $key => $value){
                $ids.= $value['a_id'].",";

        }
        $ids = substr($ids,0,strlen($ids)-1);
        $oil_act_obj -> CloseActivity($ids);
    }
    public function startlotto(){
        //查询当前时时彩最近一期的开奖记录,并减少60s作为标识，60s为系统时间误差
        $open_time=1488164446;
        $open_lotto_number = 12345;
        $open_lotto_periods = 20151515;
        //获取当前封盘并且达到开奖时间的
        $oil_act_obj = new oilbean_lottery_activity();
        $start_lotto_act = $oil_act_obj -> getStartLottoActivityInfo($open_time);
        if(empty($start_lotto_act)){
            return ;
        }
        $oil_act_par_obj = new oilbean_lottery_activity_participator();
        $ctb_user_obj = new ctb_user();
        foreach($start_lotto_act as $key => $value){
            //如果活动无人参与，到时自动终止
            if($value['a_sum_people_num'] <= 0) {
                $oil_act_obj -> startLottoActivity($value['a_id'] , 0 , $open_lotto_number , $open_lotto_periods);
                break;
            }
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
