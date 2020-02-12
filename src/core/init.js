/**
 * @description 初始化程序
 */

const requireDirectory = require("require-directory");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const catchError = require("@middlewares/exception.js");
// const session = require("koa-session");
const {
  // SESSION_CONF,
  SESSION_KEYS,
  ERROR_OPTIONS
  // TOKEN_KEY
} = require("@config");
const onError = require("koa-onerror");
// const jwt = require("koa-jwt");
class InitApp {
  /**
   * 初始化方法
   * @param {app} app Koa实例
   */
  static initCore(app) {
    InitApp.app = app;
    // InitApp.initSession();
    InitApp.initMiddleWares();
    InitApp.initRouters();
    InitApp.initExceptions();
    InitApp.initErrorPage();
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
    // 配置 session
    // InitApp.app.use(session(SESSION_CONF, InitApp.app));
    // 配置 jwt
    // InitApp.app.use(
    //   jwt({ secret: TOKEN_KEY }).unless({
    //     path: [
    //       /\/register/,
    //       /\/login/,
    //       /\/market\/*/,
    //       // /\/home\/*/,
    //       /\/rentLand\/*/
    //     ]
    //   })
    // );
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
   * 初始化 Session 配置信息
   */
  static initSession() {
    InitApp.app.keys = SESSION_KEYS;
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
}

module.exports = InitApp;
