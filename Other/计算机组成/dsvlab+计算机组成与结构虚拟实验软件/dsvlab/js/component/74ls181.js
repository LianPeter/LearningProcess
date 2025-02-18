function Compo74LS181() {
    this.id;    //此器件div的id与此id相同
    this.type = "i";  //source:数据源器件   intermediate:中间器件   destination:目的器件
    this.name = "74LS181";
    this.width = 190;
    this.height = 55;
    this.image = "";
    this.paddingLR = 5;    //paddingLR：芯片左右边距
    this.pinName = new Array("A3", "A2", "A1", "A0", "B3", "B2", "B1", "B0", "S3", "S2", "S1", "GND", "S0", "F0", "F1", "F2","F3", "A=B", "P", "Cn+4", "G", "CN", "M", "VCC");
    this.pinWidth = (this.width - this.paddingLR * 2) / 12;    //引脚宽度不应小于16
    this.pinHeight = 19;
    this.showName = true; //是否在芯片上显示芯片名称
    this.showBorder = true;//是否显示外框

    //i:引脚间距    [x,y]：除掉边距之外，以芯片左上角为[0,0]、右下角为[1,1]的相对坐标
    var i = 1/12;
    this.pinPosition = new Array([i * 0, 1],[i * 1, 1], [i * 2, 1], [i * 3, 1], [i * 4, 1], [i * 5, 1], [i * 6, 1], [i * 7, 1], [i * 8, 1], [i * 9, 1], [i * 10, 1],
                       [i * 11, 1], [i * 11, 0], [i * 10, 0], [i * 9, 0], [i * 8, 0], [i * 7, 0], [i * 6, 0], [i * 5, 0],
                       [i * 4, 0], [i * 3, 0], [i * 2, 0], [i * 1, 0],  [i * 0, 0]);

    //引脚类型  0：输入  10:必要输入  1：输出  2：地  3：电源
    this.pinFunction = new Array(10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 2, 10, 1, 1, 1, 1, 1, 1, 1, 1, 10, 10, 3);

    this.pinValue = new Array(2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);

    //引脚与其它引脚的连接线对象
    this.connection = new Array([], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []);
}

//判断目前芯片是否已达到运算条件(是否所有的必要输入都已经有输入值)
Compo74LS181.prototype.beReady = function () {
    for (var i = 0; i < this.pinFunction.length; i++) {
        if (this.pinFunction[i] == 10 && this.pinValue[i] == 2) {
            return false;
        }
    }
    return true;
}

//设置输入引脚的值，并且判断目前芯片是否已达到运算条件
Compo74LS181.prototype.input = function (pinNo, value) {
    if (value == this.pinValue[pinNo]) return false; //如果输入的值没有变化，则无需重新计算
    this.pinValue[pinNo] = Number(value);
    return this.beReady();
}


Compo74LS181.prototype.work = function () {
    var x0, x1, x2, x3, y0, y1, y2, y3, c0, c1, c2, c3;
    x0 = Number(!((this.pinValue[8] & this.pinValue[7] & this.pinValue[3]) | (this.pinValue[9] & !(this.pinValue[7]) & this.pinValue[3])));
    x1 = Number(!((this.pinValue[8] & this.pinValue[6] & this.pinValue[2]) | (this.pinValue[9] & !(this.pinValue[6]) & this.pinValue[2])));
    x2 = Number(!((this.pinValue[8] & this.pinValue[5] & this.pinValue[1]) | (this.pinValue[9] & !(this.pinValue[5]) & this.pinValue[1])));
    x3 = Number(!((this.pinValue[8] & this.pinValue[4] & this.pinValue[0]) | (this.pinValue[9] & !(this.pinValue[4]) & this.pinValue[0])));
    y0 = Number(!(this.pinValue[3] | (this.pinValue[7] & this.pinValue[12]) | (this.pinValue[10] & (!this.pinValue[7]))));
    y1 = Number(!(this.pinValue[2] | (this.pinValue[6] & this.pinValue[12]) | (this.pinValue[10] & (!this.pinValue[6]))));
    y2 = Number(!(this.pinValue[1] | (this.pinValue[5] & this.pinValue[12]) | (this.pinValue[10] & (!this.pinValue[5]))));
    y3 = Number(!(this.pinValue[0] | (this.pinValue[4] & this.pinValue[12]) | (this.pinValue[10] & (!this.pinValue[4]))));
    c0 = Number(!(this.pinValue[21] & (!this.pinValue[22])));
    c1 = Number(!((x0 & this.pinValue[21] | y0) & !(this.pinValue[22])));
    c2 = Number(!((!this.pinValue[22]) & (y1 | (y0 & x1) | (x0 & x1 & this.pinValue[21]))));
    c3 = Number(!((!this.pinValue[22]) & (y2 | (y1 & x2) | (y0 & x1 & x2) | (x0 & x1 & x2 & this.pinValue[21]))));

    this.pinValue[13] = Number((c0 ^ x0 ^ y0));
    this.pinValue[14] = Number((c1 ^ x1 ^ y1));
    this.pinValue[15] = Number((c2 ^ x2 ^ y2));
    this.pinValue[16] = Number((c3 ^ x3 ^ y3));
    this.pinValue[18] = Number(!(x0 & x1 & x2 & x3));
    this.pinValue[20] = Number(!(y3 | (y2 & x3) | (y1 & x2 & x3) | (y0 & x1 & x2 & x3)));
    this.pinValue[19] = Number(!(this.pinValue[20] & ((!this.pinValue[21]) | this.pinValue[18])));
    this.pinValue[17] = Number(this.pinValue[13] & this.pinValue[14] & this.pinValue[15] & this.pinValue[16]);

}

Compo74LS181.prototype.reset = function () {
    this.pinValue =[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
}
