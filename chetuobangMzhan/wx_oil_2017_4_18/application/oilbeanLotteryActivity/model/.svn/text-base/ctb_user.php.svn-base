<?php
/**
 * Created by PhpStorm.
 * User: zmx_up
 * Date: 2017/2/16
 * Time: 下午4:52
 */
namespace app\oilbeanLotteryActivity\model;

use think\Model;

class ctb_user extends Model
{
    public function getUserInfo($u_id){
        $query = new \think\db\Query();
        return $query->table('ctb_user')->where("u_id",$u_id)->find();
    }
    /**
     * 查询上一个参与者获得的号码
     * @act_id 活动ID
     * @return array
     */
    public function getTodayOilprice(){
        $query = new \think\db\Query();
        return $query->table('oil_price')->where("p_time",date("Y-m-d",time()))->where("p_status",self::oilPriceValid)->find();
    }
    public function updateUserOilbean($user_id,$oil_bean_num){
        $query = new \think\db\Query();
        if($oil_bean_num >= 0){
            return $query->table('ctb_user')->where('u_id',$user_id)->setInc('u_oilbean', abs($oil_bean_num));
        }else{
            return $query->table('ctb_user')->where('u_id',$user_id)->setDec('u_oilbean', abs($oil_bean_num));
        }
    }
}
?>