<?php
/**
 * Created by PhpStorm.
 * User: ctb
 * Date: 2017/2/15
 * Time: 16:06
 */

namespace app\common\wechat;

class Oauth{

    protected $APPID = 'wx2002f12a23063262';
    protected $APPSECRET = 'f54df66361d03185377c7006f1bcec03';

    /**
     * @构造获取code的url
     * @param $redirectUrl
     * @param bool $flag
     * @return string
     */
    private function __CreateOauthUrlForCode($redirectUrl, $flag=true) {
        $urlObj["appid"] = $this->APPID;
        $urlObj["redirect_uri"] = "$redirectUrl";
        $urlObj["response_type"] = "code";
        if($flag){
            $urlObj["scope"] = "snsapi_userinfo";
        }else{
            $urlObj["scope"] = "snsapi_base";
        }
        //$urlObj["scope"] = "snsapi_userinfo";
        $urlObj["state"] = "STATE" . "#wechat_redirect";
        $bizString = $this->ToUrlParams($urlObj);
        return "https://open.weixin.qq.com/connect/oauth2/authorize?" . $bizString;
    }

    /**
     * 拼接签名字符 串
     * @param $urlObj
     * @return string
     */
    private function ToUrlParams($urlObj) {
        $buff = "";
        foreach ($urlObj as $k => $v) {
            if ($k != "sign") {
                $buff .= $k . "=" . $v . "&";
            }
        }

        $buff = trim($buff, "&");
        return $buff;
    }

    /**
     * 使用code换取openid和access_token
     * @param $url
     * @return mixed
     */
    private function getcurl($url) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.22 (KHTML, like Gecko) Chrome/25.0.1364.172 Safari/537.22");
        curl_setopt($ch, CURLOPT_ENCODING, 'gzip'); //加入gzip解析
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

        $output = curl_exec($ch);
        //$info = curl_getinfo($ch);
        curl_close($ch);
        return $output;
    }

    /**
     * 根据code获取openid或者是用户详细信息
     * @param null $code
     * @return mixed|string
     */
    public function getOpenid($code = null){
        if(empty($code)){
            return 'missing code string param';
        }
        $appid = $this->APPID;
        $secret = $this->APPSECRET;
        $userurl = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" . $appid . "&secret=" . $secret . "&code=" . $code . "&grant_type=authorization_code";
        $userinfo = json_decode($this->getcurl($userurl), true);
        //如果是基础授权，则只能获取到openid，授权流程到这里结束了
        $openid = $userinfo['openid'];
        $access_token = $userinfo['access_token'];

        if(!isset($access_token)){
            return $openid;
        }else{
            return $this->getWeixinInfo($openid, $access_token);
        }
    }

    /**
     * 使用openid和access_token换取用户信息
     * @param $openid
     * @param $access_token
     * @return mixed
     */
    private function getWeixinInfo($openid,$access_token){
        $queryUrl = 'https://api.weixin.qq.com/sns/userinfo?access_token=' . $access_token . '&openid=' . $openid . '&lang=zh_CN';
        $xxinfo = json_decode($this->getcurl($queryUrl), true);
        //如果获取用户详细信息失败，则跳转到授权页面
        if (!empty($xxinfo['errcode'])) {
            $this->getStart();
        }
        return $xxinfo;
    }


    public function getStart(){
        $baseUrl = urlencode('http://' . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF'] . '?' . $_SERVER['QUERY_STRING']);
        $url = $this->__CreateOauthUrlForCode($baseUrl);
        return $url;
    }

}