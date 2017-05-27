<?php
namespace app\index\controller;
use think\Controller;
use think\Cookie;
use think\Loader;
use think\view;
use think\Db;
class Index extends Controller
{
    public function index()
    {
        $openid = isset($_GET['unionid']) ? $_GET['unionid'] : '';
        if(empty($openid)){
            header("location:http://wzcx.chetuobang.com/wz_api/?service=oil.index");
            exit();
        }
        $ou = Loader::model('Open_union_relation');
        $user = Loader::model('User');

        $info = $ou->where('openid',$openid)->find();
        if(!isset($info->unionid)){
            header("location:http://wzcx.chetuobang.com/wz_api/?service=oil.index");
            exit();
        }

        $result = Db::table('ctb_user')->where('u_union_id',$info->unionid)->find();
        if(!empty($result)){
            Cookie::set('u_id',$result['u_id']);
            Cookie::set('openid',$openid);
            $view = new view();
            return $view->fetch('index');
        }
        $userInfo = $user->where('unionid',$info->unionid)->find();

        $data = array(
            'u_union_id' => $info->unionid,
            'u_open_id' => $info->openid,
            'u_gender' => $userInfo->sex,
            'u_headimgurl' => $userInfo->headimgurl,
            'u_nick' => $userInfo->nickname,
            'u_position' => $userInfo->province.' '.$userInfo->city,
            //'u_telephone' => $userInfo->mobile,
        );
        $res = Db::table('ctb_user')->insert($data);
        if(!$res){
            header("location:http://wzcx.chetuobang.com/wz_api/?service=oil.index");
            exit();
        }
        $userId = Db::name('user')->getLastInsID();
        Cookie::set('u_id',$userId);
        Cookie::set('openid',$openid);
        $view = new view();
        return $view->fetch('index');
    }
}
