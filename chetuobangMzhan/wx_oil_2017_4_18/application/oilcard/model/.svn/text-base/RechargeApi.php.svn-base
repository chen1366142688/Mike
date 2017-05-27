<?php
/**
 * Created by PhpStorm.
 * User: ctb
 * Date: 2017/3/10
 * Time: 17:32
 */
namespace app\oilcard\model;

use think\Model;
class RechargeApi extends Model{
    private $APPKEY = "67650174e0fbf30c74d07c837f4b8784";
    private $OPENID = "JHd82d1165c155b7eac36b2616c6cf6694";

    public function sns_query($order_sn){
        $url = "http://op.juhe.cn/ofpay/sinopec/ordersta";
        $params = array(
            "orderid" => "$order_sn",//商家订单号，8-32位字母数字组合
            "key" => $this->APPKEY,//应用APPKEY(应用详细页查询)
        );
        $paramstring = http_build_query($params);
        $content = $this->juhecurl($url,$paramstring);
        $result = json_decode($content,true);
        if($result){
            if($result['error_code']=='0'){
                print_r($result);
            }else{
                echo $result['error_code'].":".$result['reason'];
            }
        }else{
            echo "请求失败";
        }
    }

    public function balance_query(){
        $url = "http://op.juhe.cn/ofpay/sinopec/yue";
        $time = time();
        $params = array(
            "timestamp" => $time,//当前时间戳，如：1432788379
            "key" => $this->APPKEY,//应用APPKEY(应用详细页查询)
            "sign" => md5($this->OPENID.$this->APPKEY.$time),//校验值，md5(OpenID+key+timestamp)，OpenID在个人中心查询
        );
        $paramstring = http_build_query($params);
        $content = $this->juhecurl($url,$paramstring);
        $result = json_decode($content,true);
        if($result){
            if($result['error_code']=='0'){
                print_r($result);
            }else{
                echo $result['error_code'].":".$result['reason'];
            }
        }else{
            echo "请求失败";
        }
    }
    public function createOrderNo() {
        $year_code = array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J');
        return $year_code[intval(date('Y')) - 2010] .
            strtoupper(dechex(date('m'))) . date('d') .
            substr(time(), -5) . substr(microtime(), 2, 5) . sprintf('d', rand(0, 99));
    }

    public function oil_card_recharge($name,$mobile,$money,$order_sn,$card_num,$type){
        $arr = array(1,10,200, 50,100,500,1000);
        if(in_array($money,$arr) && $type == 2){
            $proid = 10008;
            $num = intval($money);
        }
        if(in_array($money,$arr) && $type == 1){
            switch ($money){
                case 50:
                    $proid = 10000;
                    $num = 1;
                    break;
                case 100:
                    $proid = 10001;
                    $num = 1;
                    break;
                case 500:
                    $proid = 10003;
                    $num = 1;
                    break;
                case 1000:
                    $proid = 10004;
                    $num = 1;
                    break;
                default:
                    $proid = 10007;
                    $num = intval($money);
            }
        }
        $url = "http://op.juhe.cn/ofpay/sinopec/onlineorder";
        $params = array(
            "proid" => "$proid",//产品id:10000(中石化50元加油卡)、10001(中石化100元加油卡)、10003(中石化500元加油卡)、10004(中石化1000元加油卡)、10007(中石化任意金额充值)、10008(中石油任意金额充值)
            "cardnum" => $num,//充值数量 任意充 （整数（元）），其余面值固定值为1
            "orderid" => $order_sn,//商家订单号，8-32位字母数字组合
            "game_userid" => $card_num,//加油卡卡号，中石化：以100011开头的卡号、中石油：以9开头的卡号
            "gasCardTel" => "$mobile",//持卡人手机号码
            "gasCardName" => "$name",//持卡人姓名
            "chargeType" => "$type",//加油卡类型 （1:中石化、2:中石油；默认为1)
            "key" => $this->APPKEY,//应用APPKEY(应用详细页查询)
            "sign" => $this->genSign($proid,$num,$card_num,$order_sn),//校验值，md5(OpenID+key+proid+cardnum+game_userid+orderid)，OpenID在个人中心查询
        );
        $paramstring = http_build_query($params);
        $content = $this->juhecurl($url,$paramstring);
        $result = json_decode($content,true);
        if($result){
            if($result['error_code']=='0'){
                //print_r($result);
                return true;
            }else{
                //echo $result['error_code'].":".$result['reason'];
                return false;
            }
        }else{
            //echo "请求失败";
            return false;
        }
    }

    public function genSign( $proid, $cardnum, $game_userid, $orderid){
        //md5(OpenID+key+proid+cardnum+game_userid+orderid)，OpenID在个人中心查询
        return md5($this->OPENID . $this->APPKEY . $proid . $cardnum . $game_userid . $orderid);
    }

    function juhecurl($url,$params=false,$ispost=0){
        $httpInfo = array();
        $ch = curl_init();

        curl_setopt( $ch, CURLOPT_HTTP_VERSION , CURL_HTTP_VERSION_1_1 );
        curl_setopt( $ch, CURLOPT_USERAGENT , 'JuheData' );
        curl_setopt( $ch, CURLOPT_CONNECTTIMEOUT , 60 );
        curl_setopt( $ch, CURLOPT_TIMEOUT , 60);
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER , true );
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        if( $ispost )
        {
            curl_setopt( $ch , CURLOPT_POST , true );
            curl_setopt( $ch , CURLOPT_POSTFIELDS , $params );
            curl_setopt( $ch , CURLOPT_URL , $url );
        }
        else
        {
            if($params){
                curl_setopt( $ch , CURLOPT_URL , $url.'?'.$params );
            }else{
                curl_setopt( $ch , CURLOPT_URL , $url);
            }
        }
        $response = curl_exec( $ch );
        if ($response === FALSE) {
            //echo "cURL Error: " . curl_error($ch);
            return false;
        }
        $httpCode = curl_getinfo( $ch , CURLINFO_HTTP_CODE );
        $httpInfo = array_merge( $httpInfo , curl_getinfo( $ch ) );
        curl_close( $ch );
        return $response;
    }
}