/**
 * @description redis缓存中间件
 */
const { get, set } = require("@core/redis");

const cacheUrl = [
  "/home/homeSwiperImgList",
  "/home/hotGoods",
  "/home/hotFarms",
  "/home/weather"
];
const redisCache = async (ctx, next) => {
  let url = ctx.url;
  // 非业务相关路由
  if (cacheUrl.includes(url)) {
    const cacheResult = await get(url);
    if (cacheResult != null) {
      // 获取缓存成功
      ctx.body = cacheResult;
      return;
    }
  }
  await next();

  // 设置缓存
  if (ctx.status == 200) {
    let backUrl = `${ctx.url}-backup`;
    if (cacheUrl.includes(ctx.url)) {
      set(ctx.url, ctx.body, 60);
      set(backUrl, ctx.body, 60);
    }
    return;
  }

  if (ctx.status !== 200) {
    let backUrl = `${ctx.url}-backup`;
    // 做兜底
    const result = get[backUrl];
    ctx.status == 200;
    ctx.body = result;
    return;
  }
};

module.exports = redisCache;
