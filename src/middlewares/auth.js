/**
 * @description token 中间件校验
 */

const jwt = require("jsonwebtoken");
const { TOKEN_KEY } = require("@config/keys");
// const generateToken = require("@utils/token");
// const { ACCESS_TOKEN_EXPIRE, REFRESH_TOKEN_EXPIRE } = require("@config/keys");

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
      // 没有携带token
      if (!token) {
        throw new global.errs.TokenNotFound(errMsg, path);
      }
      try {
        decode = jwt.verify(token, TOKEN_KEY);
      } catch (error) {
        // 校验token：1、token不合法(token乱传) 2、token过期
        if (error.name == "TokenExpiredError") {
          errMsg = "token令牌已过期";
        }
        // 如果是刷新token路由携带的token过期，则代表refreshToken也过期了
        if (path == "/utils/getRefreshToken") {
          console.log("refreshToken过期了");
          throw new global.errs.RefreshTokenFail(errMsg, path);
        }
        console.log("accessToken过期了");
        throw new global.errs.AccessTokenFail(errMsg, path);
      }
      // 这里可以进一步对用户的权限进行校验
      ctx.auth = decode;
      await next();
    };
  }
}

module.exports = Auth;
