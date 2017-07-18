
var cityObj = [{ "city": "安徽", "code": "592", "initial": "A" }, { "city": "北京", "code": "581", "initial": "B" }, { "city": "福建", "code": "561", "initial": "F" }, { "city": "广东", "code": "560", "initial": "G" }, { "city": "甘肃", "code": "585", "initial": "G" }, { "city": "广西", "code": "586", "initial": "G" }, { "city": "贵州", "code": "591", "initial": "G" }, { "city": "湖北", "code": "564", "initial": "H" }, { "city": "海南", "code": "569", "initial": "H" }, { "city": "黑龙江", "code": "573", "initial": "H" }, { "city": "河北", "code": "575", "initial": "H" }, { "city": "湖南", "code": "577", "initial": "H" }, { "city": "河南", "code": "589", "initial": "H" }, { "city": "吉林", "code": "565", "initial": "J" }, { "city": "江苏", "code": "579", "initial": "J" }, { "city": "江西", "code": "582", "initial": "J" }, { "city": "辽宁", "code": "572", "initial": "L" }, { "city": "宁夏", "code": "574", "initial": "N" }, { "city": "内蒙古", "code": "580", "initial": "N" }, { "city": "青海", "code": "566", "initial": "Q" }, { "city": "四川", "code": "563", "initial": "S" }, { "city": "陕西", "code": "571", "initial": "S" }, { "city": "上海", "code": "576", "initial": "S" }, { "city": "山西", "code": "583", "initial": "S" }, { "city": "山东", "code": "584", "initial": "S" }, { "city": "天津", "code": "567", "initial": "T" }, { "city": "西藏", "code": "568", "initial": "X" }, { "city": "新疆", "code": "570", "initial": "X" }, { "city": "云南", "code": "587", "initial": "Y" }, { "city": "重庆", "code": "562", "initial": "Z" }, { "city": "浙江", "code": "578", "initial": "Z" }]

//城市检索的首字母
var searchLetter = ["A", "B", "C", "D", "E","F", "G", "H","I", "J", "K","L","M", "N","O","P","Q","R", "S", "T","U","V","W", "X", "Y", "Z"]


function searchLetter() {
    return searchLetter;
}

//对城市信息进行分组
function cityList() {
    
    var tempObj=[];
    for (var i = 0; i < searchLetter.length; i++) {
        var initial = searchLetter[i];
        var cityInfo = [];
        var tempArr = {};
        tempArr.initial = initial;
        for (var j = 0; j < cityObj.length; j++) {
            if (initial == cityObj[j].initial) {
                cityInfo.push(cityObj[j]);
            }
        }
        tempArr.cityInfo = cityInfo;
        tempObj.push(tempArr);
    }
    return tempObj;
}

function pushCity() {

}

module.exports = {
    searchLetter: searchLetter,
    cityList: cityList
}