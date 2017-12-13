/**
 * Created by user on 2017/10/19.
 */
UE.registerUI('135editor',function(editor,uiName){
    var dialog = new UE.ui.Dialog({
        iframeUrl: editor.options.UEDITOR_HOME_URL+'dialogs/135editor/135EditorDialogPage.html' ,
        editor:editor,
        name:uiName,
        title:"135编辑器"
    });
    dialog.fullscreen = true;
    dialog.draggable = false;
    var btn = new UE.ui.Button({
        name:'btn-dialog-' + uiName,
        className:'edui-for-135editor',
        title:'编辑器',
        onclick:function () {
            dialog.render();
            dialog.open();
        }
    });
    return btn;
},undefined);