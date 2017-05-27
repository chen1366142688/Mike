/**
 * Created by mei on 2016/12/2.
 */
(function(doc,win){
    var rem=20/375*doc.documentElement.clientWidth;
    doc.documentElement.style.fontSize=rem+'px';
    win.onresize=function(){
        var rem=20/375*doc.documentElement.clientWidth;
        doc.documentElement.style.fontSize=rem+'px';
    }
})(document,window);