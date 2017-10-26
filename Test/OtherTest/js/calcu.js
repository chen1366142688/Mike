var checkEqual = false;//Avoid repetition calcu
var opFlag = false; //Check repetition add operation
var upText = document.getElementById("upText");
var cal = document.getElementById("cal").style;
var downText = document.getElementById("downText");

function show() {
    cal.display = "block";
}

function hide() {
    cal.display = "none";
}

function clearAllText() {
    upText.value = "";
    downText.value = "0";
    opFlag = false;
    checkEqual = false;
}

function oppositeOp(){
    downText.value = -downText.value;
}

function deleteOneDigit() {
    downText.value = downText.value.substring(0, downText.value.length - 1);
    if (downText.value == "" || (downText.value.charAt(0) == "-" && downText.value.charAt(1) == "")) {
        downText.value = "0";
        return downText.value;
    }
    return downText.value;
}

function clickNum(num) {
    if(num == ".") {
        checkIfAddPoint(num);
    } else {
        checkIfAddNum(num);
    }
    checkEqual = false;
}

function checkIfAddPoint(num) {
    if((num=="." && downText.value == "0") || opFlag == true) {
        downText.value="0.";
        opFlag = false;
    } else if(num == "." && downText.value.indexOf(".") > -1) {
        downText.value;
    } else {
        downText.value += num;
    }
}

function checkIfAddNum(num) {
    if((num != "." && downText.value == "0" && downText.value[1] != ".")
        || opFlag == true
        || downText.value == "Infinity"
        || checkEqual == true) {
        downText.value = num;
        opFlag = false;
    } else {
        downText.value += num;
    }
}

function clickOperation(op){
    checkEqual = false;
    downText.value = checkdownTextValid(downText.value);
    downText.value = checkZero(upText.value,downText.value);
    switch(op){
        case "+":{
            upText.value = appendupTextValue(upText.value,downText.value,"+");
            opFlag = true;
        }break;
        case "-":{
            upText.value = appendupTextValue(upText.value,downText.value,"-");
            opFlag = true;
        }break;
        case "x":{
            upText.value = appendupTextValue(upText.value,downText.value,"*");
            opFlag = true;
        }break;
        case "/":{
            upText.value = appendupTextValue(upText.value,downText.value,"/");
            opFlag = true;
        }break;
    }
}

function checkdownTextValid(downText){
    if(downText.charAt(downText.length-1) == "."){
        return downText.substring(0,downText.length-1);
    }
    return downText;
}

function checkZero(upText,downText){
    if(upText.charAt(upText.length-1) == "/" && downText == "0"){
        return "Error";
    }
    return downText;
}

function appendupTextValue(oldvalue,newvalue,operation){
    if(oldvalue == ""){
        return oldvalue = newvalue+operation;
    } else if(opFlag!=true){
        return oldvaluee = oldvalue+newvalue+operation;
    } else{
        return oldvalue.substring(0, oldvalue.length-1)+operation;
    }
}

function calcu() {
    if(!checkEqual){
        downText.value = eval(upText.value+downText.value);
        upText.value = "";
        checkEqual = true;
    }
}

window.document.onkeydown = chooseKey;
function chooseKey(evt){
    if(evt.keyCode == 13){alert("=");}
    else if(evt.keyCode == 8){deleteOneDigit();}
    else if(evt.keyCode == 27){clearAllText();}
    else if(evt.keyCode == 48){clickNum('0');}
    else if(evt.keyCode == 49){clickNum('1');}
    else if(evt.keyCode == 50){clickNum('2');}
    else if(evt.keyCode == 51){clickNum('3');}
    else if(evt.keyCode == 52){clickNum('4');}
    else if(evt.keyCode == 53){clickNum('5');}
    else if(evt.keyCode == 54){clickNum('6');}
    else if(evt.keyCode == 55){clickNum('7');}
    else if(evt.keyCode == 56){clickNum('8');}
    else if(evt.keyCode == 57){clickNum('9');}
    else if(evt.keyCode == 96){clickNum('0');}
    else if(evt.keyCode == 97){clickNum('1');}
    else if(evt.keyCode == 98){clickNum('2');}
    else if(evt.keyCode == 99){clickNum('3');}
    else if(evt.keyCode == 100){clickNum('4');}
    else if(evt.keyCode == 101){clickNum('5');}
    else if(evt.keyCode == 102){clickNum('6');}
    else if(evt.keyCode == 103){clickNum('7');}
    else if(evt.keyCode == 104){clickNum('8');}
    else if(evt.keyCode == 105){clickNum('9');}
    else if(evt.keyCode == 110){clickNum('.');}
    else if(evt.keyCode == 106){clickOperation('x');}
    else if(evt.keyCode == 107){clickOperation('+');}
    else if(evt.keyCode == 111){clickOperation('÷');}
    else if(evt.keyCode == 109){clickOperation('-');}
}
