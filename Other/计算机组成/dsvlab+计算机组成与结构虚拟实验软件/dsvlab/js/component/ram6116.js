function CompoRAM6116() {
    this.id;    //此器件div的id与此id相同
    this.type = "i";  //source:数据源器件   intermediate:中间器件   destination:目的器件
    this.name = "RAM6116";
    this.width = 202;
    this.height = 55;
    this.image = "";
    this.paddingLR = 5;    //paddingLR：芯片左右边距
    this.pinName = new Array("A7", "A6", "A5", "A4", "A3", "A2", "A1", "A0", "-CE", "-OE", "-WE", "GND", "IO0", "IO1", "IO2", "IO3", "IO4", "IO5", "IO6", "IO7", "A10", "A9", "A8", "VCC");
    this.pinWidth = (this.width - this.paddingLR * 2) / 12;    //引脚宽度不应小于16
    this.pinHeight = 19;
    this.showName = true; //是否在芯片上显示芯片名称
    this.showBorder = true;//是否显示外框

    //i:引脚间距    [x,y]：除掉边距之外，以芯片左上角为[0,0]、右下角为[1,1]的相对坐标
    var i = 1 / 12;
    this.pinPosition = new Array([i * 0, 1], [i * 1, 1], [i * 2, 1], [i * 3, 1], [i * 4, 1], [i * 5, 1], [i * 6, 1], [i * 7, 1], [i * 8, 1], [i * 9, 1], [i * 10, 1],
                       [i * 11, 1], [i * 11, 0], [i * 10, 0], [i * 9, 0], [i * 8, 0], [i * 7, 0], [i * 6, 0], [i * 5, 0],
                       [i * 4, 0], [i * 3, 0], [i * 2, 0], [i * 1, 0], [i * 0, 0]);

    //引脚类型  0：输入  10:必要输入  1：输出  2：地  3：电源   4:其它  11：输入/输出
    this.pinFunction = new Array(10, 10, 10, 10, 10, 10, 10, 10,10, 4, 10,2, 11, 11, 11,11, 11,11, 11, 11, 4, 4, 4, 3);

    this.pinValue = new Array(2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2);

    //引脚与其它引脚的连接线对象
    this.connection = new Array([], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []);

    //0：未工作  1：读  2：写
   // this.workState = 0;

    //保存引脚的输入值
    this.pinInput = new Array(2, 2, 2, 2, 2, 2, 2, 2);

    this.memory = new Array();
    for (var i = 0; i < 256; i++) this.memory[i] = [0, 0, 0, 0, 0, 0, 0, 0];

    //                0  1  2  3  4  5  6  7
    this.memory[0] = [0, 0, 0, 0, 0, 0, 0, 0];
    this.memory[1] = [0, 0, 0, 0, 0, 1, 0, 0];
    this.memory[2] = [0, 0, 0, 1, 0, 0, 0, 0];
    this.memory[3] = [0, 0, 0, 0, 0, 0, 1, 0];
    this.memory[4] = [1, 0, 0, 1, 0, 0, 0, 0];
    this.memory[5] = [0, 0, 0, 0, 0, 1, 1, 0];
    this.memory[6] = [0, 0, 0, 0, 0, 0, 0, 0];
    this.memory[7] = [0, 0, 0, 0, 0, 0, 0, 0];
    this.memory[8] = [1, 1, 0, 1, 0, 0, 0, 0];
    this.memory[9] = [0, 0, 0, 0, 0, 0, 0, 0];
}

//判断目前芯片是否已达到运算条件(是否所有的必要输入都已经有输入值)
CompoRAM6116.prototype.beReady = function () {
    for (var i = 0; i < 8; i++) {
        if (this.pinValue[i] == 2) {
            return false;
        }
    }
    if (this.pinValue[8]==0 && this.pinValue[10] == 0) { //如果是写操作
        for (var i = 0; i <= 7; i++) {
            if (this.pinInput[i] == 2) {
                return false;
            }
        }
    }

    return true;
}

//设置输入引脚的值，并且判断目前芯片是否已达到运算条件   问题：是否必须先片选再设读写模式？
CompoRAM6116.prototype.input = function (pinNo, value) {
    if (pinNo >= 12 && pinNo <= 19) {//如果是输入数据
         if (value == this.pinInput[pinNo - 12]) return false;//如果输入的值没有变化，则无需重新计算

         this.pinInput[pinNo - 12] = value;  //保存输入的数据，如果芯片输入引脚正处于高组态或正用于输出不保存则输入会丢失
         if (this.pinValue[8]==0 && this.pinValue[10] == 0) {//如果是写模式中
            return this.beReady();
         }

         return false;
    }

    if (value == this.pinValue[pinNo]) return false; //如果输入的值没有变化，则无需重新计算

    this.pinValue[pinNo] = value;

    if (pinNo == 8 && value == 0 && this.pinValue[10] == 1 || pinNo == 10 && value == 1 && this.pinValue[8] == 0) {//如果是读模式开始
        return this.beReady();
    }

    if (pinNo >= 0 && pinNo <= 7 && this.pinValue[8] == 0 && this.pinValue[10] == 1){//如果是读模式时地址改变
        return this.beReady();
    }

    if (pinNo == 8 && value == 0 && this.pinValue[10] == 0 || pinNo == 10 && value == 0 && this.pinValue[8] == 0) {//如果是写模式开始
        return this.beReady();
    }

    //片选变为1时，各IO引脚变为高阻态  问题：变为高阻态芯片的输出会影响下一级输入吗？当再次进入写状态时，原有输入是否有效？
    if (pinNo == 8 && value == 1) {
        return true;
    }

    return false;
}

CompoRAM6116.prototype.work = function () {
    if (this.pinValue[8] == 1 || this.pinValue[10] == 0) {
        for (i = 0; i <= 7; i++) {
            this.pinValue[i + 12] = 2;
        }
    }

    if (this.pinValue[8]==0 && this.pinValue[10] == 0) //如果是写操作
        this.write();
    if (this.pinValue[8]==0 && this.pinValue[10] == 1) //如果是读操作
        this.read();

}

CompoRAM6116.prototype.read = function () { //读操作
    var a = 0;
    var q = 1;
    for (var i = 7; i >= 0; i--) { //计算地址
        a = a + this.pinValue[i] * q;
        q = q * 2;
    }
    for (i = 0; i <= 7; i++) {
        this.pinValue[i + 12] = this.memory[a][i];
    }
}

CompoRAM6116.prototype.write = function () { //写操作
    var a=0;
    var q=1;
    for (var i = 7; i >= 0; i--) { //计算地址
        a = a + this.pinValue[i] * q;
        q = q * 2;
    }
    for (i = 0; i <= 7; i++) {
        this.memory[a][i] = this.pinInput[i];
    }
}


CompoRAM6116.prototype.reset = function () {
    this.pinValue = [2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2];
    this.pinInput = [2, 2, 2, 2, 2, 2, 2, 2];
}

