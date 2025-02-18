//此函数使对象能够被拖动  o:对象ID  s:是否随屏幕滚动而移动
function dragEnabled(o, s) {
    if (typeof o == "string")
        o = document.getElementById(o);
    o.orig_x = parseInt(o.style.left) - document.documentElement.scrollLeft;
    o.orig_y = parseInt(o.style.top) - document.documentElement.scrollTop;
    o.orig_index = o.style.zIndex;


    o.onmousedown = function (a) {
        if (!a) a = window.event;
        if (a.button == 0) {    //如果单击的左键
            this.style.zIndex = 10000;
            var d = document;
            // 鼠标在器件中的位置
            var x = a.clientX + d.documentElement.scrollLeft - o.offsetLeft;
            var y = a.clientY + d.documentElement.scrollTop - o.offsetTop;

            if (o.setCapture)
                o.setCapture();
            else if (window.captureEvents)
                window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);

            var orig_x = parseInt(o.style.left);
            var orig_y = parseInt(o.style.top);

            d.onmousemove = function (a) {
                if (!a) a = window.event;
                var gridSize = 10
                var left_corner = a.clientX + d.documentElement.scrollLeft - x;
                var left_aligned = gridSize * Math.round(left_corner/gridSize);

                var top_corner = a.clientY + d.documentElement.scrollTop - y;
                var top_aligned = gridSize * Math.round(top_corner/gridSize);

                left_corner = mycircuit.alignx ? left_aligned : left_corner;
                top_corner = mycircuit.aligny ? top_aligned : top_corner;

                if (window.event.shiftKey) {
                    var x_delta = Math.abs(left_corner - orig_x)
                    var y_delta = Math.abs(top_corner - orig_y)
                    if (x_delta > y_delta) {
                        o.style.left = left_corner + "px";
                        o.style.top = orig_y + "px";
                    } else {
                        o.style.top = top_corner + "px";
                        o.style.left = orig_x + "px";
                    }
                } else {
                    o.style.left = left_corner + "px";
                    o.style.top = top_corner + "px";
                }

                o.orig_x = parseInt(o.style.left) - document.documentElement.scrollLeft;
                o.orig_y = parseInt(o.style.top) - document.documentElement.scrollTop;
                mycircuit.lineReplace(o);
            }

            d.onmouseup = function () {
                if (o.releaseCapture)
                    o.releaseCapture();
                else if (window.captureEvents)
                    window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
                d.onmousemove = null;
                d.onmouseup = null;
                /*d.ondragstart = null;
                d.onselectstart = null;
                d.onselect = null;
                o.style.cursor = "normal";*/
                o.style.zIndex = o.orig_index;
                mycircuit.lineReplace(o);
            }
        }
    }

    if (s) {
        var orig_scroll = window.onscroll ? window.onscroll : function () { }
        window.onscroll = function () {
            orig_scroll();
            o.style.left = o.orig_x + document.documentElement.scrollLeft;
            o.style.top = o.orig_y + document.documentElement.scrollTop;
        }
    }
}
