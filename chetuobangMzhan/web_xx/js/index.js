/*
* 车托帮m站的限行查询功能
*   1。默认当前页面是北京的限行。切换城市查询其他城市的限行信息
*   2。修改后是添加上定位功能，如果用户的地址是在当前允许请求的城市当中的话，则正常显示当前位置的限行信息，否则默认选择北京的限行信息，然后让用户进行选择；
* */
//1.定位用户当前所在城市；
var map=new BMap.Geolocation();
map.getCurrentPosition(function(p){
    //1.1获取到当前城市名
    var position=p.address.city;
    //1.2截取掉最后一个字符，保存在变量中
    var s=position.substring(0,position.length-1);
    //1.3发送请求获取到可以查询哪些城市；
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4){
            if(xhr.status==200){
                doResponseT(xhr);
            }
        }else{
            console.log("请求失败了")
        }
    };
    xhr.open('GET',"https://traffictrl.chetuobang.com/api/v1/qtc/cities",true);
    xhr.send(null);
    //请求成功之后的执行函数
    function doResponseT(xhr){
        var citites=xhr.response;
        var obj = eval('(' + citites + ')');
        //1.4将获取到的city在允许查询限行的城市列表中查询
        var citys=obj.cities;
        if(citys.indexOf(s)==-1){//如果返回-1的话就说明没有在允许查询的列表中
            console.log("该城市不在允许查询限行数据的列表中");
            //如果在数组中没有找到的话，就把s赋值为北京为默认的查询城市
            s="北京";
        }else{
            var pos=citys.indexOf(s);
            console.log(pos);
            console.log("该城市允许查询限行数据的接口");
            //如果找到的话，就在数组中把当前城市和数组中的城市替换
            var removed = citys.splice(pos,1);
            console.log(removed);
            console.log(citys);
        }
        //2.将定位的城市填充到页面上；
        var cit="<option selected value="+s+">"+s+"</option>";
        $('#box').prepend(cit);
        for(var i=0,option="";i<citys.length;i++){
            option+="<option value="+citys[i]+">"+citys[i]+"</option>"
        }
        $('#box').append(option);
        var bj=$('#box option:selected').text();//选中的文本
        console.log(typeof (bj));
        console.log(bj);
        //var bj = '北京';
        //3.拿到页面的当前被选中元素，发送请求获取用户当前城市的限行详情信息
        $.ajax({
            url:"https://traffictrl.chetuobang.com/api/v1/qtc/" + s + "/" + date,
            type:"GET",
            data:"",
            success:function(data){
                console.log(data);
                //4.获取到信息，填充到页面上
                var result = data;
                var rule = result.rule[0];
                var rules = result.rule;
                var xianX=rule.rule;
                var description=rule.description;
                rules.splice(0, 1);
                for (var i = 0,item="",today="明天",digits="限行尾号"; i < rules.length; i++) {
                    if(i==1){
                        today="后天"
                    }else if(i==2){
                        today="大后天"
                    }
                    if(rules[i].rule=="不限"){
                        digits="不限"
                    }else if(rules[i].rule=="单号"){
                        digits="单号"
                    }else if(rules[i].rule=="双号"){
                        digits="双号"
                    }else{
                        digits="限行尾号"+rules[i].rule;
                    }
                    item+="<div class='tommorow clearfix textbox'><div class='datatime fl'>"+today+'&nbsp;'+"</div><div class='datatime fl'>"+rules[i].date.slice(5,rules[i].date.length)+"</div><div class='t_text fr'>"+digits+"</div></div>";

                    var dayRule = rules[i].rule;
                }
                $('.content').append(item);
                //如果返回单号
                if (dayRule.length == 1) {
                    $('#number2').css('display','none');
                }
                //document.getElementById('box').innerHTML=rule.city+"市";
                xianX = xianX.replace(/,/g, '');
                var xian = xianX.slice(1,xianX.length);
                xianX = xianX.slice(0, 1);
                document.getElementById('number1').innerHTML=xianX;
                document.getElementById('number2').innerHTML=xian;
                document.getElementsByClassName('xx_con')[0].innerHTML=description;
            }
        })
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
var a=document.getElementsByClassName('today');
a[0].innerHTML=dangDate+" "+week;


//5.当用户点击切换城市的时候，获取到当前被选中的select的值
var sel = document.getElementById('box');
sel.value = 2;
sel.addEventListener("change", A(sel), false);

function A(obj)
{
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4){
            if(xhr.status==200){
                console.log(xhr)
                doResponseX(xhr);
            }
        }else{
            console.log("请求失败了")
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
    console.log(result);
    $("div").remove(".tommorow");
     var rule = result.rule[0];
     var rules = result.rule;
     var xianX=rule.rule;
     var description=rule.description;
     rules.splice(0, 1);
     for (var i = 0,item="",today="明天",digits="限行尾号"; i < rules.length; i++) {
         if(i==1){
             today="后天"
         }else if(i==2){
             today="大后天"
         }
         if(rules[i].rule=="不限"){
             digits="不限"
         }else if(rules[i].rule=="单号"){
             digits="单号"
         }else if(rules[i].rule=="双号"){
             digits="双号"
         }else{
             digits="限行尾号"+rules[i].rule;
         }
         item+="<div class='tommorow clearfix textbox'><div class='datatime fl'>"+today+'&nbsp;'+"</div><div class='datatime fl'>"+rules[i].date.slice(5,rules[i].date.length)+"</div><div class='t_text fr'>"+digits+"</div></div>";

         var dayRule = rules[i].rule;
     }
    $('.content').append(item);
    console.log(rules);
     //如果返回单号
     if (dayRule.length == 1) {
         $('#number2').css('display','none');
     }else{
         $('#number2').css('display','block');
     }
     //document.getElementById('box').innerHTML=rule.city+"市";
     xianX = xianX.replace(/,/g, '');
     var xian = xianX.slice(1,xianX.length);
     xianX = xianX.slice(0, 1);
     document.getElementById('number1').innerHTML=xianX;
     document.getElementById('number2').innerHTML=xian;
     document.getElementsByClassName('xx_con')[0].innerHTML=description;
}

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
