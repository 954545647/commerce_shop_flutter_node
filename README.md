#### 加强版 Koa2

##### 功能

- 路由自动加载
- 全局异常处理
- 参数自动化校验
- 自定义中间件
- Jest 测试
- 日志处理和收集

##### 路由自动加载

- 使用插件 require-directory

```
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
```

##### 全局异常处理

- 自定义异常中间件 catchError

```
const catchError = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    const isHttpException = error instanceof HttpException;
    console.error(error);
    // 开发环境下直接抛出
    if (isDev && !isHttpException) {
      throw error;
    }
    // 已知异常
    if (isHttpException) {
      ctx.body = {
        msg: error.msg,
        request: `${ctx.method} ${ctx.path}`
      };
      ctx.status = error.code;
      // 未知异常
    } else {
      ctx.body = {
        msg: "未知错误！",
        request: `${ctx.method} ${ctx.path}`
      };
      ctx.status = 500;
    }
  }
};
```

##### 代码规范

- eslint + pre-commit
- 严格写方法注释
