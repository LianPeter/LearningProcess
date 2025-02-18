//按照字符串恢复电路图
function str2Circuit(string) {
    var testContent = document.querySelector("#testcontent");
    testContent.innerHTML = "";
    var parts = string.split("\n\n");
    if (parts.length != 4) {
        return false;
    } else {
        var meta_str = parts[0];
        var meta_infos = meta_str.split(",")
        var filetype = meta_infos[0].split("=")[1]
        var version = meta_infos[1].split("=")[1]
        console.log("filetype=" + filetype + "," + "version=" + version);

        var comp_list = parts[1].split("\n");
        for (var i = 0; i < comp_list.length; i++) {
            comp_info = comp_list[i].split(",");
            var comp_type = comp_info[0];
            var comp_x = Number(comp_info[1].slice(0,-2));
            var comp_y = Number(comp_info[2].slice(0,-2));
            var comp_id = comp_info[3];
            var comp_label = comp_type;
            if (comp_info.length > 4) {
                var comp_label = comp_info.slice(4).join(",");
            }
            mycircuit.addComponent("workspace", "Compo" + comp_type, comp_x, comp_y, comp_id, comp_label);
        }

        var line_list = parts[2].split("\n");
        for (var i = 0; i < line_list.length; i++) {
            var line_name = line_list[i];
            var pin_ids = line_name.split("To");
            var pid_start = pin_ids[0];
            var pid_end = pin_ids[1];
            var pin_start = document.getElementById(pid_start);
            var pin_end = document.getElementById(pid_end);
            var line = mycircuit.polylineCreate("workspace", 0, 0, 10, 10);
            pin_start.focus();
            pin_end.focus();
            mycircuit.lineAdjust(line, pin_start, pin_end);
            mycircuit.addLineToComponent(line, pin_start, pin_end);
        }
        var count_str = parts[3];
        mycircuit.count = Number(count_str);
    }
    return true;
}

function str2CircuitOrig(parentId,circuit,s) {
    mycircuit.deletecircuit();
    var comp, strline, count, p1,p2, n,x,y,id,lid,line,sPid,ePid,sPin,ePin;
    p1 = s.indexOf("&");
    comp = s.substring(0, p1);
    p2 = s.indexOf("@");
    strline = s.substring(p1 + 1, p2);
    count = Number(s.substring(p2 + 1));
    while (!(comp.length == 0)) { //绘制器件
        p1 = comp.indexOf(",");
        n = comp.substring(0, p1);
        comp = comp.substring(p1 + 1);

        p1 = comp.indexOf(",");
        x = comp.substring(0, p1);
        comp = comp.substring(p1 + 1);

        p1 = comp.indexOf(",");
        y = comp.substring(0, p1);
        comp = comp.substring(p1 + 1);

        p1 = comp.indexOf("$");
        id = comp.substring(0, p1);
        comp = comp.substring(p1 + 1);
        p1 = x.indexOf("px");
        x=x.substring(0,p1);
        p1 = y.indexOf("px");
        y = Number(y.substring(0, p1));
        circuit.addComponent(parentId, "Compo" + n, x, y,id);
    }

    while (!(strline.length == 0)) {//绘制连接线
        p1 = strline.indexOf(",");
        lid = strline.substring(0, p1);
        strline = strline.substring(p1 + 1);
        p1 = lid.indexOf("To");
        sPid = lid.substring(0, p1);
        ePid = lid.substring(p1 + 2);
        sPin = document.getElementById(sPid);
        ePin = document.getElementById(ePid);
        line = circuit.polylineCreate(parentId, 0, 0, 10, 10);
        sPin.focus();
        ePin.focus();
        circuit.lineAdjust(line, sPin, ePin);
        circuit.addLineToComponent(line, sPin, ePin);
    }

    circuit.count = count;//设置电路的count值
    return true;
}

function recovercircuit(parentId,circuit,s) {
    return str2Circuit(s) || str2CircuitOrig(parentId, circuit, s);
}

function displayFileText(evt) {
    mycircuit.deletecircuit();
    var fileString = evt.target.result; // Obtain the file contents, which was read into memory.
    if (recovercircuit('workspace', mycircuit, fileString)) {
        tips("文件成功打开");
        $("#fileSelector").val("");
    } else {
        tips("不是有效的文件格式");
    }
}

function startFileRead(fileObject) {
    var reader = new FileReader();

    reader.onloadend = displayFileText;

    if (fileObject) {
        reader.readAsText(fileObject);
    }

}

function handleFileSelection(evt) {
    var files = evt.target.files;

    if (!files) {
        tips("未选择文件");
        return;
    }

    var file = files[0];
    if (!file) {
        tips("无法读取文件 " + file.name);
        return;
    }
    if (file.size == 0) {
        tips("跳过空文件 " + file.name.toUpperCase());
        return;
    }
    if (!file.type.match('text/.*')) {
        tips("跳过非文本文件 " + file.name.toUpperCase());
        return;
    }

    startFileRead(file);
}

var filename = "circuit.txt";
var filecontent = "";

//把电路数据保存到一个字符串中
function circuitdata(circuit) {
    var cAll = circuit.componentAll;
    var comp= "",line="";
    var c,d,x,y,i,j,k,lId,p,sCId;
    for (i = 0; i < cAll.length; i++) {
        c = cAll[i];
        d = document.getElementById(c.id);
        x = String(d.style.left);
        y = String(d.style.top);
        comp = comp + c.name + "," + x + "," + y + "," + c.id + "$";
        for (j = 0; j < c.connection.length; j++) {
            if (c.pinFunction[j] == 1 || c.pinFunction[j] == 11) {
                for (k = 0; k < c.connection[j].length; k++) {
                    lId = c.connection[j][k][0].id;
                    p = lId.indexOf("Pin");
                    sCId = lId.substring(0, p);//获取起点器件的ID
                    if (sCId == c.id) {//如果是输出连线
                        line = line + lId + ",";
                    }
                }
            }
        }
    }
    return comp + "&" + line + "@" + String(circuit.count);
}

function circuit2Str() {
    var comps = mycircuit.componentAll;
    var comp_strs = [];
    var line_strs = [];
    var c,d,x,y,i,j,k,lId,p,sCId;
    for (i = 0; i < comps.length; i++) {
        c = comps[i];
        d = document.getElementById(c.id);
        var underDiv = $("#" + c.id).find("strong");
        var comp_label = underDiv.text();
        x = String(d.style.left);
        y = String(d.style.top);
        comp_strs.push([c.name, x, y, c.id, comp_label].join(","));
        for (j = 0; j < c.connection.length; j++) {
            if (c.pinFunction[j] == 1 || c.pinFunction[j] == 11) {
                for (k = 0; k < c.connection[j].length; k++) {
                    lId = c.connection[j][k][0].id;
                    p = lId.indexOf("Pin");
                    sCId = lId.substring(0, p);//获取起点器件的ID
                    if (sCId == c.id) {//如果是输出连线
                        line_strs.push(lId);
                    }
                }
            }
        }
    }
    var format_info = "filetype=circuit,version=v2"
    return [format_info, comp_strs.join("\n"), line_strs.join("\n"), String(mycircuit.count)].join("\n\n")
}

$(function () {
    $("#opener").click(function () {
        $("#fileSelector").trigger("click");
    });
    $("#newfile").click(function () {
        // window.location.reload();
        mycircuit.deletecircuit();
    });

    $("#download").click(function (evt) {
        if (window.navigator.msSaveOrOpenBlob) {
            filecontent = circuit2Str(mycircuit);
            var bb = new Blob([filecontent], {type: 'text/plain'});
            window.navigator.msSaveOrOpenBlob(bb, "circuit.txt");
        } else {
            $("#writedlg").dialog("open");
        }
    });

    document.getElementById('fileSelector').addEventListener('change', handleFileSelection, false);

    $("#writedlg").dialog({
                          autoOpen: false,
                          modal: true,
                          height: 200,
                          width: 300,
                          buttons: [
                              {
                                  text: "close",
                                  click: function () {
                                      $(this).dialog("close");
                                  }
                              },
                          ]
    });

    $("#writedlg").on("dialogopen", function(event, ui) {
        var filecontent = circuit2Str(mycircuit);
        var bb = new Blob([filecontent], {type: 'text/plain'});
        var a = document.querySelector('#downloadanchor');
        a.href = window.URL.createObjectURL(bb);
    });

    $("#writedlg").on("dialogclose", function(event, ui) {
        var a = document.getElementById("downloadanchor");
        window.URL.revokeObjectURL(a.href);
    });
});
