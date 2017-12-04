
var redis = require('redis');
var RDS_PORT = 6379,
    RDS_HOST = '127.0.1.1',
    RDS_OPTS = {},//配置项
    client = redis.createClient(RDS_PORT, RDS_HOST, RDS_OPTS);
client.on('ready', function (err) {
    console.log('ready');
})