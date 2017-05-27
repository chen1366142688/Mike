$(function(){
    //1.首先，分享给别人，在index中方法可以进行任意添加------index处理
    //2.当用户点击创建留言板的时候，进行用户授权，授权之后用户带着UID过来，进行截取
    var create=$('#create');
    create.click(function(){
        //授权
        this.href="http://wzcx.chetuobang.com/wz_api/?service=guestbook.index";

    })

});