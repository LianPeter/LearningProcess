function CompoEPROM2716C4() {
    this.id;    //此器件div的id与此id相同
    this.type = "i";  //source:数据源器件   intermediate:中间器件   destination:目的器件
    this.name = "EPROM2716C4";
    this.width = 394;
    this.height = 55;
    this.image = "";
    this.paddingLR = 5;    //paddingLR：芯片左右边距
    this.pinName = new Array("A10", "A9", "A8", "A7", "A6", "A5", "A4", "A3", "A2", "A1", "A0", "-CE", "-OE", "VPP", "Q0", "Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "GND",
                              "Q9", "Q10", "Q11", "Q12", "Q13", "Q14", "Q15", "Q16", "Q17", "Q18", "Q19", "Q20", "Q21", "Q22", "Q23", "Q24", "Q25", "Q26", "Q27", "Q28", "Q29", "Q30", "Q31", "VCC");
    this.pinWidth = (this.width - this.paddingLR * 2) / 24;    //引脚宽度不应小于16
    this.pinHeight = 19;
    this.showName = true; //是否在芯片上显示芯片名称
    this.showBorder = true;//是否显示外框

    //i:引脚间距    [x,y]：除掉边距之外，以芯片左上角为[0,0]、右下角为[1,1]的相对坐标
    var i = 1 / 24;
    this.pinPosition = new Array([i * 0, 1], [i * 1, 1], [i * 2, 1], [i * 3, 1], [i * 4, 1], [i * 5, 1], [i * 6, 1], [i * 7, 1], [i * 8, 1], [i * 9, 1], [i * 10, 1],
                       [i * 11, 1], [i * 12, 1], [i * 13, 1], [i * 14, 1], [i * 15, 1], [i * 16, 1], [i * 17, 1], [i * 18, 1], [i * 19, 1], [i * 20, 1], [i * 21, 1], [i * 22, 1], [i * 23, 1],
                       [i * 23, 0], [i * 22, 0], [i * 21, 0], [i * 20, 0], [i * 19, 0], [i * 18, 0], [i * 17, 0], [i * 16, 0], [i * 15, 0], [i * 14, 0], [i * 13, 0], [i * 12, 0], [i * 11, 0],
                       [i * 10, 0], [i * 9, 0], [i * 8, 0], [i * 7, 0], [i * 6, 0], [i * 5, 0],[i * 4, 0], [i * 3, 0], [i * 2, 0], [i * 1, 0], [i * 0, 0]);

    //引脚类型  0：输入  10:必要输入  1：输出  2：地  3：电源   4:其它  11：输入/输出
    this.pinFunction = new Array(4, 4, 4, 4, 4, 10, 10, 10, 10, 10, 10, 10, 10, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2,
                                 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3);

    this.pinValue = new Array(0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                              2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);

    //引脚与其它引脚的连接线对象
    this.connection = new Array([], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [],
                                [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []);

    //0：未工作  1：读  2：写
   // this.workState = 0;

    this.memory = new Array();
    for (var i = 0; i < 63; i++) this.memory[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
}

//判断目前芯片是否已达到运算条件(是否所有的必要输入都已经有输入值)
CompoEPROM2716C4.prototype.beReady = function () {
    for (var i = 0; i <=10; i++) {
        if (this.pinValue[i] == 2) {
            return false;
        }
    }

    if (this.pinValue[12] == 1 || this.pinValue[11] == 1){
        return false;
    }

    return true;
}

//设置输入引脚的值，并且判断目前芯片是否已达到运算条件   问题：是否必须先片选再设读写模式？
CompoEPROM2716C4.prototype.input = function (pinNo, value) {
    if (value == this.pinValue[pinNo]) return false; //如果输入的值没有变化，则无需重新计算

    this.pinValue[pinNo] = value;

    //片选变为1时，各IO引脚变为高阻态 问题：变为高阻态芯片的输出会影响下一级输入吗？当再次进入写状态时，原有输入是否有效？
    if (pinNo == 11 && value == 1 || pinNo == 12 && value ==1) {
        for (var i = 14; i <= 46; i++) this.pinValue[i] = 2;  //2
        return true;
    }

    return this.beReady();
}

CompoEPROM2716C4.prototype.work = function () { //读操作

    if (this.pinValue[12] == 1 || this.pinValue[11] == 1) {
        return true;
    }

    var a = 0;
    var q = 1;
    var j = 0;
    for (var i = 10; i >= 0; i--) { //计算地址
        a = a + this.pinValue[i] * q;
        q = q * 2;
    }
    for (var i = 14; i <= 22; i++) {
        this.pinValue[i] = this.memory[a][j];
        j++;
    }
    for (var i = 24; i <= 46; i++) {
        this.pinValue[i] = this.memory[a][j];
        j++;
    }

}

CompoEPROM2716C4.prototype.reset = function () {
    this.pinValue = [0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                     2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
}

