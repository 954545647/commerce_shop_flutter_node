/**
 * @description 用户接口
 */
const router = require("koa-router")();
const { ChangePasswordValidator } = require("@validators/user");
const { changePass } = require("@controller/user");
router.prefix("/user");

// 修改密码
router.post("/changePass", async ctx => {
  const v = await new ChangePasswordValidator().validate(ctx);
  const { id, oldPass, newPass } = {
    id: v.get("body.id"),
    oldPass: v.get("body.oldPass"),
    newPass: v.get("body.newPass")
  };
  ctx.body = await changePass(id, oldPass, newPass);
});

module.exports = router;
