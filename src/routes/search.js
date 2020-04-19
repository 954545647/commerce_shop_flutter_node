const router = require("koa-router")();
router.prefix("/search"); // 前缀
const Auth = require("@middlewares/auth");
const {
  getUserHistorySearch,
  newUserHistorySearch,
  searchResByKeyWord
} = require("@controller/search");

// 搜索数据库
router.post("/", async ctx => {
  const { query } = ctx.request.body;
  ctx.body = await searchResByKeyWord(query);
});

// 获取用户搜索记录
router.get("/history", new Auth().token, async ctx => {
  const userId = ctx.auth.id;
  ctx.body = await getUserHistorySearch(userId);
});

// 新增历史查询
router.post("/new", new Auth().token, async ctx => {
  const userId = ctx.auth.id;
  const { query } = ctx.request.body;
  ctx.body = await newUserHistorySearch(userId, query);
});

module.exports = router;
