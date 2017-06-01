//获取用户授权数据
function GetRequest() {
    var url = location.search;
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

var Request = new Object();
Request = GetRequest();
var unionid,access_token;
unionid = Request["unionid"];
access_token = Request["access_token"];
sessionStorage.uid= unionid;
sessionStorage.token= access_token;






var map=new BMap.Geolocation();

map.getCurrentPosition(function(p){
    //1.1获取到当前城市名
    var position=p.address.city;
    //1.2截取掉最后一个字符，保存在变量中
    var s=position.substring(0,position.length-1);
    //定位到当前城市
    //console.log(position);
    var cit="<option selected value="+s+">"+s+"</option>";
    $('.choose_city').prepend(cit);
    //请求允许的查询城市
    $.ajax({
        url:"https://traffictrl.chetuobang.com/api/v1/qtc/cities",
        data:"",
        success:function(data){
            //console.log("请求成功，正在处理响应数据");
            //console.log(data);
            var citys=data.cities;
            //console.log(citys);
            if(citys.indexOf(s)==-1){//如果返回-1的话就说明没有在允许查询的列表中
                //console.log("该城市不在允许查询限行数据的列表中");
                //如果在数组中没有找到的话，就把s赋值为北京为默认的查询城市
                //s="北京";
                $('#number1').html("不");
                $('#number2').html("限");
            }else{
                var pos=citys.indexOf(s);
                //console.log(pos);
                //console.log("该城市允许查询限行数据的接口");
                //如果找到的话，就在数组中把当前城市和数组中的城市替换
                citys.splice(pos,1);
                //console.log(removed);
                //console.log(citys);
            }
            for(var i=0,option="";i<citys.length;i++){
                option+="<option value="+citys[i]+">"+citys[i]+"</option>"
            }
            $('.choose_city').append(option);
        },
        error:function(info){
            //console.log("请求失败了")
        }
    });
//1.拿到时间，这个时间是发送请求格式的时间
var date=formatTime(new Date());

//2把获取到的时间格式替换成当前年月日
var dangDate = date.replace("-", "年");
dangDate = dangDate.replace("-", "月");
dangDate = dangDate.replace(/\s/g, '') + "日";

//3判断当前日期是星期几
var weekArray = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
var week = weekArray[new Date().getDay()];

var riQi=dangDate+' '+"("+week+")";
$('#date').html(riQi);
//console.log(riQi);
//4请求今日限行信息
$.ajax({
    url:"https://traffictrl.chetuobang.com/api/v1/qtc/" + s + "/" + date,
    data:"",
    success:function(data){
        //console.log("请求成功，正在处理响应数据");
        //console.log(data);
        //4.获取到信息，填充到页面上
        var result = data;
        var rule = result.rule[0];
        var xianX=rule.rule;
        var one,two;
        if(xianX=="不限"){
            xianX = xianX.split("");
            one=xianX[0];
            two=xianX[1];
            console.log(one);
            console.log(two);
            $('#number1').html(one);
            $('#number2').html(two);
            $('#number1').css('display','block');
        }else if(xianX=="单号"){
            xianX = xianX.split("");
            one=xianX[0];
            two=xianX[1];
            $('#number1').html(one);
            $('#number2').html(two);
            $('#number1').css('display','block');
        }else if(xianX=="双号"){
            xianX = xianX.split("");
            one=xianX[0];
            two=xianX[1];
            $('#number1').html(one);
            $('#number2').html(two);
            $('#number1').css('display','block');
        }else if(xianX.length==1){
            one=xianX;
            $('#number2').html(one);
            $('#number1').css('display','none');
        }else{
            xianX = xianX.split(",");
            one=xianX[0];
            two=xianX[1];
            $('#number1').html(one);
            $('#number2').html(two);
            $('#number1').css('display','block');
        }
    },
    error:function(info){
        //console.log("请求失败了")
    }
});

//请求文章内容
    $.ajax({
        type:"GET",
        url:"https://scms.chetuobang.com/index.php?m=list&a=index&page=1",
        data:"",
        success:function(data){
            //console.log("请求成功，正在处理响应数据");
            var Article=$.parseJSON( data );
            console.log(Article);
            if(Article.code==200){
                var articleItem=Article.info;
                for(var i=0,articleItems="";i<articleItem.length;i++){
                    //console.log(articleItem[i].object_id);
                     articleItems +="<div class='content'><a href='content.html?object_id="+articleItem[i].object_id+"'><img src='"+articleItem[i].link+articleItem[i].smeta.thumb1+"' class='news_pic'><div class='con_area'><div class='con_tit'>"+articleItem[i].post_title+"</div><p class='con_p'>"+articleItem[i].post_excerpt+"</p></div></a></div>";
                }

                //console.log(Article.info);
                $('.main').append(articleItems);
            }
            //console.log(Article)
        },
        error:function(info){
            //console.log("请求失败了")
        }
    });

});

var date=formatTime(new Date());
//5.当用户点击切换城市的时候，获取到当前被选中的select的值
var sel = $('.choose_city');
//sel.val = 2;
sel.bind("change", A(sel), false);

function A(obj)
{
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4){
            if(xhr.status==200){
                //console.log(xhr);
                doResponseX(xhr);
            }
        }else{
            //console.log("请求失败了")
        }
    };
    xhr.open('GET',"https://traffictrl.chetuobang.com/api/v1/qtc/" + obj.value + "/" + date,true);
    xhr.send(null);
    //console.log(obj.value);
}
//6.发送请求，获得当前用户选中城市的限行信息
function doResponseX(xhr){
    var citites=xhr.response;
    var result = eval('(' + citites + ')');
    var qiTai=result.rule[0].rule;
    console.log(qiTai);
    var nonee,twoo;
        if(qiTai=="不限"){
            qiTai = qiTai.split("");
            nonee=qiTai[0];
            twoo=qiTai[1];
            console.log(nonee);
            console.log(twoo);
            $('#number1').html(nonee);
            $('#number2').html(twoo);
            $('#number1').css('display','block');
        }else if(qiTai=="单号"){
            qiTai = qiTai.split("");
            nonee=qiTai[0];
            twoo=qiTai[1];
            $('#number1').html(nonee);
            $('#number2').html(twoo);
            $('#number1').css('display','block');
        }else if(qiTai=="双号"){
            qiTai = qiTai.split("");
            nonee=qiTai[0];
            twoo=qiTai[1];
            $('#number1').html(nonee);
            $('#number2').html(twoo);
            $('#number1').css('display','block');
        }else if(qiTai.length==1){
            nonee=qiTai;
            $('#number2').html(nonee);
            $('#number1').css('display','none');
        }else{
            qiTai = qiTai.split(",");
            nonee=qiTai[0];
            twoo=qiTai[1];
            $('#number1').html(nonee);
            $('#number2').html(twoo);
            $('#number1').css('display','block');
        }
}
/*
var page=1;
    $(".main").bind('scroll',function(){
        var $this =$(this),
            viewH =$(this).height(),//可见高度
            contentH =$(this).get(0).scrollHeight,//内容高度
            scrollTop =$(this).scrollTop();//滚动高度
        //if(contentH - viewH - scrollTop <= 100) { //到达底部100px时,加载新内容
        if(scrollTop/(contentH -viewH)>=1){ //到达底部100px时,加载新内容
            // 这里加载数据..
            //alert("tiger");
            page++;
            if(page>23){return false;}
            $.ajax({
                type:"GET",
                url:"https://scms.chetuobang.com/index.php?m=list&a=index&page="+page,
                data:"",
                success:function(data){
                    //console.log("请求成功，正在处理响应数据");
                    var Article=$.parseJSON( data );
                    //console.log(Article);
                    if(Article.code==200){
                        var articleItem=Article.info;
                        for(var i=0,articleItems="";i<articleItem.length;i++){
                            //console.log(articleItem[i].object_id);
                            articleItems +="<div class='content'><a href='content.html?object_id="+articleItem[i].object_id+"'><img src='"+articleItem[i].link+articleItem[i].smeta.thumb1+"' class='news_pic'><div class='con_area'><div class='con_tit'>"+articleItem[i].post_title+"</div><p class='con_p'>"+articleItem[i].post_excerpt+"</p></div></a></div>";
                        }

                        //console.log(Article.info);
                        $('.main').append(articleItems);
                    }else if(Article.code==401){
                        var mess="<div style='text-align: center;margin-bottom: 1rem'>"+Article.msg+"</div>";
                        $('.main').append(mess);
                    }
                    //console.log(Article)
                },
                error:function(info){
                    //console.log("请求失败了")
                }
            });
        }
    });
*/

// dropload
var page=1;
var dropload = $('.content').dropload({

    loadDownFn : function(me){
        page++;
        if(page>23){return false;}
        $.ajax({
            type: 'GET',
            async:true,
            url: 'https://scms.chetuobang.com/index.php?m=list&a=index&page='+page,
            data:"",
            success: function(data){
                var Article=$.parseJSON( data );
                if(Article.code==200){
                    var articleItem=Article.info;
                    for(var i=0,articleItems="";i<articleItem.length;i++){
                        //console.log(articleItem[i].object_id);
                        articleItems +="<div class='content'><a href='content.html?object_id="+articleItem[i].object_id+"'><img src='"+articleItem[i].link+articleItem[i].smeta.thumb1+"' class='news_pic'><div class='con_area'><div class='con_tit'>"+articleItem[i].post_title+"</div><p class='con_p'>"+articleItem[i].post_excerpt+"</p></div></a></div>";
                    }

                    $('.main').append(articleItems);
                }else if(Article.code==401){
                    var mess="<div style='text-align: center;margin-bottom: 1rem'>"+Article.msg+"</div>";
                    $('.main').append(mess);
                }
                // 为了测试，延迟1秒加载
                setTimeout(function(){
                    $('.main').append(articleItems);
                    // 每次数据加载完，必须重置
                    dropload.resetload();
                },1000);
            },
            error: function(xhr, type){
                //alert('Ajax error!');
                // 即使加载出错，也得重置
                dropload.resetload();
            }
        });
    },

});



//封装时间时间转换函数
function formatTime(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();


    return [year, month, day].map(formatNumber).join('-')
}

function formatNumber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n
}
