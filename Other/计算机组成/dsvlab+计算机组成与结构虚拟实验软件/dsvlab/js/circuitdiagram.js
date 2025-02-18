function Circuit() {
    this.componentAll = [];  //已画出的实验器件列表(不包括已删除的）
    this.count = 0;   //器件计数，包括已删除的器件，用于生成器件id
    this.linecolor = "blue";
    this.alignx = false;
    this.aligny = false;
    var targetPin = null;  //拉连接线时的目标引脚
    var _this = this;

    $("#cpdlg").dialog({
                       autoOpen: false,
                       modal: true,
                       height: 300,
                       width: 300,
                       buttons: [
                           {
                               text: "OK",
                               click: function () {
                                   $(this).dialog("close");
                               }
                           }
                       ]
    });

    //在给定div（parentId）的指定位置（offsetX, offsetY）处画出实验器件（componentName）
    this.addComponent = function (parentId, componentName, offsetX, offsetY, componentId, comp_label) {
        var component = new window[componentName]();
        if (componentId == null) {
            component.id = "CP" + String(this.count);
        } else {
            component.id = componentId;
        }
        this.count = this.count + 1;
        _this.componentAll.push(component);
        var compDiv = document.createElement("div");
        compDiv.id = component.id;
        compDiv.className = "CPDiv";
        compDiv.style.position = "absolute";
        compDiv.style.left = offsetX + "px";
        compDiv.style.top = offsetY+ "px";
        compDiv.style.width = component.width + "px";
        compDiv.style.height = component.height + "px";
        compDiv.style.zIndex = 3000 + this.count;
        $("#" + parentId).append(compDiv);

        if (component.image != "") {
            compDiv.style.backgroundImage = "url(" + component.image + ")";
        }
        if (component.showBorder == true && component.showName == false) {
            compDiv.className = "window2";
        }
        if (component.showName) {
            var underDiv = document.createElement("div");
            underDiv.id = component.id + "UnderLayer";
            if (component.showBorder) {
                underDiv.className = "window";
            } else {
                underDiv.className = "windowInvisible";
            }
            underDiv.style.left = "0px";
            underDiv.style.top = "0px";
            underDiv.style.width = component.width + "px";
            underDiv.style.height = component.height + "px";
            underDiv.style.lineHeight = component.height + "px";
            underDiv.innerHTML = "<strong>" + component.name + "</strong>";
            if (comp_label != null) {
                underDiv.innerHTML = "<strong>" + comp_label + "</strong>";
            }
            $("#" + compDiv.id).append(underDiv);
        }

        //画出所有引脚
        var pinDiv, pn, pinFun;
        for (var i = 0; i < component.pinName.length; i++) {
            pinDiv = document.createElement("div");
            pinDiv.id = compDiv.id + "Pin" + i;
            pinDiv.className = "pin";
            pn=component.pinName[i];
            if (pn=="") {
                pinDiv.style.width = component.pinWidth + "px";
            } else {
                pinDiv.style.width = component.pinWidth + 2 + "px"; //让引脚间部分重叠，字好看些
            }
            pinDiv.style.height = component.pinHeight + "px";
            pinDiv.style.left = component.paddingLR + (component.width - component.paddingLR * 2) * component.pinPosition[i][0] + "px";
            if (component.pinPosition[i][1] == 1) {
                if (component.showBorder == true) {
                    pinDiv.style.top = component.height - component.pinHeight + "px";
                } else {
                    pinDiv.style.top = component.height - component.pinHeight-1 + "px";
                }
                if (pn != "" && component.showPinNo != false) pinDiv.innerHTML = pn + "<br>" + i;
                if (pn != "" && component.showPinNo == false) pinDiv.innerHTML = pn ;
            }
            if (component.pinPosition[i][1] == 0) {
                pinDiv.style.top = 0 + "px";
                if (pn != "" && component.showPinNo != false) pinDiv.innerHTML = i + "<br>" + pn;
                if (pn != "" && component.showPinNo == false) pinDiv.innerHTML = pn;
            }
            pinFun = component.pinFunction[i];
            if (pinFun == 10 || pinFun == 0) {   //如果是输入引脚
                pinDiv.style.color = "#003C9D";
                $(pinDiv).bind("mousedown", doNone);
                $(pinDiv).bind("mouseenter", function () { targetPin = this;});
                $(pinDiv).bind("mouseleave", function () { targetPin = null;});
            }
            if (pinFun == 1) {   //如果是输出引脚
                pinDiv.style.color = "green";
                $(pinDiv).bind("mousedown", lineDrag);
            }
            if (pinFun == 11) {   //如果是输入/输出引脚
                pinDiv.style.color = "#b200ff";
                $(pinDiv).bind("mouseenter", function () { targetPin = this; });
                $(pinDiv).bind("mouseleave", function () { targetPin = null; });
                $(pinDiv).bind("mousedown", lineDrag);
            }
            if (pinFun >= 2) {   //如果是其它引脚
                $(pinDiv).bind("mousedown", doNone);
            }

            pinDiv.onselectstart = function () { return false; };//不让div中的文字被选中

            $("#" + compDiv.id).append(pinDiv);
        }

        dragEnabled(compDiv.id);
        $(compDiv).bind("mousedown", deleteC);
        if(component.name=="Switch")
            $(compDiv).bind("mousedown", switchClick);
        if (component.name == "SinglePulse")
            $(compDiv).bind("mousedown", singlePulseClick);

        if (pn != "" && component.showPinNo != false)
            $(compDiv).bind("dblclick", showPinValue);
    }

    this.polylineCreate = function(paintDiv, fromX, fromY, toX, toY) {
        var line = document.createElementNS(g_svg_ns, "polyline");
        test_X = toX + 10;
        test_Y = toY + 10;
        var points = fromX + "," + fromY + " " + test_X + "," + test_Y;
        line.setAttribute("class", "polyline");
        line.setAttribute("points", points);
        line.setAttribute("stroke", _this.linecolor);
        line.setAttribute("stroke-width", "1");
        line.setAttribute("fill", "none");
        line.setAttribute("marker-end", "url(#arrowhead)");
        $("#canvas").append(line);
        $(line).bind("mousedown", deleteL);
        line.onmouseover = polylineOver;
        line.onmouseout = polylineOut;

        return line;
    }

    function removeElement(element) {
        var _parentElement = element.parentNode;
        if(_parentElement){
            _parentElement.removeChild(element);
        }
    }

    function polylineChange(polyline, fromX, fromY, toX, toY) {
        var p1X, p1Y, p2X, p2Y;
        if (Math.abs(fromX - toX) > Math.abs(fromY - toY)) {
            p1X = fromX + Math.round((toX - fromX) / 2);
            p1Y = fromY;
            p2X = fromX + Math.round((toX - fromX) / 2);
            p2Y = toY;
            if (fromX > toX) { toX = toX + 7 }
            else { toX = toX - 7 }
        } else {
            p1X = fromX;
            p1Y = fromY + Math.round((toY - fromY) / 2);
            p2X = toX;
            p2Y = fromY + Math.round((toY - fromY) / 2);
            if (fromY > toY) { toY = toY + 7 }
            else { toY = toY - 7 }
        }
        //line.path = "m " + fromX + "," + fromY + " l " + p1X + "," + p1Y + "," + p2X + "," + p2Y + "," + toX + "," + toY + " e";
        points = "" + fromX + "," + fromY + " " + p1X + "," + p1Y + " " + p2X + "," + p2Y + " " + toX + "," + toY;
        polyline.setAttribute("points", points);
    }

    //生成连接线时，鼠标到达目标引脚后，调整、定位连接线；拖动器件时，调整连接线
    this.lineAdjust = function (polyline, startPin, endPin) {
        var sX, sY, eX, eY;
        var st = startPin.offsetTop;
        var et = endPin.offsetTop;
        sX = startPin.parentNode.offsetLeft + startPin.offsetLeft + Math.round(startPin.offsetWidth / 2)-1;
        if (st < 2) sY = startPin.parentNode.offsetTop;
        else sY = startPin.parentNode.offsetTop + startPin.parentNode.offsetHeight;
        eX = endPin.parentNode.offsetLeft + endPin.offsetLeft + Math.round(endPin.offsetWidth / 2)-1;
        if (et < 2) eY = endPin.parentNode.offsetTop - 6;
        else eY = endPin.parentNode.offsetTop + endPin.parentNode.offsetHeight + 6;

        if (eY - sY > 10 && st > 1 && et < 2) {
            var p1X = sX;
            var p1Y = sY + Math.round((eY - sY) / 2);
            var p2X = eX;
            var p2Y = sY + Math.round((eY - sY) / 2);
            polyline.setAttribute("points", "" + sX + "," + sY + " " + p1X + "," + p1Y + " " + p2X + "," + p2Y + " " + eX + "," + eY)
        }
        if (eY - sY < 10 && st > 1 && et < 2) {
            var p1X = sX;
            var p1Y = sY + 30;
            var p2X = sX + Math.round((eX - sX) / 2);
            var p2Y = sY + 30;
            var p3X = p2X;
            var p3Y = eY - 30;
            var p4X = eX;
            var p4Y = eY - 30;
            polyline.setAttribute("points", ""+sX+","+sY+" "+p1X+","+p1Y+" "+p2X+","+p2Y+" "+p3X+","+p3Y+" "+p4X+","+p4Y+" "+eX+","+eY);
        }
        if (st > 1 && et >1) {
            var p1X = sX;
            if (eY > sY) {
                var p1Y = eY + 30;
                var p2Y = eY + 30;
            } else {
                var p1Y = sY + 30;
                var p2Y = sY + 30;
            }
            var p2X = eX;
            polyline.setAttribute("points", "" + sX + "," + sY + " " + p1X + "," + p1Y + " " + p2X + "," + p2Y + " " + eX + "," + eY);
        }
        if (st <2 && et <2) {
            var p1X = sX;
            if (eY > sY) {
                var p1Y = sY - 30;
                var p2Y = sY - 30;
            } else {
                var p1Y = eY - 30;
                var p2Y = eY - 30;
            }
            var p2X = eX;
            polyline.setAttribute("points", "" + sX + "," + sY + " " + p1X + "," + p1Y + " " + p2X + "," + p2Y + " " + eX + "," + eY);
        }
        if (sY - eY > 10 && st <2 && et>1) {
            var p1X = sX;
            var p1Y = sY - Math.round((sY -eY ) / 2);
            var p2X = eX;
            var p2Y = sY - Math.round((sY - eY) / 2);
            polyline.setAttribute("points", "" + sX + "," + sY + " " + p1X + "," + p1Y + " " + p2X + "," + p2Y + " " + eX + "," + eY);
        }
        if (sY - eY < 10 && st<2 && et >1) {
            var p1X = sX;
            var p1Y = sY - 30;
            var p2X = sX + Math.round((eX - sX) / 2);
            var p2Y = sY - 30;
            var p3X = p2X;
            var p3Y = eY + 30;
            var p4X = eX;
            var p4Y = eY + 30;
            polyline.setAttribute("points", "" + sX + "," + sY + " " + p1X + "," + p1Y + " " + p2X + "," + p2Y + " " + p3X + "," + p3Y + " " + p4X + "," + p4Y + " " + eX + "," + eY);
        }
    }

    //输出引脚的鼠标事件
    function lineDrag(a) {
        window.event.cancelBubble = true;  //禁止事件冒泡到下一层
        if (!a) a = window.event;
        var d = document;
        var sTop = Math.max(d.body.scrollTop, d.documentElement.scrollTop);
        var sLeft = Math.max(d.body.scrollLeft, d.documentElement.scrollLeft);
        var ox = a.clientX + sLeft, oy = a.clientY + sTop;
        var polyline = _this.polylineCreate("workspace", ox, oy, ox, oy);
        targetPin = null;
        var originPin = this;

        d.onmousemove = function (a) {
            if (!a) a = window.event;
            var sTop = Math.max(d.body.scrollTop, d.documentElement.scrollTop);
            var sLeft = Math.max(d.body.scrollLeft, d.documentElement.scrollLeft);
            if (targetPin == null) {  //鼠标还没到达目标点时
                polylineChange(polyline, ox, oy, a.clientX + sLeft, a.clientY + sTop);
            } else { //鼠标已进入目标引脚时
                _this.lineAdjust(polyline, originPin, targetPin);
            }
        }

        d.onmouseup = function () {
            if (targetPin == null) {//如果没有进入任何目标引脚                   待修改：还应该检查目标引脚是否已经被连接了
                removeElement(polyline);
            } else {
                _this.lineAdjust(polyline, originPin, targetPin);
                _this.addLineToComponent(polyline, originPin, targetPin);
            }
            d.onmousemove = null;
            d.onmouseup = null;

        }
    }

    //输入引脚和其它引脚的mousedown事件
    function doNone(a) {
        window.event.cancelBubble = true;  //禁止事件冒泡到下一层
    }

    //根据id从componentAll中找到匹配的器件
    this.findById=function(Id) {
        for (var i = 0 ; i < _this.componentAll.length; i++) {
            if (_this.componentAll[i].id == Id)
                return _this.componentAll[i];
        }
        return 0;
    }

    //根据id从componentAll中找到匹配的器件并删除
    function deleteById(Id) {
        for (var i = 0 ; i < _this.componentAll.length; i++) {
            if (_this.componentAll[i].id == Id) {
                _this.componentAll[i]=null;
                _this.componentAll.splice(i, 1);
                return 1;
            }
        }
        return 0;
    }

    //把连接线信息保存到器件对象中,设置line.id
    this.addLineToComponent = function (polyline, startPin, endPin) {
        var sPId, ePId, sCId, sPNo, eCId, ePNo, p;
        sPId = startPin.id;
        p= sPId.indexOf("Pin");
        sCId = sPId.substring(0, p);//获取起始引脚的器件ID
        sPNo = sPId.substring(p + 3);//获取起始引脚的编号
        ePId = endPin.id;
        p = ePId.indexOf("Pin");
        eCId = ePId.substring(0, p);
        ePNo = ePId.substring(p + 3);
        var sc = _this.findById(sCId);
        sc.connection[sPNo].push([polyline, startPin, endPin]);
        var ec = _this.findById(eCId);
        ec.connection[ePNo].push([polyline, startPin, endPin]);
        polyline.id = sPId + "To" + ePId
    }

    //拖动器件c时，更新其所有连接线
    this.lineReplace=function(c) {
        var comp = _this.findById(c.id);
        var i, j, l, s, e;
        for (i = 0; i < comp.connection.length; i++) {
            for (j = 0; j < comp.connection[i].length; j++) {
                pl = comp.connection[i][j][0];
                s = comp.connection[i][j][1];
                e = comp.connection[i][j][2];
                _this.lineAdjust(pl, s, e);
            }
        }
    }

    //删除连接线
    function lineDelete(line) {
        var lId, sPId, ePId, sCId, sPNo, eCId, ePNo, p,i;
        lId = line.id;
        p = lId.indexOf("To");
        sPId = lId.substring(0, p);
        ePId = lId.substring(p+2);
        p = sPId.indexOf("Pin");
        sCId = sPId.substring(0, p);//获取起始引脚的器件ID
        sPNo = sPId.substring(p + 3);//获取起始引脚的编号
        p = ePId.indexOf("Pin");
        eCId = ePId.substring(0, p);
        ePNo = ePId.substring(p + 3);
        var sc = _this.findById(sCId);
        for (i = 0; i < sc.connection[sPNo].length; i++) {
            if (sc.connection[sPNo][i][0] == line) {
                sc.connection[sPNo].splice(i, 1);
                break;
            }
        }
        var ec = _this.findById(eCId);
        for (i = 0; i < ec.connection[ePNo].length; i++) {
            if (ec.connection[ePNo][i][0] == line) {
                ec.connection[ePNo].splice(i, 1);
                break;
            }
        }
        removeElement(line);
    }

    function deletePolyline(polyline)
    {
        var lId, sPId, ePId, sCId, sPNo, eCId, ePNo, p,i;
        lId = polyline.id;
        p = lId.indexOf("To");
        sPId = lId.substring(0, p);
        ePId = lId.substring(p+2);
        p = sPId.indexOf("Pin");
        sCId = sPId.substring(0, p);//获取起始引脚的器件ID
        sPNo = sPId.substring(p + 3);//获取起始引脚的编号
        p = ePId.indexOf("Pin");
        eCId = ePId.substring(0, p);
        ePNo = ePId.substring(p + 3);
        var sc = _this.findById(sCId);
        for (i = 0; i < sc.connection[sPNo].length; i++) {
            if (sc.connection[sPNo][i][0] == polyline) {
                sc.connection[sPNo].splice(i, 1);
                break;
            }
        }
        var ec = _this.findById(eCId);
        for (i = 0; i < ec.connection[ePNo].length; i++) {
            if (ec.connection[ePNo][i][0] == polyline) {
                ec.connection[ePNo].splice(i, 1);
                break;
            }
        }
        removeElement(polyline);
    }

    //右击删除连接线的鼠标事件
    function deleteL(a) {
        if (!a) a = window.event;
        if (a.button == 2 && a.ctrlKey) {
            var r = confirm("是否要删除连接线？");
            if (r == true) {
                console.log(this.className.baseVal)
                if (this.className.baseVal == "line") {
                    lineDelete(this);
                } else if (this.className.baseVal == "polyline") {
                    deletePolyline(this);
                }
            }
        }
    }

    /*鼠标掠过连接线的事件*/
    function lineOver() {
        this.strokecolor = "red";
        this.strokeweight = 3;
    }
    function lineOut() {
        this.strokecolor = _this.linecolor;
        this.strokeweight = 1;
    }

    function polylineOver() {
        this.setAttribute("stroke", "red");
        this.setAttribute("stroke-width", "2");
    }

    function polylineOut() {
        this.setAttribute("stroke", _this.linecolor);
        this.setAttribute("stroke-width", "1");
    }

    //删除器件以及与器件相连的所有连接线
    function componentDelete(c) {
        var i, j;
        var comp = _this.findById(c.id);
        for (i = 0; i < comp.connection.length; i++) {
            for (j = 0; j < comp.connection[i].length; ) {
                deletePolyline(comp.connection[i][j][0])
            }
        }
        deleteById(c.id);
        removeElement(c);

    }

    //右击删除器件及其连接线的鼠标事件
    function deleteC(a) {
        if (!a) a = window.event;
        if (a.button == 2 && a.ctrlKey) {
            var r = confirm("是否要删除元器件及其连接线？");
            if (r == true) {
                componentDelete(this);
            }
        }
    }

    //双击器件显示所有引脚的值
    function showPinValue() {
        var comp = _this.findById(this.id);

        var cpinfo = document.getElementById("cpinfo");
        cpinfo.innerHTML = "";
        var underDiv = $("#" + comp.id + "UnderLayer").find("strong")
        console.log(underDiv.text());

        var nameLabel = document.createElement("label");
        nameLabel.innerHTML = "器件名称：";
        nameLabel.className = "CompLabel";
        nameLabel.id = "CompLabel" + "-" + comp.id;
        cpinfo.appendChild(nameLabel);

        var input = document.createElement("input");
        input.id = "labelinput";
        input.setAttribute("type", "text");
        input.setAttribute("value", underDiv.text());
        input.setAttribute("autofocus", "autofocus");
        input.setAttribute("onfocus", "this.select()");
        cpinfo.appendChild(input);

        var span = document.createElement("span")
        span.setAttribute("style", "display:inline-block; width: 5px;");
        cpinfo.appendChild(span);

        var labelButton = document.createElement("button");
        labelButton.innerHTML = "修改";
        labelButton.onclick = function () {
            underDiv.text(input.value);
        }
        cpinfo.appendChild(labelButton);
        cpinfo.appendChild(document.createElement("br"));

        var nameLabel = document.createElement("label");
        cpinfo.appendChild(nameLabel);
        cpinfo.appendChild(document.createElement("br"));

        var i, j, pl;
        for (i = 0; i < comp.connection.length; i++) {
            for (j = 0; j < comp.connection[i].length; j++) {
                pl = comp.connection[i][j][0];
                pl.setAttribute("stroke", "red");
                pl.setAttribute("stroke-width", "2");
            }
        }

        if (comp.pinValue.length != 0) {
            var pinTable = document.createElement("table")
            var caption = document.createElement("caption")
            caption.innerHTML = "引脚电平"
            pinTable.appendChild(caption);
            var len = comp.pinValue.length;
            var i;
            var rowRange = [[len - 1, (len / 2) - 1, -1], [0, len / 2, 1]]
            for (var j = 0; j < rowRange.length; j ++) {
                var rowPin = document.createElement("tr")
                var rowValue = document.createElement("tr")
                for (i = rowRange[j][0]; i != rowRange[j][1]; i = i + rowRange[j][2]) {
                    var th = document.createElement("th")
                    th.innerHTML = "" + i;
                    //th.innerHTML = comp.pinName[i];
                    rowPin.appendChild(th);
                    var td = document.createElement("td")
                    td.innerHTML = comp.pinValue[i] + "" ;
                    if (comp.pinValue[i] == 0) {
                        td.setAttribute("bgcolor", "#FFFACD")
                    } else if (comp.pinValue[i] == 1) {
                        td.setAttribute("bgcolor", "#FFD700")
                    } else if (comp.pinValue[i] == 2) {
                        td.setAttribute("bgcolor", "#808080")
                        td.innerHTML = "X" ;
                    } else {
                    }
                    rowValue.appendChild(td);
                }
                pinTable.appendChild(rowPin);
                pinTable.appendChild(rowValue);
            }
            var pininfo = document.createElement("div")
            pininfo.appendChild(pinTable);
            cpinfo.appendChild(pininfo);
        }

        $("#cpdlg").dialog("open");

    }

    /*开关的鼠标单击事件*/
    function switchClick(a) {
        var moveFlag = false;
        var d = document;
        var me = this;

        $(this).bind("mousemove",mm);
        $(this).bind("mouseup", mup);

        function mm() {
            moveFlag = true;
        }

        function mup() {
            if (!moveFlag) {
                var imgSrc = me.style.backgroundImage;
                var c = _this.findById(me.id);
                if (imgSrc == "url(\"./img/switchL.gif\")" || imgSrc=="url(./img/switchL.gif)") {
                    me.style.backgroundImage = "url(./img/switchH.gif)";
                }
                if (imgSrc == "url(\"./img/switchH.gif\")" || imgSrc=="url(./img/switchH.gif)") {
                    me.style.backgroundImage = "url(./img/switchL.gif)";
                }
                if (cDispatch.runState == 1) {
                    cDispatch.sourceTrigger(c);
                } else {
                    c.input();
                }
            }

            $(me).unbind("mousemove", mm);
            $(me).unbind("mouseup", mup);
        }
    }

    /*单脉冲器件的鼠标单击事件*/
    function singlePulseClick(a) {
        var moveFlag = false;
        var d = document;
        var me = this;

        $(this).bind("mousemove", mm);
        $(this).bind("mouseup", mup);

        function mm() {
            moveFlag = true;
        }

        function mup() {
            if (!moveFlag) {
                var c = _this.findById(me.id);
                if (cDispatch.runState == 1 && c.timer==null) {
                    cDispatch.sourceTrigger(c);
                }
            }

            $(me).unbind("mousemove", mm);
            $(me).unbind("mouseup", mup);
        }
    }

    this.linecolorchange = function (c) {
        var x = document.getElementsByClassName("polyline");
        for (var i = 0; i < x.length; i++) {
            //x[i].strokecolor =c;
            x[i].setAttribute("stroke", c);
        }
        var x = document.getElementById("arrowhead");
        x.setAttribute("stroke", c)
        x.setAttribute("fill", c)
    }

    this.deletecircuit = function () {
        var c;
        if ($("#power").attr("src") == "./img/poweron.png") {
            $("#power").attr("src", "./img/poweroff.png");
            cDispatch.powerOff();
        }

        for (var i = 0; _this.componentAll.length>0 ; i) {
            c = document.getElementById(_this.componentAll[i].id);
            componentDelete(c);
        }

        this.count = 0;   //器件计数，包括已删除的器件，用于生成器件id
        var targetPin = null;  //拉连接线时的目标引脚
    }
}

function init_cpdlg() {
    $("#cpdlg").on("dialogclose", function(event, ui) {
        var compLabel = document.querySelector(".CompLabel");
        comp_id = compLabel.id.split("-")[1];
        console.log("comp_id=" + comp_id);
        comp = mycircuit.findById(comp_id);
        var i, j, pl;
        for (i = 0; i < comp.connection.length; i++) {
            for (j = 0; j < comp.connection[i].length; j++) {
                pl = comp.connection[i][j][0];
                pl.setAttribute("stroke", mycircuit.linecolor);
                pl.setAttribute("stroke-width", "1");
            }
        }
    });
}
