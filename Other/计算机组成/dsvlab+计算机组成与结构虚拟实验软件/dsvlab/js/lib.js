$(function () {
    $("#tipdlg").dialog({
                        modal: false,
                        autoOpen: false,
                        dialogClass: "no-titlebar",
                        height: 100,
                        width: 400,
                        position: "bottom",
                        resizable: false,
                        open: function(event, ui) {
                            $(this).parent().children('.ui-dialog-titlebar').hide();
                            setTimeout(function () {
                                $("#tipdlg").dialog('close');
                            }, 3000);
                        }

    });
});

function tips(msg) {
    $("#tip").text(msg);
    $("#tipdlg").dialog("open");
}
