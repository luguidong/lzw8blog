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
//日志
const logger = require('koa-logger');
const rest = require('./middleware/rest');
//文件上传
const koaBody = require('koa-body');
const serve = require('koa-static');
var route = require('koa-router')();
const app = new Koa();
app.use(logger());
app.use(koaBody({ multipart: true }));
//app.use(bodyParser());

//app.use(serve(path.join(__dirname, '/public')));
const ueditor = require('./middleware/ueditor');
app.use(ueditor('/public', __dirname + '/public'));
//session持久化
const Store = require("./libs/Store.js");
app.use(session({
    store: new Store()
}));

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
//静态文件
let staticFiles = require('./middleware/static-files');
app.use(staticFiles('/public', __dirname + '/public'));

app.use(templating('public', {
    noCache: !isProduction,
    watch: !isProduction
}))

app.use(userMiddle());
app.use(rest.restify());
app.use(controller());


//在端口3000监听
app.listen(3000);
console.log('app started at port 3000');