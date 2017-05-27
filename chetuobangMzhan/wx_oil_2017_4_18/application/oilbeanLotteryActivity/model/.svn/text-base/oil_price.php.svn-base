<?php
/**
 * Created by PhpStorm.
 * User: zmx_up
 * Date: 2017/2/14
 * Time: 下午3:23
 */
namespace app\oilbeanLotteryActivity\model;

use think\Model;
use think\db;

class oil_price extends Model
{
    const oilPriceValid = 1;    //今日有效油价状态码
    const oilPriceInactive = 0; //今日无效油价状态码
    /**
     * 查询今日油价
     * @return array
     */
    public function getTodayOilprice(){
        $query = new \think\db\Query();
        return $query->table('oil_price')->order("p_time desc")->where("p_status",self::oilPriceValid)->find();
    }
    /**
     * 更新今日油价
     * @return int|string
     */
    public function updateTodayPrice(){
        $query = new \think\db\Query();
        $data_arr['p_time']     = date("Y-m-d",time());
        $data_arr['p_status']   = self::oilPriceValid;
        $last_oil_price = Db::table('oil_price')->where('p_status',self::oilPriceValid)->order("p_time desc")->column('p_oil_price');
        $data_arr['p_oil_price']= $last_oil_price[0];
        return $query->table('oil_price')->insert($data_arr);
    }
}
?>