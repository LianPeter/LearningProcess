function Dispatch(Circuit) {
    var cAll = Circuit.componentAll;
    var workQueue = [];  //已达到运行条件、等待运行的器件队列
    var _this = this;
    this.runState = 0;  //0:电源关  1：电源开正在运行  2：电源开暂停运行
    this.pulseWidth = 800;//脉冲宽度

    /*将满足运行条件的器件入队*/
    this.initQueue = function () {
        for (var i = 0; i < cAll.length; i++) {
            if (cAll[i].beReady()) {              //注意：此处的beReady函数只是必要条件，不是充要条件，只可用于初始化
                workQueue.push(cAll[i]);
            }
        }
    }

    /*在队列中查找器件,找不到返回-1*/
    function find(c) {
        for (var i = 0; i < workQueue.length; i++) {
            if (workQueue[i] == c)
                return i;
        }
        return -1;
    }

    /*运行一个器件，按照得到的输出修改与其相连的所有器件的输入引脚值，并将其中达到运行条件的器件入队*/
    function cRun(c) {
        var i, j, lId, p, sCId, eCId, ePNo, eC, r;
        c.work();
        for (i = 0; i < c.pinFunction.length; i++) {
            if (c.pinFunction[i] == 1 || c.pinFunction[i] == 11) {
                for (j = 0; j < c.connection[i].length; j++) {
                    lId = c.connection[i][j][0].id;
                    p = lId.indexOf("Pin");
                    sCId = lId.substring(0, p);//获取起点器件的ID

                    if (sCId == c.id) {//如果是输出连线
                        p = lId.indexOf("To");
                        ePId = lId.substring(p + 2);
                        p = ePId.indexOf("Pin");
                        eCId = ePId.substring(0, p);//获取终点器件的ID

                        ePNo = ePId.substring(p + 3);//获取相连输入引脚的编号
                        eC = Circuit.findById(eCId);
                        r = eC.input(ePNo, c.pinValue[i]);
                        if (r && find(eC) == -1) workQueue.push(eC);
                    }
                }
            }
        }
    }

    /*依次运行队列中的所有器件*/
    this.runCircuit = function () {
        var c;
        while (workQueue.length > 0) {
            c = workQueue.shift();
            cRun(c);
        }
    }

    /*源器件触发事件处理*/
    this.sourceTrigger = function (c) {
        if (typeof c == "string") c = Circuit.findById(c);
        c.input();
        workQueue.push(c);
        _this.runCircuit();
    }

    this.powerOn = function () {
        this.runState = 1;
        this.initQueue();
        this.runCircuit();
    }

    this.powerOff = function () {
        this.runState = 0;
        for (var i = 0; i < cAll.length; i++) {
            cAll[i].reset();
        }
        this.workQueue = [];
    }
}
