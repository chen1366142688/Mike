$("#1").attr("class","active");
window.addEventListener('DOMContentLoaded',function(){
    var oNav=document.getElementById('nav');
    var oDiv=oNav.getElementsByTagName('div');
    var len=oDiv.length;
    var studyStatus = document.getElementById('studyStatus').value;
    console.log(studyStatus);
    if(studyStatus == 1 ){
        $("#htp").show();
        toggleF('#close_cyou4','#htp');
    }
    for(var i=0;i<len;i++){
        oDiv[i].index=i;
        oDiv[i].onclick=function () {
            clearInterval(window.count_down);
            window.count_down= setInterval('count_down_stamp()',1000);
            var HtmlContent = parseInt( this.innerHTML);
            for(var i=0;i<len;i++){
                oDiv[i].className='AnotherNO';
            }
            if(HtmlContent > 2 && HtmlContent <=(len-1)){
                var nextEle = HtmlContent +1 ;
                if(HtmlContent < (HtmlContent-1)){
                    var nextTwoEle  = HtmlContent +2 ;
                    document.getElementById(nextTwoEle).style.display="none";
                }
                if(HtmlContent > 2){
                    var lastTwoEle = HtmlContent -2 ;
                    document.getElementById(lastTwoEle).style.display="none";
                }
                var lastEle = HtmlContent -1;
                document.getElementById(nextEle).style.display="block";
                document.getElementById(lastEle).style.display="block";
            }else{
                if(HtmlContent == 2){
                    document.getElementById(1).style.display="block";
                }
            }
            this.className='active';
            var url = 'ajaxgetactinfo';
            var a_id = $("#"+HtmlContent).attr('aid');
            var aj = $.ajax( {
                url:url,// 跳转到 action
                data:{
                    a_id : a_id
                },
                type:'post',
                cache:false,
                dataType:'json',
                success:function(data) {
                    if(data.status){
                        var actinfo = JSON.parse(data.info);
                        $("#periods").html(actinfo.a_periods_parent+"-"+actinfo.a_periods);
                        $("#count_down_stamp").val(actinfo.end_time_stamp);
                        $("#gas_time").val(actinfo.end_time);
                        $("#joined_people").html(actinfo.a_sum_people_num);
                        $("#gas_liter,#oilSum").html(actinfo.sum_oil);
                        $("#oilBeanSum").html(actinfo.sum_oil_bena);
                        $("#enoughBet").val(actinfo.enough_bet);
                        $("#thisgas").html(actinfo.sum_oil);
                        $("#act_num").html(actinfo.a_periods_parent+"-"+actinfo.a_periods);
                        var u_id = $("#u_id").val();
                        var link = "userlist?act_id="+actinfo.a_id+"&u_id="+u_id;
                        $("#showlistinfo").attr("href",link);
                        //window.location.reload();
                    }else{
                        alert(data.info);
                    }
                },
                error : function() {
                    // view("异常！");
                    alert("异常！");
                }
            });
        }
    }
    var Cut=document.getElementById('cut');
    var Add=document.getElementById('add');
    var N1=document.getElementById('number1');
    var N2=document.getElementById('number2');
    var Number_of_participants = $("#enoughBet").val();
    var N1proN2                = $("#todayOilPrice").val();
    /*N1proN2 每升消耗的油豆数*/
    /*Number_of_participants//每轮活动参与次数*/
        Cut.onclick= function () {
            N1.value=(Number(N1.value)-1);
            if (Number(N1.value)<=1){
                N1.value=1;
            };
            N2.value=N1proN2*Number(N1.value);
        };
    /*cut(50);*/
        Add.onclick= function () {
            N1.value=(Number(N1.value)+1);
            if (Number(N1.value)>=Number_of_participants){
                N1.value=Number_of_participants;
            };
            N2.value=N1proN2*Number(N1.value);
        };

    /*add(50,14);*/
},false);
setInterval(
    function(){window.location.reload},30000
);
function user_bet(){
    var url = "userbet";
    var a_id = $(".active").attr("aid");
    var u_id = $("#u_id").val();
    var buy_num = $("#number1").val();
    var aj = $.ajax( {
        url:url,// 跳转到 action
        data:{
            act_id : a_id,
            u_id : u_id,
            buy_num : buy_num
        },
        type:'post',
        cache:false,
        dataType:'json',
        success:function(data) {
            console.log(data);
            if(data.status){
                var actinfonum = JSON.parse(data.info);
                var actUserNumStr = "";
                for(var i = 0;i<actinfonum[1].length;i++){
                    actUserNumStr+="<li>"+actinfonum[1][i]+"</li>";
                }
                $("#usernumber").html(actUserNumStr);
                $(".yournumber").appendTo(actinfonum[0]);
                join_success();
                //window.location.reload();
            }else{
                if(data.code == "200001"){
                    $("#haslotteryed").show();
                    return;
                }
                if(data.code == "100002"){
                    join_unsuccess();
                    return;
                }
                if(data.code == "200002"){
                    only_one_min();
                    return;
                }
                if(data.code == "200004"){
                    alert("系统繁忙，稍后重试");
                    return;
                }
            }
        },
        error : function() {
            // view("异常！");
            alert("异常！");
        }
    });
}
function toggleT(id,area) {
    $(id).click(function () {
        $(area).css('display','block');
    });
}
function toggleF(id,area) {
    $(id).click(function () {
        $(area).css('display','none');
    });
}
function ifshow(id) {
    $(id).css('display','block');
}
function ifhide(id) {
    $(id).css('display','none');
}
toggleT('#howtoplay','#htp');
toggleF('#close_cyou4','#htp');
toggleT('#gotocalculate','#calcu');
toggleT('#calculate','#calcu');
toggleF('#close_cyou5','#calcu');

/*众筹成功 执行join_success();*/
function join_success() {
    var oNav=document.getElementById('nav');
    var oDiv=oNav.getElementsByTagName('div');
    var len=oDiv.length;
    for(var i=0;i<len;i++) {
        if(oDiv[i].className!='AnotherNO'){

            //console.log(oDiv[i].class);
            //return ;
            console.log(oDiv[i].attributes['aid'].nodeValue);
        }
    }
    $("#success").show();
    $("#usernumberbox").show();
    toggleF('#close_cyou','#success');
    toggleF('#continue1','#success');
    $("#close_cyou3").click(function () {
        $("#success").css('display','none');
        $("#usernumberbox").css('display','none');
        window.location.reload();
    });
};
/*余额不足众筹失败 执行join_unsuccess();*/
function join_unsuccess() {
    $("#unsuccess").show();
    toggleF('#cancel','#unsuccess');
    toggleF('#close_cyou2','#unsuccess');
};

/*不能参加活动时倒计时状态（已经开奖） 执行timeout();*/
function timeout() {
    ifshow('#timeout');
    ifshow('#cannotjoin');
    ifhide('#start');
    ifshow('#lkmainly');
    ifshow('#lotteryed');
    ifhide('#main_btn');
    ifhide('#gai_time');
}
/*剩余1分钟时 按钮更换状态 执行only_one_min();*/
function only_one_min() {
    ifshow('#waitmoment');
    ifhide('#start');
    ifhide('#main_btn');
    ifshow('#cannotclick_btn');
}
/*lottery.html*/
/*未开奖时*/
function not_Lottery() {
    ifshow('#head1');
    ifhide('#head2');
}
/*已开奖*/
function Lotterying() {
    ifshow('#head2');
    ifhide('#head1');
}

window.count_down = setInterval('count_down_stamp()',1000);
function count_down_stamp(){
    var nowstamp = parseInt($("#count_down_stamp").val());
    var nextstamp = nowstamp - 1;
    if(nextstamp <= 0){
        clearInterval(window.count_down);
        window.start_count_down = setInterval('getStartLotResult()',3000);
        $("#waitmoment").html("数据处理中...");
        $("#timeout").show();

        $("#waitmoment").disable=true;
    }
    if(nextstamp <= 60){
        only_one_min();
    }else{
        ifhide('#waitmoment');
        ifshow('#start');
        ifshow('#main_btn');
        ifhide('#cannotclick_btn');
    }
    $("#count_down_stamp").val(nextstamp);
    if(nextstamp/3600>0){
        var h = Math.floor(nextstamp/3600);
        nextstamp = nextstamp-(3600*h);
    }else{
        h = 0;
    }
    if(nextstamp/60>0){
        var mm = Math.floor(nextstamp/60);
        nextstamp = nextstamp-(60*mm);
    }else{
        mm = 0;
    }
    var timeStr = "";
    if(h >= 10){
        timeStr+=h+":";
    }else{
        timeStr+="0"+h+":";
    }
    if(mm >= 10){
        timeStr+=mm+":";
    }else{
        timeStr+="0"+mm+":";
    }
    if(nextstamp >= 10){
        timeStr+=nextstamp;
    }else{
        timeStr+="0"+nextstamp;
    }
    $("#gas_time").html(timeStr);
}

function getStartLotResult(){
    console.log(__proto__);
    var url = "ajaxgetactivityresult";
    var a_id = $(".active").attr("aid");
    var aj = $.ajax( {
        url:url,// 跳转到 action
        data:{
            a_id : a_id
        },
        type:'post',
        cache:false,
        dataType:'json',
        success:function(data) {
            console.log(data);
            if(data == 1){
                Lotterying();
                $("#waitmoment").html("已经开奖");
                $("#waitmoment").disable=true;
                clearInterval(window.start_count_down);
                window.location.reload();
            }else if(data == 2){
                $("#waitmoment").html("数据处理中…");
                $("#waitmoment").disable=true;
                return ;
            }else if(data == 3){
                $("#waitmoment").html("本期无参与者");
                $("#waitmoment").disable=true;
                clearInterval(window.start_count_down);
                window.location.reload();
            }else if(data == 4){
                $("#waitmoment").html("无参与者，等待开启下期");
                $("#waitmoment").disable=true;
                return;
            }
        },
        error : function() {
            // view("异常！");
            $("#waitmoment").html("系统异常，请刷新查看");
            clearInterval(window.start_count_down);
        }
    });
}