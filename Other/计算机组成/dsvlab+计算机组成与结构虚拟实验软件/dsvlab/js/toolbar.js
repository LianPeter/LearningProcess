function toolbarInit() {
    $("#toolbox").css("visibility", "visible");
    $("#tools").bind("click", function () {
        var $content = $("#toolbox");
        var visiAttr = $content.css("visibility");
        if (visiAttr == "visible") {
            $content.css("visibility", "hidden");
        } else {
            $content.css("visibility", "visible");
        }
    });

    $("#open").click(function () {
        $("#fileSelector").trigger("click");
    });

    $(".toolbutton").tooltip();

    $("#save").click(function () {
        if (window.navigator.msSaveOrOpenBlob) {
            filecontent = circuit2Str(mycircuit);
            var bb = new Blob([filecontent], {type: 'text/plain'});
            window.navigator.msSaveOrOpenBlob(bb, "circuit.txt");
        } else {
            $("#writedlg").dialog("open");
        }
    });

    $("#power").bind("click", function () {
        var imgSrc = $(this).attr("src");
        if (imgSrc == "./img/poweroff.png") {
            $(this).attr("src", "./img/poweron.png");
            cDispatch.powerOn();
        }
        if (imgSrc == "./img/poweron.png") {
            $(this).attr("src", "./img/poweroff.png");
            cDispatch.powerOff();
        }
    });

    $("#reset").bind("mousedown", function () {
        if ($("#power").attr("src") == "./img/poweron.png") {
            $(this).attr("src", "./img/resetdown.png");
        }
    });
    $("#reset").bind("mouseup", function () {
        if ($("#power").attr("src") == "./img/poweron.png") {
            $(this).attr("src", "./img/reset.png");
            cDispatch.powerOff();
            cDispatch.powerOn();
        }
    });

    $("#new").bind("click", function () {
        //window.location.reload();
        mycircuit.deletecircuit();
    });

    function checkBackground() {
        if (mycircuit.alignx || mycircuit.aligny) {
            $("#gridbg").attr("fill", "url(#grid)");
        } else {
            $("#gridbg").attr("fill", "none");
        }
    }

    $("#gridbg").attr("fill", "none");

    $("#aligny").bind("click", function () {
        var imgSrc = $(this).attr("src");
        if (imgSrc == "./img/align_horizontal.png") {
            $(this).attr("src", "./img/align_horizontal_down.png");
            mycircuit.aligny = true
        } else {
            $(this).attr("src", "./img/align_horizontal.png");
            mycircuit.aligny = false
        }
        checkBackground();
    });

    $("#alignx").bind("click", function () {
        var imgSrc = $(this).attr("src");
        if (imgSrc == "./img/align_vertical.png") {
            $(this).attr("src", "./img/align_vertical_down.png");
            mycircuit.alignx = true
        } else {
            $(this).attr("src", "./img/align_vertical.png");
            mycircuit.alignx = false
        }
        checkBackground();
    });

    function adjustLines()
    {
        var lines = document.getElementsByClassName("polyline");
        for (var i = 0; i < lines.length; i++) {
            var lid = lines[i].id;
            var p1 = lid.indexOf("To");
            var sPid = lid.substring(0, p1);
            var ePid = lid.substring(p1 + 2);
            var sPin = document.getElementById(sPid);
            var ePin = document.getElementById(ePid);
            mycircuit.lineAdjust(lines[i], sPin, ePin);
        }
    }

    $("#moveleft").bind("click", function () {
        var divs = document.getElementsByClassName("CPDiv");
        for (var i = 0; i < divs.length; i++) {
            var x = parseInt(divs[i].style.left);
            x = x - 20;
            divs[i].style.left = x + "px";
        }
        var divs = document.getElementsByClassName("window2");
        for (var i = 0; i < divs.length; i++) {
            var x = parseInt(divs[i].style.left);
            x = x - 20;
            divs[i].style.left = x + "px";
        }
        adjustLines();
    });

    $("#moveright").bind("click", function () {
        var divs = document.getElementsByClassName("CPDiv");
        for (var i = 0; i < divs.length; i++) {
            var x = parseInt(divs[i].style.left);
            x = x + 20;
            divs[i].style.left = x + "px";
        }
        var divs = document.getElementsByClassName("window2");
        for (var i = 0; i < divs.length; i++) {
            var x = parseInt(divs[i].style.left);
            x = x + 20;
            divs[i].style.left = x + "px";
        }
        adjustLines();
    });

    $("#moveup").bind("click", function () {
        var divs = document.getElementsByClassName("CPDiv");
        for (var i = 0; i < divs.length; i++) {
            var y = parseInt(divs[i].style.top);
            y = y - 20;
            divs[i].style.top = y + "px";
        }
        var divs = document.getElementsByClassName("window2");
        for (var i = 0; i < divs.length; i++) {
            var y = parseInt(divs[i].style.top);
            y = y - 20;
            divs[i].style.top = y + "px";
        }
        adjustLines();
    });

    $("#movedown").bind("click", function () {
        var divs = document.getElementsByClassName("CPDiv");
        for (var i = 0; i < divs.length; i++) {
            var y = parseInt(divs[i].style.top);
            y = y + 20;
            divs[i].style.top = y + "px";
        }
        var divs = document.getElementsByClassName("window2");
        for (var i = 0; i < divs.length; i++) {
            var y = parseInt(divs[i].style.top);
            y = y + 20;
            divs[i].style.top = y + "px";
        }
        adjustLines();
    });

    //当鼠标移动到按钮上时，按钮外框变绿色，移开时变白色。
    $(".toolbutton").mouseenter(function () {
        $(this).css("border-color", "#646464");
    });
    $(".toolbutton").mouseleave(function () {
        $(this).css("border-color", "#DDDDDD");
    });
}
