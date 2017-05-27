<?php
/**
 * Created by PhpStorm.
 * User: zmx_up
 * Date: 2017/2/14
 * Time: 下午3:23
 */
namespace app\oilbeanLotteryActivity\model;

use think\Model;
use think\Db;

class oilbean_lottery_activity_participator extends Model
{
    /**
     * 查询上一个参与者获得的号码
     * @act_id 活动ID
     * @return array
     */
    public function getLastParticipatorActnum($act_id){
        $query = new \think\db\Query();
        return $query->table('oilbean_lottery_activity_participator')->where("a_id",$act_id)->order('p_get_activity_num desc')->find();//column('p_get_activity_num');
    }

    /**
     * 保存新增下注参与用户
     * @param array $par_data   参与用户数据
     * @return int|string
     */
    public function saveNewParticipator($par_data){
        return Db::name('oilbean_lottery_activity_participator')->insertAll($par_data);
    }

    /**
     * 查询特定活动的参与者列表
     * @param $act_id
     * @return false|\PDOStatement|string|\think\Collection
     */
    public function getParticipatorList($act_id){
        return Db::table("oilbean_lottery_activity_participator")->where("a_id",$act_id)->join("ctb_user user",'oilbean_lottery_activity_participator.u_id = user.u_id')->order("p_get_activity_num desc")->select();
    }

    /**
     * 查询特定活动的参与者数目
     * @param $act_id
     * @return false|\PDOStatement|string|\think\Collection
     */
    public function getParticipatorNum($act_id){
        return Db::table("oilbean_lottery_activity_participator")->where("a_id",$act_id)->count('p_id');
    }

    /**
     * 获取得奖号码的详细信息
     * @param $act_id
     * @param $num
     * @return int
     */
    public function getWinNumInfo($act_id,$num){
        return Db::table("oilbean_lottery_activity_participator")->where("a_id",$act_id)->where("p_get_activity_num",$num)->find();
    }
    /**
     * 查询特定用户获得的号码
     * @param $act_id
     * @param $u_id
     * @return false|\PDOStatement|string|\think\Collection
     */
    public function getUserGetNumList($act_id,$u_id){
        return Db::table("oilbean_lottery_activity_participator")->where("a_id",$act_id)->where("u_id",$u_id)->order("p_get_activity_num desc")->select();
    }
    /**
     * 获取开奖后活动幸运参与者
     * @param $act_id 活动ID
     * @param $lotto_num 幸运号码
     * @return array|false|\PDOStatement|string|Model
     */
    public function getLottoParticipator($act_id,$lotto_num){
        return Db::name('oilbean_lottery_activity_participator')->where("a_id",$act_id)->where("p_get_activity_num",$lotto_num)->find();
    }

    /**查询特定用户是否参与过该活动
     * @param $act_id
     * @param $user_id
     * @return array|false|\PDOStatement|string|Model
     */
    public function getUserIsPatored($act_id,$user_id){
        return Db::name('oilbean_lottery_activity_participator')->where("a_id",$act_id)->where("u_id",$user_id)->find();
    }
}
?>