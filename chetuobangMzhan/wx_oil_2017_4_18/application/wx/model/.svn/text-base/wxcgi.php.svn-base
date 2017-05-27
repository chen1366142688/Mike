<?php
namespace app\wx\model;
define("APPID","wx470d521bfa9b2f6c");
define("APPSECRET","d4624c36b6795d1d99dcf0547af5443d");
class wxcgi{
    /**
     * 获取微信access token
     * @return mixed
     */
    public function getAccessToken(){
            $getTokenUrl = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" . APPID . "&secret=" . APPSECRET;
            $result = json_decode(file_get_contents($getTokenUrl),TRUE);
            $access_token = $result['access_token'];
            return $access_token;
    }

    /**
     * 创建自定义菜单
     * @param $accessToken 微信accesstoken
     * @param $data 菜单数据串
     * @return json
     */
    public function createMenu($accessToken,$data){
        $create_url = "https://api.weixin.qq.com/cgi-bin/menu/create?access_token=".$accessToken;
        return self::http_request($create_url,'POST',5,5,$data);
    }
    public static function http_request($url, $method, $connect_timeout=5, $timeout=5, $parameter=array())
    {
        $ci = curl_init();
        curl_setopt($ci, CURLOPT_ENCODING, 'gzip');
        curl_setopt($ci, CURLOPT_CONNECTTIMEOUT, $connect_timeout);
        curl_setopt($ci, CURLOPT_TIMEOUT, $timeout);
        curl_setopt($ci, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($ci, CURLOPT_USERAGENT, "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.0)");
        curl_setopt($ci, CURLOPT_URL, $url);
        switch ($method) {
            case 'POST':
                curl_setopt($ci, CURLOPT_POST, TRUE);
                @curl_setopt($ci, CURLOPT_POSTFIELDS, $parameter);
                break;
            case 'GET':

                break;
        }
        $htmlpage = curl_exec($ci);
        if($htmlpage === false)
        {
            $errinfo = curl_error($ci);
            $response = array('errinfo'=>$errinfo);
            return $response;
        }
        $status = curl_getinfo($ci, CURLINFO_HTTP_CODE);
        curl_close ($ci);
        $response = array("errinfo"=>"","status"=>$status,"htmlpage"=>$htmlpage);
        return $response;
    }
}
?>