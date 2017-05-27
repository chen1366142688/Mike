<?php
namespace app\personalCenter\controller;
use app\personalCenter\model\ctb_user;
use app\personalCenter\model\user_bill;
use think\Controller;

class Index extends Controller{
    const HOMEPAGE = "http://oil.chetuobang.com";
    public function getUserInfo(){
        $u_id = $_COOKIE['u_id'];
        if(empty($u_id) || $u_id == 0){
            header("Location:".self::HOMEPAGE."?link=".'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'] );
            exit();
        }
        $user_obj = new ctb_user();
        $user_info = $user_obj -> getUserInfo($u_id);
        if(empty($user_info)){
            $return=[
                'code'=>100001,
                'status'=>false,
                'info'=>'非法操作，用户信息异常'
            ];
            return json_encode($return);
        }
    }
    public function getUserBillInfo(){
        $u_id = $_COOKIE['u_id'];
        if(empty($u_id) || $u_id == 0){
            header("Location:".self::HOMEPAGE."?link=".'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'] );
            exit();
        }
        $user_obj = new ctb_user();
        $user_info = $user_obj -> getUserInfo($u_id);
        if(empty($user_info)){
            $return=[
                'code'=>100001,
                'status'=>false,
                'info'=>'非法操作，用户信息异常'
            ];
            return json_encode($return);
        }
        $u_id = $user_info['u_id'];
        $bill_obj = new user_bill();
        $bill_info = $bill_obj -> getUserBillInfo($u_id);
        return $this->fetch('user_bill',['bill_info'=>$user_info]);
    }
}

?>