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

//判断是否需要登录和是否已登录状态的中间件
const userMiddle = require('./middleware/userMiddle');

const model = require('./middleware/model');
//mysql操作
const Sequelize = require('sequelize');
const config = require('./config');
const app = new Koa();

if(!isProduction){
    let staticFiles = require('./middleware/static-files');
    app.use(staticFiles('/static',__dirname+'/static'));
}
app.use(bodyParser());
app.use(templating('views',{
    noCache:!isProduction,
    watch:!isProduction
}))

app.use(userMiddle('test'));
app.use(controller());


//在端口3000监听
app.listen(3000);
console.log('app started at port 3000');