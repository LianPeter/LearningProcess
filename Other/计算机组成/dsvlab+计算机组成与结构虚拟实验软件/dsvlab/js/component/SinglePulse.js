function CompoSinglePulse() {
    this.id;    //此器件div的id与此id相同
    this.type = "s"; //source:数据源器件   intermediate:中间器件   destination:目的器件
    this.name = "SinglePulse";
    this.width = 17;
    this.height = 35;
    this.image = "./img/spulseup.gif";
    this.paddingLR = 0;    //paddingLR：芯片左右边距
    this.pinName = new Array("");
    this.pinWidth = (this.width - this.paddingLR * 2);    //引脚宽度不应小于16
    this.pinHeight = 10;
    this.showName = false; //是否在芯片上显示芯片名称
    this.showBorder = true;//是否显示外框

    //i:引脚间距    [x,y]：除掉边距之外，以芯片左上角为[0,0]、右下角为[1,1]的相对坐标
    var i = 1;
    this.pinPosition = new Array([i * 0, 0]);

    //引脚类型  0：输入  10:必要输入  1：输出  2：地  3：电源  4:其它
    this.pinFunction = new Array([1]);

    this.pinValue = new Array([0]);

    //引脚与其它引脚的连接线对象
    this.connection = new Array([]);

    this.count = 0;//电平变化的次数

    this.timer = null;//定时器的ID
}

//判断目前芯片是否已达到运算条件
CompoSinglePulse.prototype.beReady = function () {
    if (this.pinValue[0] == 2)   return false;
    return true;
}

//设置输入引脚的值，并且判断目前芯片是否已达到运算条件
CompoSinglePulse.prototype.input = function () {
    var l = document.getElementById(this.id);
    if (this.count == 1) {
        this.pinValue[0] = 1;
        l.style.backgroundImage = "url(./img/spulsedown.gif)";
        return true;
    }
    if (this.pinValue[0] == 1 ) {
        this.pinValue[0] = 0;
    } else {
        this.pinValue[0] = 0;
        l.style.backgroundImage = "url(./img/spulseup.gif)";
    }
    return true;
}

CompoSinglePulse.prototype.work = function () {
    if (this.count == 0) {  //如果是上电运行
        this.count = this.count + 1;
        return;
    }
    if (this.count < 3) {
        this.count = this.count + 1;
        this.timer=setTimeout("cDispatch.sourceTrigger('" + this.id + "')", cDispatch.pulseWidth);
    } else {
        this.timer = null;
        this.count = 1;
    }
}

CompoSinglePulse.prototype.reset = function () {
    this.pinValue = [0];
    this.count = 0;
    var c = document.getElementById(this.id);
    if (!(this.timer == null)) {
        clearTimeout(this.timer);
        this.timer = null;
    }
    c.style.backgroundImage = "url(./img/spulseup.gif)";
}
