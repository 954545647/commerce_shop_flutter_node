/**
 * @description 404和错误页面
 */
const router = require("koa-router")();
const fs = require("fs");
const path = require("path");

// 错误页面
router.get("/error", async ctx => {
  const fileName = path.join(process.cwd(), "src/views/", "error.html");
  ctx.set({ "Content-Type": "text/html" });
  ctx.body = fs.readFileSync(fileName);
});

// 404页面
router.get("*", async ctx => {
  const fileName = path.join(process.cwd(), "src/views/", "404.html");
  ctx.set({ "Content-Type": "text/html" });
  ctx.body = fs.readFileSync(fileName);
});

module.exports = router;
