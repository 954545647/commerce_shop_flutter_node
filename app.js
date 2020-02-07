/**
 * @description 入口文件
 */
require("module-alias/register");
const Koa = require("koa");
const app = new Koa();

const InitApp = require("@core/init");

InitApp.initCore(app);

app.listen(3000);
