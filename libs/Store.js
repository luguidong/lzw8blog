const Redis = require("ioredis");
const { Store } = require("koa-session2");

class RedisStore extends Store {
    constructor() {
        super();
        this.redis = new Redis({
            port: 6379,          // Redis port
            host: '127.0.0.1',   // Redis host
            family: 4,           // 4 (IPv4) or 6 (IPv6)
            password: 'auth',
            db: 0
        });
        console.log('初始化reds');
    }

    async get(sid, ctx) {
        let data = await this.redis.get(`SESSION:${sid}`);
        console.log('获取redis');
        return JSON.parse(data);
    }

    async set(session, { sid = this.getID(24), maxAge = 1000000 } = {}, ctx) {
        console.log('写入session');
        try {
            // Use redis set EX to automatically drop expired sessions
            await this.redis.set(`SESSION:${sid}`, JSON.stringify(session), 'EX', maxAge / 1000);
            console.log(JSON.stringify(session));
        } catch (e) {
            console.log(e);
        }
        return sid;
    }

    async destroy(sid, ctx) {
        return await this.redis.del(`SESSION:${sid}`);
    }
}

module.exports = RedisStore;