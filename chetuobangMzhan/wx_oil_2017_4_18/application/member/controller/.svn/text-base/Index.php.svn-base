<?php
/**
 * Created by PhpStorm.
 * User: ctbz
 * Date: 2017/2/20
 * Time: 10:55
 */
namespace app\member\controller;
use think\Controller;
use app\common\wechat;
use think\Cookie;
use think\Loader;
use think\Request;
use think\view;
use think\Db;
use app\member\model\ctb_user;

class Index extends Controller{

    protected $userInfo;
    protected $u_id;

    public function __construct(Request $request = null)
    {
        parent::__construct($request);
        $u_id = Cookie::get('u_id');
        $openid = Cookie::get('openid');
        if(empty($u_id) || empty($openid)){
            header("location:http://wzcx.chetuobang.com/wz_api/?service=oil.index");
            exit();
        }
        $arr = Db::name('ctb_user')->where('u_id',$u_id)->where('u_open_id',$openid)->limit(0,1)->find();
        if(empty($arr)){
            header("location:http://wzcx.chetuobang.com/wz_api/?service=oil.index");
            exit();
        }
        $this->u_id = $u_id;
        $this->userInfo = $arr;
    }

    public function index(){
        $view = new view();
        return $view->fetch('index',[
            'info'  => $this->userInfo
        ]);
    }

    public function account(){
        $view = new view();
        return $view->fetch('account',[
            'info'  => $this->userInfo
        ]);
    }

    public function paysuccess(){

        $order_no = $_GET['order_no'];
        $wx_pay = Loader::model('wx_pay');
        $orderInfo = $wx_pay->where('out_trade_no',$order_no)->where('status',1)->find();

        if(empty($orderInfo)){
            //return '订单不存在或者出现错误，请联系网站管理员。';
            header("location:http://oil.chetuobang.com/member/index/account");
            exit();
        }
        $arr = array(
//            'out_trade_no' => $orderInfo->out_trade_no,
//            'transaction_id' => $orderInfo->transaction_id,
//            'money' => $orderInfo->money,
//            'status' => $orderInfo->status,
            'product' => intval(100*$orderInfo->notify_money),
//            'description' => $orderInfo->description,
//            'notify_money' => $orderInfo->notify_money,
//            'openid' => $orderInfo->openid,
//            'notify_time' => $orderInfo->notify_time,
        );
        $zz =  Db::table('user_bill')->where('out_trade_no',$orderInfo->out_trade_no)->find();
        if(isset($zz) && !empty($zz)){
            $view = new view();
            return $view->fetch('paysuccess',[
                'info' => $arr
            ]);
        }
//        if((time() - strtotime($orderInfo->notify_time)) > 60 ){
//            return '系统出错，请联系网站管理员。';
//        }

        $res = Db::table('ctb_user')->where('u_open_id',$orderInfo->openid)->find();
        Db::table('ctb_user')->where('u_open_id',$orderInfo->openid)->setInc('u_oilbean',intval(100*$orderInfo->notify_money));

        $data = array(
            'b_money' => intval(100*$orderInfo->notify_money),
            'b_time' => $orderInfo->notify_time,
            'b_money_type' => 1,
            'u_id' => $res['u_id'],
            'b_channel_id' => 5,
            'out_trade_no' => $orderInfo->out_trade_no,
            'b_oilbean_remain' => intval($res['u_oilbean']+(100*$orderInfo->notify_money)),
        );
        Db::table('user_bill')->insert($data);
        $view = new view();
        return $view->fetch('paysuccess',[
            'info' => $arr
        ]);
    }

    public function orders(){
        $u_id = $this->u_id;
        //$billInfo = Db::name('user_bill')->where('u_id',$u_id)->where('b_money_type',1)->order('b_time','DESC')->select();
        $billInfo = Db::name('user_bill')->where('u_id',$u_id)->order('b_time','DESC')->select();
        $cardInfo = Db::name('sinopec_card')->where('u_id',$u_id)->limit(0,1)->find();
        $empty = '<div class="main"><div class="details"><div class="c_date">暂时没有订单数据</div></div></div>';
        $view = new view();
        if(empty($cardInfo['c_num'])){
            return $view->fetch('orders',[
                'info'  => $billInfo,
                'empty'  => $empty
            ]);
        }else{
            return $view->fetch('orders',[
                'info'  => $billInfo,
                'empty'  => $empty,
                'card' => $cardInfo['c_num']
            ]);
        }
    }

    public function info(){
        $view = new view();
        return $view->fetch('info',[
            'info'  => $this->userInfo
        ]);
    }

    public function alter(){
        $u_id = $this->u_id;
        $telephone = Request::instance()->post('telephone', '');
        $address = Request::instance()->post('address', '');
        $res = Db::name('ctb_user')->where('u_id',$u_id)->update(['u_telephone'=>$telephone,'u_address'=>$address]);
        if($res){
            return json_encode(array('code'=>200,'msg'=>'修改成功'));
        }else{
            return json_encode(array('code'=>506,'msg'=>'修改失败'));
        }
    }

//    public function register(){
//        $obj = new wechat\Oauth();
//
//        $code = Request::instance()->get('code');
//        if(empty($code)){
//            $url = $obj->getStart();
//            header("location:$url");
//            exit();
//        }else{
//            $info = $obj->getOpenid($code);
//        }
//        $this->register_detection($info['openid']);
//        $user_obj = new ctb_user();
//
//        $arr = array(
//            'u_union_id' => !empty($info['unionid']) ? $info['unionid'] : '',
//            'u_open_id' => $info['openid'],
//            'u_nick' => $info['nickname'],
//            'u_position' => $info['country'] .'|'. $info['province'] .'|'. $info['city'],
//            'u_gender' => $info['sex'],
//            'u_headimgurl' => $info['headimgurl'],
////            'u_telphone' => '',
////            'u_address' => '',
////            'u_oilbean' => ''
//        );
//
//        $res = $user_obj->save($arr);
//        if($res){
//            $view = new view();
//            return $view->fetch('index');
//        }else{
//            $error = array(
//                'code' => '502',
//                'msg' => '数据库插入失败，请稍后再试'
//            );
//            return json_encode($error);
//        }
//    }

}

