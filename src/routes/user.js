/**
 * @description 用户接口
 */
const router = require("koa-router")();
const {
  ChangePasswordValidator,
  AddNewAddressValidator,
  ChangeIntegralValidator
} = require("@validators/user");
const {
  changePass,
  getAddress,
  newAddress,
  changeIntegral,
  getUserSignDays,
  getUserTypeInfo
} = require("@controller/user");
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

// 获取用户数据
router.post("/getUserInfo", new Auth().token, async ctx => {
  const { type = 1 } = ctx.request.body;
  const id = ctx.auth.id;
  ctx.body = await getUserTypeInfo(id, type);
});

// 获取用户地址
router.post("/address", new Auth().token, async ctx => {
  const id = ctx.auth.id;
  ctx.body = await getAddress(id);
});

// 新增用户地址
router.post("/newAddress", new Auth().token, async ctx => {
  await new AddNewAddressValidator().validate(ctx);
  const { username, phone, province, city, area, address } = ctx.request.body;
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

// 获取用户签到数据
router.post("/getUserSignDays", new Auth().token, async ctx => {
  const id = ctx.auth.id;
  ctx.body = await getUserSignDays(id);
});

// 修改用户积分
router.post("/changeIntegral", new Auth().token, async ctx => {
  await new ChangeIntegralValidator().validate(ctx);
  const id = ctx.auth.id;
  const { source } = ctx.request.body;
  ctx.body = await changeIntegral(id, source);
});

module.exports = router;
