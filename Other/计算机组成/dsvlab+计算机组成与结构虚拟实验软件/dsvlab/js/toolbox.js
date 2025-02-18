function toolbox() {
    var _this = this;
    _this.tooltipSelected = 0;
    _this.tooltipName = "";

    var init = function () {
        $(".compmodel").tooltip({
                                position: { my: "left+120 center"}
        });
        $("#accordion li").mousedown(function (e) {
            _this.tooltipSelected = 1;
            _this.tooltipName = $(this).text();
        });

        $("body").mouseup(function (e) {
            if (_this.tooltipSelected == 1) {
                lefttop = $("#toolbox").offset();
                right = lefttop.left + $("#toolbox").width();
                bottom = lefttop.top + $("#toolbox").height();
                if (!(e.pageX > lefttop.left && e.pageX < right && e.pageY>lefttop.top && e.pageY <bottom)) {
                    var cName = _this.tooltipName;
                    mycircuit.addComponent("workspace", "Compo" + cName, e.pageX, e.pageY);
                }
            }
            _this.tooltipSelected = 0;
        });

        $(function () { $("#accordion").accordion({ heightStyle: "fill" }); });
        $(function () {
            $("#accordion-resizer").resizable({
                                              minHeight:250,
                                              minWidth:150,
                                              resize: function () {
                                                  $("#accordion").accordion("refresh");
                                              }
            });
            $("#accordion").accordion({ collapsible: true });
        });
        $(function () {
            $("#toolbox").draggable({ handle: "h1" });
        });
        $(function () {
            $("#accordion li").draggable({ appendTo: "#workspace", helper: "clone" });
        });
    }

    init();
}
