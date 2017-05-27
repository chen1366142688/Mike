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

class oilbean_lottery_activity extends Model
{
    const ACTIVITY_STATUS_RUN         = 1;//活动运行中状态
    const ACTIVITY_STATUS_CLOSEING    = 2;//活动已经封盘
    const ACTIVITY_STATUS_STOP        = 3;//活动已经结束
    const ACTIVITY_STATUS_NOTYETBEGIN = 4;//活动尚未开始
    /**
     * 获得正在运行中的所有活动信息
     * @return false|\PDOStatement|string|\think\Collection
     */
    public function getRunactivityInfo($act_status){
        $sql = "select * FROM oilbean_lottery_activity where a_activity_status = ".$act_status." or a_activity_status = ".self::ACTIVITY_STATUS_CLOSEING;
        return Db::query($sql);
    }

    /**
     * 获取往期活动信息
     * @return mixed
     */
    public function getPastActivityResult(){
        $sql = "SELECT * FROM oilbean_lottery_activity INNER JOIN ctb_user ON oilbean_lottery_activity.u_id = ctb_user.u_id WHERE oilbean_lottery_activity.a_activity_status = ".self::ACTIVITY_STATUS_STOP." order by oilbean_lottery_activity.a_end_time desc";
        return Db::query($sql);
    }
    /**
     * 获取指定活动信息
     * @act_id 活动ID
     */
    public function getPointActivityInfo($act_id){
        $query = new \think\db\Query();
        return $query->table('oilbean_lottery_activity')->where('a_id',$act_id)->find();
    }

    /**
     * 更新活动状态
     * @param $act_id
     * @param $status
     * @return array|false|\PDOStatement|string|Model
     */
    public function updateActStatus($act_id,$status){
        $query = new \think\db\Query();
        return $query->table('oilbean_lottery_activity')->where('a_id',$act_id)->update(['a_activity_status'=>$status]);
    }

    /**
     * 更新活动参与次数,与奖池
     * @param $act_id 活动ID
     * @param $newPeopleNum 新增参与者次数
     * @return int|true
     */
    public function updateActSumPeople($act_id,$newPeopleNum,$sumMoney){
        $query = new \think\db\Query();
        $query->table('oilbean_lottery_activity')->where('a_id',$act_id)->setInc('a_sum_people_num', $newPeopleNum);
        return $query->table('oilbean_lottery_activity')->where('a_id',$act_id)->setInc('a_sum_money', $sumMoney);

    }

    /**
     * 获取需要进行封盘操作的活动
     * @param $close_time_stamp  封盘时间戳
     * @return false|\PDOStatement|string|\think\Collection
     */
    public function getYetCloseActivityInfo($close_time_stamp){
        $query = new \think\db\Query();
        return $query
            ->table('oilbean_lottery_activity')
            ->where('a_activity_status',self::ACTIVITY_STATUS_RUN)
            ->where('a_end_time <= "'.$close_time_stamp.'"')
            ->select();
    }

    /**
     * 获取需要进行开奖操作的活动
     * @param $start_lotto_time_stamp
     * @return false|\PDOStatement|string|\think\Collection
     */
    public function getStartLottoActivityInfo($start_lotto_time_stamp){
        $query = new \think\db\Query();
        return $query
            ->table('oilbean_lottery_activity')
            ->where('a_activity_status',self::ACTIVITY_STATUS_CLOSEING)
            ->where('a_end_time >= '.$start_lotto_time_stamp)
            ->select();
    }

    /**
     * 对开奖活动进行状态以及数据更新
     * @param $act_id  活动ID
     * @param $lotto_num  中奖号码
     * @return int|string
     */
    public function startLottoActivity($act_id,$u_id,$ssc_num,$ssc_per){
        $query = new \think\db\Query();
        return $query
            ->table('oilbean_lottery_activity')
            ->where('a_id',$act_id)
            ->update(['a_activity_status'=>self::ACTIVITY_STATUS_STOP , 'a_ssc_winning_number'=>$ssc_num , 'u_id'=>$u_id , 'a_ssc_periods'=>$ssc_per]);
    }
    /**
     * 对活动进行封盘操作
     * @param $ids  需要封盘操作的活动ID字符串
     * @return int|string
     */
    public function CloseActivity($ids){
        $query = new \think\db\Query();
        return $query
            ->table('oilbean_lottery_activity')
            ->where(['a_id' => ['in',$ids] ])
            ->update(['a_activity_status'=>self::ACTIVITY_STATUS_CLOSEING]);
    }
    public function newActivityCreate($data_arr){
        $query = new \think\db\Query();
        return $query
            ->table('oilbean_lottery_activity')
            ->insertAll($data_arr);
    }
}
?>