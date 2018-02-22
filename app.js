// 引入文件
const Koa = require('koa');
const router = require('./router')
const middleware = require('./middleware')
const config = require('./config/default');

const app = new Koa();

// 中间件
middleware(app)
// 使用路由
router(app)

// 监听端口
if (module.parent) {
  module.exports = app;
} else {
  app.listen(`${config.port}`)
}

console.log(`listening on port ${config.port}`)