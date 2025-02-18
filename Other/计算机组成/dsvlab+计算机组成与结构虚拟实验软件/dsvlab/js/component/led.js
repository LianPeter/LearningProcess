function CompoLed() {
    this.id;    //此器件div的id与此id相同
    this.type = "d"; //source:数据源器件   intermediate:中间器件   destination:目的器件
    this.name = "Led";
    this.width = 17;
    this.height =26;
    this.image = "./img/ledoff.gif";
    this.paddingLR = 0;    //paddingLR：芯片左右边距
    this.pinName = new Array("");
    this.pinWidth = (this.width - this.paddingLR * 2);    //引脚宽度不应小于16
    this.pinHeight = 10;
    this.showName = false; //是否在芯片上显示芯片名称
    this.showBorder =false;//是否显示外框

    //i:引脚间距    [x,y]：除掉边距之外，以芯片左上角为[0,0]、右下角为[1,1]的相对坐标
    var i = 1;
    this.pinPosition = new Array([i * 0, 1]);

    //引脚类型  0：输入  10:必要输入  1：输出  2：地  3：电源  4:其它
    this.pinFunction = new Array([10]);

    this.pinValue = new Array([2]);

    //引脚与其它引脚的连接线对象
    this.connection = new Array([]);
}

//判断目前芯片是否已达到运算条件
CompoLed.prototype.beReady = function () {
//    if (this.pinValue[0] == 2) {
//        return false;
//    }
    return true;
}

//设置输入引脚的值，并且判断目前芯片是否已达到运算条件
CompoLed.prototype.input = function (pinNo, value) {
    if (value == this.pinValue[pinNo]) return false; //如果输入的值没有变化，则无需重新计算
    this.pinValue[pinNo] = value;
    return this.beReady();
}

CompoLed.prototype.work = function () {
    var l=document.getElementById(this.id);
    if (this.pinValue[0] == 1)
        l.style.backgroundImage = "url(./img/ledon.gif)";
    else
        l.style.backgroundImage = "url(./img/ledoff.gif)";
}

CompoLed.prototype.reset = function () {
    this.pinValue = [2];
    var l = document.getElementById(this.id);
    l.style.backgroundImage = "url(./img/ledoff.gif)";
}
