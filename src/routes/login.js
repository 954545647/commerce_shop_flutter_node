/**
 * @description 登录注册接口
 */
const router = require("koa-router")();
const { RegisterValidator, LoginValidator } = require("@validators/user");
const { register, login } = require("@controller/user");

// 注册
router.post("/register", async ctx => {
  const v = await new RegisterValidator().validate(ctx);
  const { username, password, phone } = {
    username: v.get("body.username"),
    password: v.get("body.password"),
    phone: v.get("body.phone")
  };
  ctx.body = await register({
    username,
    password,
    phone
  });
});

// 登录
router.post("/login", async ctx => {
  const v = await new LoginValidator().validate(ctx);
  const { username, password } = {
    username: v.get("body.username"),
    password: v.get("body.password")
  };
  ctx.body = await login(username, password);
});

module.exports = router;
