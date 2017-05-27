<?php
/**
 * Created by PhpStorm.
 * User: zmx_up
 * Date: 2017/2/16
 * Time: 下午6:45
 */
namespace app\personalCenter\model;
use think\Model;
use think\db;

class user_bill extends Model
{
    const MONEY_TYPE_OIL_BEAN = 1;//油豆
    const MONEY_TYPE_CASH = 2;//现金

    const PAY_CHANNEL_CASH_RECHARGE_OIL     = 1;//油卡充值花费现金
    const PAY_CHANNEL_CASH_RECHARGE_OILBEAN = 2;//充值油豆花费现金
    const PAY_CHANNEL_CDKEY                 = 3;//cdkey码充值油豆
    const PAY_CHANNEL_LATTERY_PRIZE         = 4;//油豆夺宝奖励
    const PAY_CHANNEL_RECHARGE_OIL_BEAN     = 5;//充值油豆增加
    const PAY_CHANNEL_OILBEAN_RECHARGE_OIL  = 6;//油豆充值油卡
    const PAY_CHANNEL_OILBEAN_SHOP          = 7;//油豆商城花费
    const PAY_CHANNEL_LATTERY_BET           = 8;//油豆夺宝花费

    public function getUserBillInfo($u_id){
        $query = new \think\db\Query();
        return $query
            ->table('user_bill')
            ->where('u_id',$u_id)
            ->order("b_time desc")
            ->select();
    }

}
?>