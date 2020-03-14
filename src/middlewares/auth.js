/**
 * @description token 中间件校验
 */

const jwt = require("jsonwebtoken");
const { TOKEN_KEY } = require("@config/keys");
class Auth {
  constructor() {}

  get token() {
    return async (ctx, next) => {
      // 获取token
      let decode;
      const { authorization = "" } = ctx.request.headers;
      let path = ctx.request.url;
      const token = authorization.replace("Bearer ", "");
      let errMsg = "token不合法";
      if (!token) {
        throw new global.errs.Forbidden(errMsg, path);
      }
      try {
        decode = jwt.verify(token, TOKEN_KEY);
      } catch (error) {
        // 校验token：1、token不合法(token乱传) 2、token过期
        if (error.name == "TokenExpiredError") {
          errMsg = "token令牌已过期";
        }
        throw new global.errs.Forbidden(errMsg, path);
      }
      // 这里可以进一步对用户的权限进行校验
      ctx.auth = decode;
      await next();
    };
  }
}

module.exports = Auth;
