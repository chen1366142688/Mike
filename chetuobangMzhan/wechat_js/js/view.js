
//拍照或从手机相册中选图接口
wx.ready(function(){
    var images = {
        localId: [],
        serverId: []
    };
    document.querySelector('#done').onclick = function () {
        wx.chooseImage({
            success: function (res) {
                images.localId = res.localIds;
                alert('已选择 ' + res.localIds.length + ' 张图?');
            }
        });
    };
});