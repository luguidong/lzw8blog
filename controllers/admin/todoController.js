//任务列表
let Todo = require('../../models/Todo');
var todoList = async (ctx, next) => {
    var page = ctx.query.page || 1;
    await Todo.findAndCountAll({
        limit: 10,
        offset: 10 * (page - 1)
    }).then((todoList) => {
        ctx.rest({ code: 0, data: todoList, msg: '' });
    }).catch((err) => {
        console.log(err);
    })
}
var getTodo = async (ctx, next) => {
    var id = ctx.query.id;
    console.log(id);
    await Todo.findAll({
        where: {
            id: id
        }
    }).then(todo => {
        ctx.rest({ code: 0, data: todo[0], msg: '获取成功' });
    }).catch(err => {
        console.log(err);
    });
}
var createTodo = async (ctx, next) => {
    var { title, stage, relat_href, desc, type } = ctx.request.body;
    var params = {
        title: title || '',
        stage: stage || 0,
        relat_href: relat_href || '',
        desc: desc || '',
        type: type || 0
    }
    await Todo.create(params).then(() => {
        console.log('创建任务成功');
        ctx.rest({ code: 0, data: {}, msg: '创建任务成功' });
    }).catch(err => {
        console.log('创建任务失败');
        console.log(err);
    })
}

module.exports = {
    'GET /api/todoList': todoList,
    'POST /api/createTodo': createTodo,
    'GET /api/getTodoInfo': getTodo
}