var redis = require('redis');
var RDS_PORT = 6379,
    RDS_HOST = '127.0.1.1',
    RDS_OPTS = {}, //配置项
    client = redis.createClient(RDS_PORT, RDS_HOST, RDS_OPTS);


client.on('connect', () => {
    // client.set('auth', 'roam', redis.print);
    // client.get('auth', redis.print);
    client.hmset('short', { 'a': '111', 'b': 'wf', 'c': 'hl' }, redis.print);
    client.hgetall('short', (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
        }
    })

    console.log('connect');
})
client.on('ready', function (err) {
    console.log('ready');
})