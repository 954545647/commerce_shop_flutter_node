/**
 * @description 入口文件
 */
require("module-alias/register");
const Koa = require("koa");
const InitApp = require("@core/init");
const appSocket = require("@core/socket");
const { PORT } = require("@config/env");
const app = new Koa();
const server = require("http").createServer(app.callback());
InitApp.initCore(app);
appSocket(server);

server.listen(PORT);
