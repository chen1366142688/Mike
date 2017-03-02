window.addEventListener('DOMContentLoaded',function(){
    var oNav=document.getElementById('nav');
    var oDiv=oNav.getElementsByTagName('div');
    var len=oDiv.length;
    for(var i=0;i<len;i++){
        oDiv[i].index=i;
        oDiv[i].onclick=function () {
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
        }
    }
    var Cut=document.getElementById('cut');
    var Add=document.getElementById('add');
    var N1=document.getElementById('number1');
    var N2=document.getElementById('number2');
    /*N1proN2 每升消耗的油豆数*/
    /*Number_of_participants//每轮活动参与次数*/
    function cut(N1proN2) {
        Cut.onclick= function () {
            N1.value=(Number(N1.value)-1);
            if (Number(N1.value)<=1){
                N1.value=1;
            };
            N2.value=N1proN2*Number(N1.value);
        };
    }
    /*cut(50);*/
    function add(N1proN2,Number_of_participants) {
        Add.onclick= function () {
            N1.value=(Number(N1.value)+1);
            if (Number(N1.value)>=Number_of_participants){
                N1.value=Number_of_participants;
            };
            N2.value=N1proN2*Number(N1.value);
        };
    }
    /*add(50,14);*/
},false);


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
    toggleT('#start','#success');
    toggleF('#close_cyou','#success');
    toggleF('#continue1','#success');
    toggleT('#lookusernumber','#usernumberbox');
    toggleF('#close_cyou3','#usernumberbox');
};
/*余额不足众筹失败 执行join_unsuccess();*/
function join_unsuccess() {
    toggleT('#start','#unsuccess');
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
join_unsuccess();
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
Lotterying();