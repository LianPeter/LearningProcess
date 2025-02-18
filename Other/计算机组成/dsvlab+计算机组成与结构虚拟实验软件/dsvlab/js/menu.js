function menuInit () {
    navHover = function () {
        var lis = document.getElementById("navmenu").getElementsByTagName("LI");
        for (var i = 0; i < lis.length; i++) {
            lis[i].onmouseover = function () {
                this.className += " iehover";
            }
            lis[i].onmouseout = function () {
                this.className = this.className.replace(new RegExp(" iehover\\b"), "");
            }
        }
    }
    if (window.attachEvent) window.attachEvent("onload", navHover);
}

$(function () {
    $("#poweron").click(function () {
        if ($("#power").attr("src") == "./img/poweroff.png") {
            $("#power").attr("src", "./img/poweron.png");
            cDispatch.powerOn();
        }
    });
    $("#poweroff").click(function () {
        if ($("#power").attr("src") == "./img/poweron.png") {
            $("#power").attr("src", "./img/poweroff.png");
            cDispatch.powerOff();
        }
    });
    $("#powerreset").click(function () {
        if ($("#power").attr("src") == "./img/poweron.png") {
            cDispatch.powerOff();
            cDispatch.powerOn();
        }
    });

    $("#clockcycle").click(function () {
        $("#clockdlg")
            .dialog({
                    modal: true,
                    height: 220,
                    width: 300,
                    buttons: [
                        {
                            text: "OK",
                            click: function () {
                                cDispatch.pulseWidth = $("#clocksld").slider("value");
                                $(this).dialog("close");
                            }
                        }
                    ]
            });

        var c = cDispatch.pulseWidth;
        $("#clocksld").slider({
                              range: "min",
                              value: c,
                              min: 100,
                              max: 800,
                              slide: function (event, ui) {
                                  $("#amount").val("$" + ui.value);
                              }
        });

    });

    $("#aboutdlg")
        .dialog({
                autoOpen: false,
                modal: true,
                height: 450,
                width: 460,
    });

    $("#about").click(function () {
        $( "#aboutdlg" ).dialog( "open" );
    });

    var g_lcolor;
    var g_flag = 0;

    $("#colordlg")
        .dialog({
                autoOpen: false,
                modal: true,
                height: 390,
                width: 500,
                open: function(event, ui) {
                    ColorPicker(
                        document.getElementById('colorpicker-prefix'),
                        function (hex, hsv, rgb) {
                            var element = document.getElementById("colorpicker");
                            element.style.borderColor = hex;   // #HEX
                            g_lcolor = hex;
                            g_flag = 1;
                        });

                },
                buttons: [
                    {
                        text: "OK",
                        click: function () {
                            if (g_flag == 1) {
                                mycircuit.linecolor = g_lcolor;
                                mycircuit.linecolorchange(g_lcolor);
                                g_flag = 0;
                            }
                            $(this).dialog("close");
                        }
                    },
                    {
                        text: "cancel",
                        click: function () {
                            $(this).dialog("close");
                        }
                    }
                ]
        });
    $("#colorpickermenu").click(function () {
        $("#colordlg").dialog("open");
    });

    function memset() {
        var sel_list = document.getElementById("Select1");
        var texta = document.getElementById("TextArea1");
        var cAll = mycircuit.componentAll;
        var text = texta.value;
        var c,i,m,n;
        for (i = 0 ; i < cAll.length; i++) {
            c = cAll[i];
            var j = 0;
            if (c.id == sel_list.value) {
                for (m = 0; m < c.memory.length; m++) {
                    for (n = c.memory[m].length - 1; n >= 0; n--) {
                        if (j > text.length - 1) {
                            c.memory[m][n] = 0;
                        } else {
                            if (!(text[j] == "0" || text[j] == "1")) {
                                tips("write error! (" + m + "," + n + ")");
                                return;
                            }
                            c.memory[m][n] = Number(text[j]);
                        }
                        j=j+1;
                    }
                    j=j+1;
                }
                tips('write ok!');
                return;
            }
        }
    }

    function memshow() {
        var sel_list = document.getElementById("Select1");
        var texta = document.getElementById("TextArea1");
        var cAll = mycircuit.componentAll;
        var text="";
        var c,i,m,n;
        for (i = 0 ; i < cAll.length; i++) {
            c=cAll[i];
            if (c.id ==sel_list.value) {
                for (m = 0; m < c.memory.length; m++) {
                    for (n=c.memory[m].length-1; n >=0 ; n--) {
                        text = text + String(c.memory[m][n]);
                    }
                    text = text + "\n";
                }
                texta.value = text;
                return;
            }
        }
    }

    $("#memsetdlg")
        .dialog({
                autoOpen: false,
                modal: true,
                height: 500,
                width: 300,
                buttons: [
                    {
                        text: "write",
                        click: function () {
                            memset();
                        }
                    },
                    {
                        text: "close",
                        click: function () {
                            $(this).dialog("close");
                        }
                    },
                ]
    });
    $("#memsetmenu").click(function() {
        $("#memsetdlg").dialog("open");
    });

    $("#memsetdlg").on("dialogopen", function(event, ui) {
        var sel_num = 3;
        var cAll = mycircuit.componentAll;
        var sel_list = document.getElementById("Select1");
        sel_list.innerHTML = "<option>请选择要读写的芯片</option>"
        document.getElementById("TextArea1").value = ""
        for (var i = 0; i < cAll.length; i++) {
            if (cAll[i].name == "RAM6116" || cAll[i].name == "EPROM2716C3" || cAll[i].name == "EPROM2716C4") {
                var option = window.document.createElement("option");
                sel_list.appendChild(option);
                option.text = cAll[i].name +" "+ cAll[i].id;
                option.value = cAll[i].id;
            }
        }
    });

    var selector = document.getElementById("Select1")
    selector.onchange = memshow;

    function testReadFile(fileObject) {
        var reader = new FileReader();

        reader.onloadend = function (evt) {
            mycircuit.deletecircuit();
            var fileContent = evt.target.result;
            str2Circuit(fileContent);
            $("#testfile").val("");
        }

        if (fileObject) {
            reader.readAsText(fileObject);
        }

    }

    function testFileSelection(evt) {
        var files = evt.target.files;

        if (!files) {
            tips("未选择任何文件");
            return;
        }

        var file = files[0];
        if (!file) {
            tips("文件无法打开 " + file.name);
            return;
        } else if (file.size == 0) {
            tips("跳过空文件" + file.name.toUpperCase());
            return;
        } else if (!file.type.match('text/.*')) {
            tips("跳过文件" + file.name.toUpperCase() + "不是文本文件");
            return;
        }

        testReadFile(file);
    }

    $("#testdlg")
        .dialog({
                autoOpen: false,
                modal: true,
                height: 600,
                width: 800,
                buttons: [
                    { text: "close", click: function() {$(this).dialog("close"); } }
                ]
    });
    var testContent = document.querySelector("#testcontent");
    testContent.innerHTML = "测试文本"
    document.getElementById('testfile').addEventListener('change', testFileSelection, false);
});
