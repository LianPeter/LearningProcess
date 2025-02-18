function CompoSequeTimer() {
    this.id;    //此器件div的id与此id相同
    this.type = "i";  //source:数据源器件   intermediate:中间器件   destination:目的器件
    this.name = "SequeTimer";
    this.width = 86;
    this.height = 55;
    this.image = "";
    this.paddingLR = 5;    //paddingLR：芯片左右边距
    this.pinName = new Array("Ts","Stop","Step","Start", "T4", "T3", "T2", "T1");
    this.pinWidth = (this.width - this.paddingLR * 2) / 4;    //引脚宽度不应小于16
    this.pinHeight = 19;
    this.showName = true; //是否在芯片上显示芯片名称
    this.showBorder = true;//是否显示外框


    //i:引脚间距    [x,y]：除掉边距之外，以芯片左上角为[0,0]、右下角为[1,1]的相对坐标
    var i = 1 / 4;
    this.pinPosition = new Array([i * 0, 1], [i * 1, 1], [i * 2, 1], [i * 3, 1],[i * 3, 0], [i * 2, 0], [i * 1, 0], [i * 0, 0]);

    //引脚类型  0：输入  10:必要输入  1：输出  2：地  3：电源
    this.pinFunction = new Array(10,10,10,10,1, 1, 1, 1);

    this.pinValue = new Array(2, 2, 2, 2, 2, 2, 2, 2);

    //引脚与其它引脚的连接线对象
    this.connection = new Array([], [], [], [], [], [], [], []);

    this.count = 0;//电平变化的次数

    this.runstate = 0;//运行状态 0：没有运行 1：正在运行中

    this.prerun = 0; //已收到启动信号，等待在下一个输入方波的上升沿启动

    this.prestop = 0; //已收到停止信号，等待在本CPU周期结束时停止

    this.power = 0;//是否源脉冲开始工作
}

//判断目前芯片是否已达到运算条件(是否所有的必要输入都已经有输入值)
CompoSequeTimer.prototype.beReady = function () {
    for (var i = 0; i < this.pinFunction.length; i++) {
        if (this.pinFunction[i] == 10 && this.pinValue[i] == 2) {
            return false;
        }
    }
    return true;
}

//设置输入引脚的值，并且判断目前芯片是否已达到运算条件
CompoSequeTimer.prototype.input = function (pinNo, value) {
    if (value == this.pinValue[pinNo]) return false; //如果输入的值没有变化，则无需重新计算
    var oldv = this.pinValue[pinNo];
    this.pinValue[pinNo] = value;

    if (pinNo == 0 && oldv == 2) {//如果是源脉冲开始工作
        this.power = 1;
        return true
    }

    if (pinNo == 3 && oldv == 0 && value == 1 && this.pinValue[1] == 0 && this.runstate == 0) {
        this.prerun = 1;
        return false;
    }

    if (pinNo == 1 && value == 1 && this.runstate == 1) {
        this.prestop = 1;
        return false;
    }

    if (pinNo == 0 && oldv == 0 && value == 1 && this.prerun == 1) {
        return true;
    }

    if (pinNo == 0 && this.runstate == 1) {
        this.count = this.count + 1;
        if ((this.count-1) % 2==0) return true;
    }

    return false;
}

CompoSequeTimer.prototype.work = function () {
    if (this.power == 1) {
        this.power = 0;
        this.pinValue[7] = 0;
        this.pinValue[6] = 0;
        this.pinValue[5] = 0;
        this.pinValue[4] = 0;
        return
    }

    if (this.prerun == 1) {
        this.prerun = 0;
        this.runstate = 1;
        this.count = 1;
        this.pinValue[7] = 1;
        this.pinValue[6] = 0;
        this.pinValue[5] = 0;
        this.pinValue[4] = 0;
        return;
    }
    if (this.runstate == 1 && (this.prestop == 1 || this.pinValue[2] == 1) && (this.count - 1) % 8 == 0) {
        this.pinValue[4] = 0;
        this.prestop = 0;
        this.runstate = 0;
        this.count = 0;
        return;
    }

    this.pinValue[7-((this.count - 1) / 2 + 3) % 4] = 0;//前一个T赋值为0
    this.pinValue[7-((this.count - 1) / 2 ) % 4] = 1;//当前T赋值为1

}

CompoSequeTimer.prototype.reset = function () {
    this.pinValue = [2, 2, 2, 2, 2, 2, 2, 2];
    this.count = 0;//电平变化的次数
    this.runstate = 0;//运行状态 0：没有运行 1：正在运行中
    this.prerun = 0; //已收到启动信号，等待在下一个输入方波的上升沿启动
    this.prestop = 0; //已收到停止信号，等待在本CPU周期结束时停止
    this.power = 0;
}
