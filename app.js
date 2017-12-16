let staticFiles = require('./middleware/static-files');
const isProduction = process.env.NODE_ENV === 'production';
//导入koa
const Koa = require('koa');
//post提交的表单数据处理
const bodyParser = require('koa-bodyparser');
//koa-router返回的是函数
const router = require('koa-router')();
//创建一个Koa对象表示web app本身
const controller = require('./middleware/controller');
const templating = require('./middleware/templating');
const session = require('koa-session2');
//设置允许跨域
const cors = require('koa2-cors');
const path = require('path');

//判断是否需要登录和是否已登录状态的中间件
const userMiddle = require('./middleware/userMiddle');

const model = require('./middleware/model');
//mysql操作
const Sequelize = require('sequelize');

const app = new Koa();
const rest = require('./middleware/rest');

//session持久化
const Store = require("./libs/Store.js");
app.use(session({
    store: new Store()
}));

//ueditor集成
var ueditor = require("./libs/ueditor.config.js");
app.use(async(ctx, next) => {
    console.log(ctx.request.path);
    if (ctx.request.path.startsWith('/static/js/ueditor/ue')) {
        console.log('进入编辑处理方法');
        ueditor(path.join(__dirname, 'static'), function (req, res, next) {
            //客户端上传文件设置
            var imgDir = '/img/ueditor/'
            var ActionType = req.query.action;
            if (ActionType === 'uploadimage' || ActionType === 'uploadfile' || ActionType === 'uploadvideo') {
                var file_url = imgDir; //默认图片上传地址
                /*其他上传格式的地址*/
                if (ActionType === 'uploadfile') {
                    file_url = '/file/ueditor/'; //附件
                }
                if (ActionType === 'uploadvideo') {
                    file_url = '/video/ueditor/'; //视频
                }
                res.ue_up(file_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
                res.setHeader('Content-Type', 'text/html');
            }
            //  客户端发起图片列表请求
            else if (req.query.action === 'listimage') {
                var dir_url = imgDir;
                res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
            }
            // 客户端发起其它请求
            else {
                // console.log('config.json')
                res.setHeader('Content-Type', 'application/json');
                res.redirect('/ueditor/nodejs/config.json');
            }
        });
    } else {
        await next();
    }
});

app.use(cors({
    origin: function (ctx) {
        if (ctx.url === '/test') {
            return "*"; // 允许来自所有域名请求
        }
        return 'http://localhost:8080'; // 这样就能只允许 http://localhost:8080 这个域名的请求了
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));


if (!isProduction) {
    let staticFiles = require('./middleware/static-files');
    app.use(staticFiles('/static', __dirname + '/static'));
}
app.use(bodyParser());
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}))

app.use(userMiddle());
app.use(rest.restify());
app.use(controller());


//在端口3000监听
app.listen(3000);
console.log('app started at port 3000');