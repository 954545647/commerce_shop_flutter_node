/**
 * @description koa-onerror 插件的配置信息
 */

const { isProd } = require("@utils/env");

let ERROR_OPTIONS = {};

// 线上环境直接返回错误页面
if (isProd) {
  ERROR_OPTIONS = {
    redirect: "/error"
  };
}

module.exports = ERROR_OPTIONS;
