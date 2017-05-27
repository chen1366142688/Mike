window.onload=function () {
    var oNav=document.getElementById('box');
    var oA=oNav.getElementsByTagName('a');
    var len=oA.length;
    for(var i=0;i<len;i++){
        oA[i].index=i;
        oA[i].onclick=function () {
            for(var i=0;i<len;i++){
                oA[i].className='';
            }
            this.className='active';
        }
    }
}