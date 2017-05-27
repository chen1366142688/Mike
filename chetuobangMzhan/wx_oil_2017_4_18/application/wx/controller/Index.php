<?php
namespace app\wx\controller;
use think\Controller;
use app\wx\model\wxcgi;
//define your token
define("TOKEN", "yatou5206");
class Index extends Controller
{
/**
 * wechat php test
 */
    function index(){
        if(isset($_GET['create_menu']) && $_GET['create_menu']==1){
            //$wechatObj = new Index();
            $resArr = $this->createMenu();
            exit(print_r($resArr));
        }
        //$wechatObj = new Index();
        if(isset($_GET['echostr'])){
            $this ->valid();
        }else{
            $this->responseMsg();
        }
    }
    public function valid()
    {
        $echoStr = $_GET["echostr"];
        $this->checkSignature();
        $this->responseMsg();
        //valid signature , option
        if($this->checkSignature()){
            echo $echoStr;
            exit;
        }else{
            exit('error');
        }
    }
    public function createMenu(){
        $common_obj = new wxcgi();
        $access_token = $common_obj->getaccesstoken(APPID,APPSECRET);
        $menu_str = '
             {
             "button":[
                 {	
                      "type":"view",
                      "name":"车托帮",
                      "url":"http://101.37.28.32/oilbeanl"
                  },
                  {
                       "name":"菜单",
                       "sub_button":[
                       {	
                           "type":"view",
                           "name":"搜索",
                           "url":"http://www.soso.com/"
                        },
                        {
                           "type":"view",
                           "name":"视频",
                           "url":"http://v.qq.com/"
                        },
                        {
                           "type":"click",
                           "name":"赞一下我们",
                           "key":"V1001_GOOD"
                        }]
                   }
               ]
         }
         ';
        return $common_obj -> createMenu($access_token,$menu_str);
    }
    public function responseMsg()
    {
        //get post data, May be due to the different environments
//		if(!isset($GLOBALS["HTTP_RAW_POST_DATA"])){
//			$GLOBALS['HTTP_RAW_POST_DATA']="";
//		}
        $postStr = $GLOBALS["HTTP_RAW_POST_DATA"];

        //extract post data
        if (!empty($postStr)){
            /* libxml_disable_entity_loader is to prevent XML eXternal Entity Injection,
               the best way is to check the validity of xml by yourself */
            libxml_disable_entity_loader(true);
            $postObj = simplexml_load_string($postStr, 'SimpleXMLElement', LIBXML_NOCDATA);
            $fromUsername = $postObj->FromUserName;
            $toUsername = $postObj->ToUserName;
            $keyword = trim($postObj->Content);
            $RX_TYPE = trim($postObj->MsgType);
            $time = time();
            $textTpl = "<xml>
							<ToUserName><![CDATA[%s]]></ToUserName>
							<FromUserName><![CDATA[%s]]></FromUserName>
							<CreateTime>%s</CreateTime>
							<MsgType><![CDATA[%s]]></MsgType>
							<Content><![CDATA[%s]]></Content>
							<FuncFlag>0</FuncFlag>
							</xml>";

            switch ($RX_TYPE){
                case "event" :$contentStr = $this->receiveEvent($postObj);break;
                case "text"  :$contentStr = $this->receiveText($postObj);break;
                case "image" :$contentStr = $this->receiveImage($postObj);break;
            }
            $msgType = "text";
            if(!isset($contentStr)){
                $contentStr = "Welcome follow MxPhp!";
            }
            $resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $contentStr);
            echo $resultStr;
        }else {
            echo "";
            exit;
        }
    }
    public function receiveEvent($postObj){
        switch ($postObj->Event){
            case "CLICK":$content = $this->ClickEvent($postObj);break;
            case "subscribe":$content = $this->SubEvent($postObj);break;
            case "unsubscribe":$content = $this->UnSubEvent($postObj);
        }
        return $content;
    }
    public function ClickEvent($postObj){
        if($postObj->EventKey == "V1001_TODAY_MUSIC"){
            return "您点击的是音乐";
        }else{
            return "鬼知道你点击的什么东西";
        }
    }
    private function checkSignature()
    {
        // you must define TOKEN by yourself
        if (!defined("TOKEN")) {
            throw new Exception('TOKEN is not defined!');
        }

        $signature = $_GET["signature"];
        $timestamp = $_GET["timestamp"];
        $nonce = $_GET["nonce"];

        $token = TOKEN;
        $tmpArr = array($token, $timestamp, $nonce);
        // use SORT_STRING rule
        sort($tmpArr, SORT_STRING);
        $tmpStr = implode( $tmpArr );
        $tmpStr = sha1( $tmpStr );

        if( $tmpStr == $signature ){
            return true;
        }else{
            return false;
        }
    }
}
