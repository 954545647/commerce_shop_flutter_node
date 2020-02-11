/**
 * @description 用户接口
 */
const router = require("koa-router")();
const {
  ChangePasswordValidator,
  AddNewAddressValidator
} = require("@validators/user");
const { changePass, getAddress, newAddress } = require("@controller/user");
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

// 获取用户地址
router.post("/address", new Auth().token, async ctx => {
  const id = ctx.auth.id;
  ctx.body = await getAddress(id);
});

// 新增用户地址
router.post("/newAddress", new Auth().token, async ctx => {
  const v = await new AddNewAddressValidator().validate(ctx);
  const { username, phone, province, city, area, address } = ctx.request.body;
  console.log(username, phone, province, city, area, address);
  const id = ctx.auth.id;
  ctx.body = await newAddress({
    id,
    username,
    phone,
    province,
    city,
    area,
    address
  });
});

module.exports = router;
