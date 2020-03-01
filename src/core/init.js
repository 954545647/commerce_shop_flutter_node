/**
 * @description 初始化程序
 */

const requireDirectory = require("require-directory");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const catchError = require("@middlewares/exception.js");
const { startOrderInterval } = require("@utils/queue");
const { ERROR_OPTIONS } = require("@config");
const onError = require("koa-onerror");

class InitApp {
  /**
   * 初始化方法
   * @param {app} app Koa实例
   */
  static initCore(app) {
    InitApp.app = app;
    InitApp.initMiddleWares();
    InitApp.initRouters();
    InitApp.initExceptions();
    InitApp.initErrorPage();
    InitApp.initMessageQueue(); // 初始化消息队列
  }

  /**
   * 自动加载全部路由文件并注册
   */
  static initRouters() {
    // 绝对路径
    const routesDirectory = `${process.cwd()}/src/routes`;
    requireDirectory(module, routesDirectory, {
      visit: whenLoadModule
    });

    /**
     * 当每个模块被加载的时候会触发调用
     * @param {obj} obj 路由实例
     */
    function whenLoadModule(obj) {
      if (obj instanceof Router) {
        InitApp.app.use(obj.routes(), obj.allowedMethods());
      }
    }
  }

  /**
   * 初始化并使用中间件
   */
  static initMiddleWares() {
    onError(InitApp.app, ERROR_OPTIONS);
    InitApp.app.use(bodyParser());
    InitApp.app.use(catchError);
  }

  /**
   * 在全局上挂载所有错误类
   */
  static initExceptions() {
    const errors = require("@model/error");
    const couponErrs = require("@model/coupon");
    const userErrs = require("@model/user");
    const succ = require("@model/success");
    Object.assign(errors, couponErrs, userErrs);
    global.errs = errors;
    global.succ = succ;
  }

  /**
   * 配置404错误页面
   */
  static initErrorPage() {
    const routesDirectory = `${process.cwd()}/src/views`;
    requireDirectory(module, routesDirectory, {
      visit: whenLoadModule
    });

    /**
     * 当每个模块被加载的时候会触发调用
     * @param {obj} obj 路由实例
     */
    function whenLoadModule(obj) {
      if (obj instanceof Router) {
        InitApp.app.use(obj.routes(), obj.allowedMethods());
      }
    }
  }

  /**
   *
   */
  static initMessageQueue() {
    global.orderLoop = new Array(3000);
    global.orderMap = new Map(); // 记录每个uid的slotIndex
    global.currentSlotIndex = 1; // 当前要检测的slot
    // 开启轮询
    startOrderInterval();
  }
}

module.exports = InitApp;
