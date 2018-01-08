/*文本编辑器*/
(function () {
    let ueditor_config = {
        toolbars: [
            [
                'undo', 'redo', '|',
                'fontsize', 'forecolor', 'bold', 'italic', 'underline', '|',

                'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', 'lineheight', '|',
                'directionalityltr', 'directionalityrtl', 'indent', '|',

                'simpleupload', 'insertframe', 'emotion', '|',

                'backcolor', 'autotypeset',
                'link', 'spechars', 'source', '|',
                'searchreplace', '|',
                'fullscreen', //全屏

            ]
        ],
        initialFrameWidth: 700,
        initialFrameHeight: 320,
        autoHeightEnabled: false,
    }
    Object.assign(UEDITOR_CONFIG, ueditor_config);
})();