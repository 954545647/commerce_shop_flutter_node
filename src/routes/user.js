/**
 * @description 用户接口
 */
const router = require("koa-router")();
const { ChangePasswordValidator } = require("@validators/user");
const { changePass } = require("@controller/user");
const Auth = require("@middlewares/auth");
router.prefix("/user");

// 修改密码
router.post("/changePass", new Auth().token, async ctx => {
  const v = await new ChangePasswordValidator().validate(ctx);
  const id = ctx.auth.id;
  const { oldPass, newPass } = {
    oldPass: v.get("body.oldPass"),
    newPass: v.get("body.newPass")
  };
  ctx.body = await changePass(id, oldPass, newPass);
});

module.exports = router;
