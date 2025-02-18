function CompoLabel() {
    this.id;    //此器件div的id与此id相同
    this.type = "d";  //source:数据源器件   intermediate:中间器件   destination:目的器件
    this.name = "Label";
    this.width = 30;
    this.height = 20;
    this.image = "";
    this.paddingLR = 5;    //paddingLR：芯片左右边距
    this.pinName = new Array();
    this.pinWidth = 0;    //引脚宽度不应小于16
    this.pinHeight = 0;
    this.showName = true; //是否在芯片上显示芯片名称
    this.showBorder = false;//是否显示外框


    //i:引脚间距    [x,y]：除掉边距之外，以芯片左上角为[0,0]、右下角为[1,1]的相对坐标
    this.pinPosition = new Array();

    //引脚类型  0：输入  10:必要输入  1：输出  2：地  3：电源
    this.pinFunction = new Array();

    this.pinValue = new Array();

    //引脚与其它引脚的连接线对象
    this.connection = new Array();
}

//判断目前芯片是否已达到运算条件(是否所有的必要输入都已经有输入值)
CompoLabel.prototype.beReady = function () {
    return true;
}

//设置输入引脚的值，并且判断目前芯片是否已达到运算条件
CompoLabel.prototype.input = function (pinNo, value) {
    return true;
}

CompoLabel.prototype.work = function () {
}

CompoLabel.prototype.reset = function () {
}
