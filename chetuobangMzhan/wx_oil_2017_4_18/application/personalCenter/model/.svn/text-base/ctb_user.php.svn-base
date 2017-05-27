<?php
/**
 * Created by PhpStorm.
 * User: zmx_up
 * Date: 2017/2/16
 * Time: 下午4:52
 */
namespace app\personalCenter\model;

use think\Model;

class ctb_user extends Model
{
    public function getUserInfo($u_id){
        $query = new \think\db\Query();
        return $query->table('ctb_user')->where("u_id",$u_id)->find();
    }
}
?>