function CompoANDgate() {
    this.id;    //此器件div的id与此id相同
    this.type = "i";  //source:数据源器件   intermediate:中间器件   destination:目的器件
    this.name = "ANDgate";
    this.width = 31;
    this.height = 20;
    this.image = "./img/ANDgate.gif";
    this.paddingLR = 2;    //芯片左右边距
    this.pinName = new Array("","","");
    this.pinWidth = (this.width - this.paddingLR * 2)/3;    //引脚宽度不应小于16
    this.pinHeight = 8;
    this.showName = false; //是否在芯片上显示芯片名称
    this.showBorder = false;//是否显示外框

    //i:引脚间距    [x,y]：除掉边距之外，以芯片左上角为[0,0]、右下角为[1,1]的相对坐标
    var i = 1/3;
    this.pinPosition = new Array([i * 0, 1],[i * 2, 1],[i * 1, 0]);

    //引脚类型  0：输入  10:必要输入  1：输出  2：地  3：电源  4:其它
    this.pinFunction = new Array([10],[10],[1]);

    this.pinValue = new Array(2,2,2);//2表示暂时没有值

    //引脚与其它引脚的连接线对象
    this.connection = new Array([],[],[]);
}

//判断目前芯片是否已达到运算条件(是否所有的必要输入都已经有输入值)
CompoANDgate.prototype.beReady = function () {
    for (var i = 0; i < this.pinFunction.length; i++) {
        if (this.pinFunction[i] == 10 && this.pinValue[i] == 2) {
            return false;
        }
    }
    return true;
}

//设置输入引脚的值，并且判断目前芯片是否已达到运算条件
CompoANDgate.prototype.input = function (pinNo, value) {
    if (value == this.pinValue[pinNo]) return false; //如果输入的值没有变化，则无需重新计算
    this.pinValue[pinNo] = value;
    return this.beReady();
}

CompoANDgate.prototype.work = function () {
    if (this.pinValue[0] == 1 && this.pinValue[1] == 1) {
        this.pinValue[2] = 1;
    } else {
        this.pinValue[2] = 0;
    }
}

CompoANDgate.prototype.reset = function () {
    this.pinValue = [2, 2, 2];
}




//或门电路
function CompoORgate() {
    this.id;    //此器件div的id与此id相同
    this.type = "i";  //source:数据源器件   intermediate:中间器件   destination:目的器件
    this.name = "ORgate";
    this.width = 31;
    this.height = 20;
    this.image = "./img/ORgate.gif";
    this.paddingLR = 2;    //芯片左右边距
    this.pinName = new Array("", "", "");
    this.pinWidth = (this.width - this.paddingLR * 2) / 3;    //引脚宽度不应小于16
    this.pinHeight = 8;
    this.showName = false; //是否在芯片上显示芯片名称
    this.showBorder = false;//是否显示外框

    //i:引脚间距    [x,y]：除掉边距之外，以芯片左上角为[0,0]、右下角为[1,1]的相对坐标
    var i = 1 / 3;
    this.pinPosition = new Array([i * 0, 1], [i * 2, 1], [i * 1, 0]);

    //引脚类型  0：输入  10:必要输入  1：输出  2：地  3：电源  4:其它
    this.pinFunction = new Array([10], [10], [1]);

    this.pinValue = new Array(2, 2, 2);

    //引脚与其它引脚的连接线对象
    this.connection = new Array([], [], []);
}

//判断目前芯片是否已达到运算条件(是否所有的必要输入都已经有输入值)
CompoORgate.prototype.beReady = function () {
    for (var i = 0; i < this.pinFunction.length; i++) {
        if (this.pinFunction[i] == 10 && this.pinValue[i] == 2) {
            return false;
        }
    }
    return true;
}

//设置输入引脚的值，并且判断目前芯片是否已达到运算条件
CompoORgate.prototype.input = function (pinNo, value) {
    if (value == this.pinValue[pinNo]) return false; //如果输入的值没有变化，则无需重新计算
    this.pinValue[pinNo] = value;
    return this.beReady();
}

CompoORgate.prototype.work = function () {
    if (this.pinValue[0] == 1 || this.pinValue[1] == 1) {
        this.pinValue[2] = 1;
    } else {
        this.pinValue[2] = 0;
    }
}

CompoORgate.prototype.reset = function () {
    this.pinValue = [2, 2, 2];
}


//非门电路
function CompoNOTgate() {
    this.id;    //此器件div的id与此id相同
    this.type = "i";  //source:数据源器件   intermediate:中间器件   destination:目的器件
    this.name = "NOTgate";
    this.width = 31;
    this.height = 26;
    this.image = "./img/NOTgate.gif";
    this.paddingLR = 11;    //芯片左右边距
    this.pinName = new Array("", "");
    this.pinWidth = (this.width - this.paddingLR * 2) / 1;    //引脚宽度不应小于16
    this.pinHeight = 8;
    this.showName = false; //是否在芯片上显示芯片名称
    this.showBorder = false;//是否显示外框

    //i:引脚间距    [x,y]：除掉边距之外，以芯片左上角为[0,0]、右下角为[1,1]的相对坐标
    var i = 1 ;
    this.pinPosition = new Array([i * 0, 1], [i * 0, 0]);

    //引脚类型  0：输入  10:必要输入  1：输出  2：地  3：电源  4:其它
    this.pinFunction = new Array([10], [1]);

    this.pinValue = new Array(2, 2);

    //引脚与其它引脚的连接线对象
    this.connection = new Array([],[]);
}

//判断目前芯片是否已达到运算条件(是否所有的必要输入都已经有输入值)
CompoNOTgate.prototype.beReady = function () {
    for (var i = 0; i < this.pinFunction.length; i++) {
        if (this.pinFunction[i] == 10 && this.pinValue[i] == 2) {
            return false;
        }
    }
    return true;
}

//设置输入引脚的值，并且判断目前芯片是否已达到运算条件
CompoNOTgate.prototype.input = function (pinNo, value) {
    if (value == this.pinValue[pinNo]) return false; //如果输入的值没有变化，则无需重新计算
    this.pinValue[pinNo] = value;
    return this.beReady();
}

CompoNOTgate.prototype.work = function () {
    if (this.pinValue[0] == 1) this.pinValue[1] = 0;
    if (this.pinValue[0] == 0) this.pinValue[1] = 1;
}

CompoNOTgate.prototype.reset = function () {
    this.pinValue = [2, 2];
}


//与非门电路
function CompoNANDgate() {
    this.id;    //此器件div的id与此id相同
    this.type = "i";  //source:数据源器件   intermediate:中间器件   destination:目的器件
    this.name = "NANDgate";
    this.width = 31;
    this.height = 26;
    this.image = "./img/NANDgate.gif";
    this.paddingLR = 2;    //芯片左右边距
    this.pinName = new Array("", "", "");
    this.pinWidth = (this.width - this.paddingLR * 2) / 3;    //引脚宽度不应小于16
    this.pinHeight = 8;
    this.showName = false; //是否在芯片上显示芯片名称
    this.showBorder = false;//是否显示外框

    //i:引脚间距    [x,y]：除掉边距之外，以芯片左上角为[0,0]、右下角为[1,1]的相对坐标
    var i = 1 / 3;
    this.pinPosition = new Array([i * 0, 1], [i * 2, 1], [i * 1, 0]);

    //引脚类型  0：输入  10:必要输入  1：输出  2：地  3：电源  4:其它
    this.pinFunction = new Array([10], [10], [1]);

    this.pinValue = new Array(2, 2, 2);//2表示暂时没有值

    //引脚与其它引脚的连接线对象
    this.connection = new Array([], [], []);
}

//判断目前芯片是否已达到运算条件(是否所有的必要输入都已经有输入值)
CompoNANDgate.prototype.beReady = function () {
    for (var i = 0; i < this.pinFunction.length; i++) {
        if (this.pinFunction[i] == 10 && this.pinValue[i] == 2) {
            return false;
        }
    }
    return true;
}

//设置输入引脚的值，并且判断目前芯片是否已达到运算条件
CompoNANDgate.prototype.input = function (pinNo, value) {
    if (value == this.pinValue[pinNo]) return false; //如果输入的值没有变化，则无需重新计算
    this.pinValue[pinNo] = value;
    return this.beReady();
}

CompoNANDgate.prototype.work = function () {
    if (this.pinValue[0] == 1 && this.pinValue[1] == 1) {
        this.pinValue[2] = 0;
    } else {
        this.pinValue[2] = 1;
    }
}

CompoNANDgate.prototype.reset = function () {
    this.pinValue = [2, 2, 2];
}



//异或门电路
function CompoXORgate() {
    this.id;    //此器件div的id与此id相同
    this.type = "i"; //source:数据源器件   intermediate:中间器件   destination:目的器件
    this.name = "XORgate";
    this.width = 31;
    this.height = 20;
    this.image = "./img/XORgate.gif";
    this.paddingLR = 2;    //芯片左右边距
    this.pinName = new Array("", "", "");
    this.pinWidth = (this.width - this.paddingLR * 2) / 3;    //引脚宽度不应小于16
    this.pinHeight = 8;
    this.showName = false; //是否在芯片上显示芯片名称
    this.showBorder = false;//是否显示外框

    //i:引脚间距    [x,y]：除掉边距之外，以芯片左上角为[0,0]、右下角为[1,1]的相对坐标
    var i = 1 / 3;
    this.pinPosition = new Array([i * 0, 1], [i * 2, 1], [i * 1, 0]);

    //引脚类型  0：输入  10:必要输入  1：输出  2：地  3：电源  4:其它
    this.pinFunction = new Array([10], [10], [1]);

    this.pinValue = new Array(2, 2, 2);

    //引脚与其它引脚的连接线对象
    this.connection = new Array([], [], []);
}

//判断目前芯片是否已达到运算条件(是否所有的必要输入都已经有输入值)
CompoXORgate.prototype.beReady = function () {
    for (var i = 0; i < this.pinFunction.length; i++) {
        if (this.pinFunction[i] == 10 && this.pinValue[i] == 2) {
            return false;
        }
    }
    return true;
}

//设置输入引脚的值，并且判断目前芯片是否已达到运算条件
CompoXORgate.prototype.input = function (pinNo, value) {
    if (value == this.pinValue[pinNo]) return false; //如果输入的值没有变化，则无需重新计算
    this.pinValue[pinNo] = value;
    return this.beReady();
}

CompoXORgate.prototype.work = function () {
    if (this.pinValue[0] == 1 && this.pinValue[1] == 0 || this.pinValue[1] == 1 && this.pinValue[0] == 0) {
        this.pinValue[2] = 1;
    } else {
        this.pinValue[2] = 0;
    }
}

CompoXORgate.prototype.reset = function () {
    this.pinValue = [2, 2, 2];
}



//三态门电路
function CompoTriplegate() {
    this.id;    //此器件div的id与此id相同
    this.type = "i";  //source:数据源器件   intermediate:中间器件   destination:目的器件
    this.name = "Triplegate";
    this.width = 31;
    this.height = 20;
    this.image = "./img/triplegate.gif";
    this.paddingLR = 2;    //芯片左右边距
    this.pinName = new Array("", "", "");
    this.pinWidth = (this.width - this.paddingLR * 2) / 3;    //引脚宽度不应小于16
    this.pinHeight = 8;
    this.showName = false; //是否在芯片上显示芯片名称
    this.showBorder = false;//是否显示外框

    //i:引脚间距    [x,y]：除掉边距之外，以芯片左上角为[0,0]、右下角为[1,1]的相对坐标
    var i = 1 / 3;
    this.pinPosition = new Array([i * 0, 1], [i * 2, 1], [i * 2, 0]);

    //引脚类型  0：输入  10:必要输入  1：输出  2：地  3：电源  4:其它
    this.pinFunction = new Array([10], [10], [1]);

    this.pinValue = new Array(2, 2, 2);//2表示暂时没有值

    //引脚与其它引脚的连接线对象
    this.connection = new Array([], [], []);
}

//判断目前芯片是否已达到运算条件(是否所有的必要输入都已经有输入值)
CompoTriplegate.prototype.beReady = function () {
    for (var i = 0; i < this.pinFunction.length; i++) {
        if (this.pinFunction[i] == 10 && this.pinValue[i] == 2) {
            return false;
        }
    }
    return true;
}

//设置输入引脚的值，并且判断目前芯片是否已达到运算条件
CompoTriplegate.prototype.input = function (pinNo, value) {
    if (value == this.pinValue[pinNo]) return false; //如果输入的值没有变化，则无需重新计算
    this.pinValue[pinNo] = value;

    return this.beReady();
}

CompoTriplegate.prototype.work = function () {
    if (this.pinValue[0] == 1) {
        this.pinValue[2] = this.pinValue[1];
    } else {
        this.pinValue[2] = 2;
    }
}

CompoTriplegate.prototype.reset = function () {
    this.pinValue = [2, 2, 2];
}
