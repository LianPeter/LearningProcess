function Compo74LS163() {
    this.id;    //此器件div的id与此id相同
    this.type = "i";  //source:数据源器件   intermediate:中间器件   destination:目的器件
    this.name = "74LS163";
    this.width = 130;
    this.height = 55;
    this.image = "";
    this.paddingLR = 5;    //paddingLR：芯片左右边距   
    this.pinName = new Array("-CR", "CP", "D", "C", "B", "A", "ENP",  "GND", "-LD", "ENT", "QA","QB", "QC", "QD", "RCO","VCC");
    this.pinWidth = (this.width - this.paddingLR * 2) / 8;    //引脚宽度不应小于16
    this.pinHeight = 19;
    this.showName = true; //是否在芯片上显示芯片名称
    this.showBorder = true;//是否显示外框


    //i:引脚间距    [x,y]：除掉边距之外，以芯片左上角为[0,0]、右下角为[1,1]的相对坐标
    var i = 1 / 8;
    this.pinPosition = new Array([i * 0, 1], [i * 1, 1], [i * 2, 1], [i * 3, 1], [i * 4, 1], [i * 5, 1], [i * 6, 1], [i * 7, 1], 
                                 [i * 7, 0], [i * 6, 0], [i * 5, 0],[i * 4, 0], [i * 3, 0], [i * 2, 0], [i * 1, 0], [i * 0, 0]);

    //引脚类型  0：输入  10:必要输入  1：输出  2：地  3：电源  
    this.pinFunction = new Array(10, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 1, 1, 1, 1, 3);

    this.pinValue = new Array(2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);

    //引脚与其它引脚的连接线对象
    this.connection = new Array([], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []);

    this.operationType = 0;
};

//判断目前芯片是否已达到运算条件(是否所有的必要输入都已经有输入值)
Compo74LS163.prototype.beReady = function () {
    for (var i = 0; i < this.pinFunction.length; i++) {
        if (this.pinFunction[i] == 10 && this.pinValue[i] == 2) {
            return false;
        }
    };
    return true;
};

//设置输入引脚的值，并且判断目前芯片是否已达到运算条件
Compo74LS163.prototype.input = function (pinNo, value) {
    if (value == this.pinValue[pinNo]) return false; //如果输入的值没有变化，则无需重新计算
    var oldv = this.pinValue[pinNo];
    this.pinValue[pinNo] = value;

    if (pinNo == 1 && oldv == 0 && value == 1){//如果是时钟的上升沿
        if (this.pinValue[0] == 0) {//如果是清零工作模式
            this.operationType = 1;
            return true;
        };
        if (this.pinValue[0] == 1 && this.pinValue[8] == 0) {//如果是置数工作模式
            for (var i = 2; i <=5; i++) {
                if (this.pinValue[i] == 2) {
                    return false;
                };
            };
            this.operationType = 2;
            return true;
        };
        if (this.pinValue[0] == 1 && this.pinValue[8] == 1 &&this.pinValue[6] == 1 && this.pinValue[9] == 1) {//如果是计数工作模式
            for (var i = 10; i <=13; i++) {
                if (this.pinValue[i] == 2) {
                    return false;
                };
            };
            this.operationType = 3;
            return true;
        };
    };
    return false;
};

Compo74LS163.prototype.work = function () {

    if (this.operationType == 1) {//如果是清零工作模式
        for (var i = 10; i <= 13; i++) {
            this.pinValue[i] = 0;
        };
        this.operationType = 0;
        return;
    };
    if (this.operationType == 2) {//如果是置数工作模式
        for (i = 10; i <= 13; i++) this.pinValue[i] = this.pinValue[15 - i];
        var s = this.pinValue[10] * 1 + this.pinValue[11] * 2 + this.pinValue[12] * 4 + this.pinValue[13] * 8;
        if (s == 15) {
            this.pinValue[14] = 1;
        } else {
            this.pinValue[14] = 0;
        };
        this.operationType = 0;
        return;
    };
    if (this.operationType == 3) {//如果是计数工作模式
        var s;
        s = this.pinValue[10] * 1+this.pinValue[11] * 2+this.pinValue[12] * 4+this.pinValue[13] * 8;
        s = s + 1;
        if (s == 15) {
            this.pinValue[14] = 1;
        } else {
            this.pinValue[14] = 0;
        };
        this.pinValue[13] = Math.floor(s % 16 / 8);
        this.pinValue[12] = Math.floor(s % 8 / 4);
        this.pinValue[11] = Math.floor(s % 4 / 2);
        this.pinValue[10] = Math.floor(s % 2);
    };
    this.operationType = 0;
};

Compo74LS163.prototype.reset = function () {
    this.pinValue = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
    this.operationType = 0;
};
