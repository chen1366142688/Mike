<?php
/**
 * Created by PhpStorm.
 * User: ctb
 * Date: 2017/3/1
 * Time: 13:34
 */
namespace app\oilcard\controller;
use app\oilcard\model\sinopec_card;
use think\Cookie;
use think\view;
use think\Db;
use \think\request;
use think\Loader;
use think\Controller;

class Index extends Controller{

    protected $u_id;
    protected $userInfo;

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
        $info = $this->check_card_exist_or_not();
        $view = new view();
        if(!empty($info)){
            return $view->fetch('recharge',[
                'info'  => $info,
            ]);
        }else{
            return $view->fetch('binding');
        }
    }


    public function check_card_exist_or_not(){
        return Db::name('sinopec_card')->where('u_id',$this->u_id)->limit(0,1)->find();
    }

    public function binding(){
        $oilcard = Request::instance()->post('oilcard', '');
        $mobile = Request::instance()->post('mobile', '');
        $name = Request::instance()->post('name', '');
        $type = Request::instance()->post('type', 1);
        $zz = Db::name('ctb_user')->where('u_id',$this->u_id)->limit(0,1)->find();
        if(empty($zz)){
            return json_encode(array('code'=>407,'error'=>'绑定失败'));
        }
        if(empty($oilcard) || empty($mobile) || !preg_match("/^1[34578]{1}\d{9}$/",$mobile) || !preg_match("/^\d{19}$/",$oilcard)){
            $error = array(
                'error' => "Invalid oilcard number"
            );
            return json_encode($error);
        }
        $data = array(
            'u_id' => $this->u_id,
            'c_num' =>$oilcard,
            'c_telphone' => $mobile,
            'c_name' => $name,
            'c_type' => $type
        );
        $sinopec_card_obj = new sinopec_card();
        $res = $sinopec_card_obj->save($data);
        if($res){
            return json_encode(array('code'=>200,'msg'=>'绑定成功'));
        }else{
            return json_encode(array('code'=>403,'error'=>'绑定失败'));
        }
    }

    public function recharge_oil_card(){
        $product_type = Request::instance()->post('product_type', '');
        //$product_type = Request::instance()->get('product_type', '');
        $oil_bean = Db::name('ctb_user')->where('u_id',$this->u_id)->value('u_oilbean');

        switch ($product_type){
            case 'rmb50':
                //1.调用微信支付
                //2.查看是否成功付款
                //2.调用聚合数据接口给用户充值
                return json_encode(array('code'=>507,'msg'=>'目前不支持50元充值。'));
                break;
//            case 'rmb100':
//                return json_encode(array('code'=>200,'msg'=>'使用现金100'));
//                break;
            case 'rmb200':
                return json_encode(array('code'=>507,'msg'=>'目前不支持200元充值。'));
                break;
//            case 'rmb500':
//                return json_encode(array('code'=>200,'msg'=>'使用现金500'));
//                break;
//            case 'rmb1000':
//                return json_encode(array('code'=>200,'msg'=>'使用现金1000'));
//                break;
            case 'ob100':
                if(intval($oil_bean) < 100){
                    return json_encode(array('code'=>507,'msg'=>'油豆不足'));
                }
                return json_encode(array('code'=>507,'msg'=>'目前不支持该金额的充值。'));
//                $qq = $this->operateOB(100);
//                if($qq){
//                    return json_encode(array('code'=>200,'msg'=>'使用油豆100充值成功'));
//                }else{
//                    return json_encode(array('code'=>507,'msg'=>'使用油豆100充值失败'));
//                }

                break;
            case 'ob1000':
                if(intval($oil_bean) < 1000){
                    return json_encode(array('code'=>507,'msg'=>'油豆不足'));
                }
                return json_encode(array('code'=>507,'msg'=>'目前不支持该金额的充值。'));
//                $qq = $this->operateOB(1000);
//                if($qq){
//                    return json_encode(array('code'=>200,'msg'=>'使用油豆1000充值成功'));
//                }else{
//                    return json_encode(array('code'=>507,'msg'=>'使用油豆1000充值失败'));
//                }
                break;
            case 'ob10000':
                if(intval($oil_bean) < 10000){
                    return json_encode(array('code'=>507,'msg'=>'油豆不足'));
                }
                $qq = $this->operateOB(10000);
                if($qq){
                    return json_encode(array('code'=>200,'msg'=>'使用油豆10000充值成功'));
                }else{
                    return json_encode(array('code'=>507,'msg'=>'使用油豆10000充值失败'));
                }
                break;
            default :
                if(intval($oil_bean) < 100){
                    return json_encode(array('code'=>507,'msg'=>'油豆不足'));
                }
                $qq = $this->operateOB(100);
                if($qq){
                    return json_encode(array('code'=>200,'msg'=>'使用油豆100充值成功'));
                }else{
                    return json_encode(array('code'=>507,'msg'=>'使用油豆100充值失败'));
                }
                break;
        }

    }

//    public function test2(){
//    $obj = Loader::model('recharge_api');
//    $res1 = $obj->balance_query();
//    $res2 = $obj->sns_query('H4101891264463d');
//    echo "<pre>";
//    var_dump($res1);
//    echo "<br>";
//    var_dump($res2);die;
//}

    public function paysuccess(){
        $order_no = isset($_GET['order_no']) ? $_GET['order_no'] : '';
        $wx_pay = Loader::model('wx_pay');
        $orderInfo = $wx_pay->where('out_trade_no',$order_no)->where('status',1)->find();

        if(empty($orderInfo)){
            header("location:http://oil.chetuobang.com");
            exit();
        }

        $zz =  Db::table('user_bill')->where('out_trade_no',$orderInfo->out_trade_no)->find();
        $info = Db::name('sinopec_card')->where('u_id',$this->u_id)->find();
        if( empty($info)){
            header("location:http://oil.chetuobang.com");
            exit();
        }
        $info['money'] = abs(intval($orderInfo->notify_money));
        if(isset($zz) && !empty($zz)){
            $view = new view();
            return $view->fetch('paysuccess',[
                'info' => $info
            ]);
        }
        $data = array(
            'b_money' => $orderInfo->notify_money,
            'b_time' => $orderInfo->notify_time,
            'b_money_type' => 2,
            'u_id' => $this->u_id,
            'b_channel_id' => 1,
            'out_trade_no' => $orderInfo->out_trade_no,
            'b_oilbean_remain' => $this->userInfo['u_oilbean'],
        );
        Db::table('user_bill')->insert($data);
        $money = intval($orderInfo->notify_money);
        $obj = Loader::model('recharge_api');
        $res = $obj->oil_card_recharge($info['c_name'], $info['c_telphone'], $money, $orderInfo->out_trade_no, $info['c_num'], $info['c_type']);
    if($res){
        $view = new view();
        return $view->fetch('paysuccess',[
            'info' => $info
        ]);
    }else{
        $wx_pay->where('out_trade_no',$order_no)->update(array('status'=>9));
        $view = new view();
        return $view->fetch('payfailed');
    }

    }


    public function operateOB($obnumber){
        $obj = Loader::model('recharge_api');
        $order_sn = $obj->createOrderNo();
        //1.减去油豆
        $bill = array(
            'b_money' => -abs($obnumber),
            'b_time' => date('Y-m-d H:i:s'),
            'b_money_type' => 1,
            'u_id' => $this->u_id,
            'b_channel_id' => 6,
            'out_trade_no' => $order_sn,
            'b_oilbean_remain' => ($this->userInfo['u_oilbean'] - $obnumber),
        );
        $res1 = Db::name('user_bill')->insert($bill);
        $res2 = Db::name('ctb_user')->where('u_id',$this->u_id)->setDec('u_oilbean', $obnumber);
        if($res1 && $res2){
            //2.调用聚合数据接口给用户充值
            $money = intval($obnumber/100);
            $cardInfo = Db::name('sinopec_card')->where('u_id',$this->u_id)->find();
            $res = $obj->oil_card_recharge($cardInfo['c_name'], $cardInfo['c_telphone'], $money, $order_sn, $cardInfo['c_num'], $cardInfo['c_type']);
            if($res){
                $crr = $obj->sns_query($order_sn);
                if($crr['result']['game_state'] == 9){
                    return false;
                }else{
                    return true;
                }
            }else{
                return false;
            }
        }else{
            return false;
        }

    }


}