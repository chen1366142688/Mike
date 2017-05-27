<?php
/**
 * Created by PhpStorm.
 * User: ctb
 * Date: 2017/4/5
 * Time: 16:22
 */
namespace app\index\model;
use think\Model;
class OpenUnionRelation extends Model{
    protected $table = 'open_union_relation';

    protected $connection = [
        // 数据库类型
        'type'        => 'mysql',
        // 数据库连接DSN配置
        'dsn'         => '',
        // 服务器地址
        'hostname'    => 'rm-bp17698baxka2pt98.mysql.rds.aliyuncs.com',
        // 数据库名
        'database'    => 'wx_cwz',
        // 数据库用户名
        'username'    => 'chetuobang',
        // 数据库密码
        'password'    => 'Ctb_admin+17',
        // 数据库连接端口
        'hostport'    => '3306',
        // 数据库连接参数
        'params'      => [],
        // 数据库编码默认采用utf8
        'charset'     => 'utf8',
        // 数据库表前缀
        'prefix'      => '',
    ];

}