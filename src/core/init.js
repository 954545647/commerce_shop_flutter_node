/**
 * @description 初始化程序
 */

const requireDirectory = require("require-directory");
const Router = require("koa-router");
const koaStatic = require("koa-static");
const catchError = require("@middlewares/exception.js");
const redisCache = require("@middlewares/redisCache.js");
const koaBody = require("koa-body");
const { startOrderInterval } = require("@utils/queue");
const { ERROR_OPTIONS } = require("@config");
const onError = require("koa-onerror");
const views = require("koa-views");
const path = require("path"); //路径管理
// const bodyParser = require("koa-bodyparser");

class InitApp {
  /**
   * 初始化方法
   * @param {app} app Koa实例
   */
  static initCore(app) {
    InitApp.app = app;
    InitApp.initMiddleWares();
    InitApp.loadTem(); // 加载模版引擎
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
    // InitApp.app.use(bodyParser());
    // { enableTypes: ["json", "form", "text"]}
    // 初始化静态资源服务器
    InitApp.app.use(
      koaBody({
        multipart: true,
        keepExtensions: true, // 保持文件的后缀
        formidable: {
          maxFieldsSize: 500 * 1024 * 1024
        }
      })
    );
    InitApp.app.use(koaStatic(path.join(__dirname, "../static")));
    InitApp.app.use(catchError);
    InitApp.app.use(redisCache);
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
    // orderLoop 用来存储 map
    global.orderLoop = new Array(3000);
    global.orderMap = new Map(); // 记录每个uid的slotIndex
    global.currentSlotIndex = 1; // 当前要检测的slot
    // 开启轮询
    startOrderInterval();
  }

  // 加载模版引擎
  static loadTem() {
    InitApp.app.use(
      views(path.join(__dirname, "../", "./views"), {
        // extension: "ejs",
        map: {
          html: "ejs"
        }
      })
    );
  }
}

module.exports = InitApp;
