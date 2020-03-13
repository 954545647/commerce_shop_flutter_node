/**
 * @description 用户接口
 */
const router = require("koa-router")();
const {
  ChangePasswordValidator,
  AddNewAddressValidator,
  ChangeIntegralValidator,
  RegisterValidator,
  LoginValidator
} = require("@validators/user");
const {
  changePass,
  getAddress,
  newAddress,
  changeIntegral,
  getUserSignDays,
  getUserTypeInfo,
  getDefaultAddress,
  getMyFarm,
  register,
  login,
  updateCover,
  isExist
} = require("@controller/user");
const Auth = require("@middlewares/auth");
router.prefix("/user");

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

// 用户名是否已经存在
router.post("/ifExit", async ctx => {
  const { username } = ctx.request.body;
  ctx.body = await isExist(username);
});

// 修改头像
router.post("/updateCover", new Auth().token, async ctx => {
  const { imgCover } = ctx.request.body;
  const id = ctx.auth.id;
  ctx.body = await updateCover(id, imgCover);
});

// 获取用户数据
router.post("/getUserInfo", new Auth().token, async ctx => {
  const { type = 1 } = ctx.request.body;
  const id = ctx.auth.id;
  ctx.body = await getUserTypeInfo(id, type);
});

// 获取用户地址
router.get("/address", new Auth().token, async ctx => {
  const id = ctx.auth.id;
  ctx.body = await getAddress(id);
});

// 获取用户默认地址
router.get("/defaultAddress", new Auth().token, async ctx => {
  const id = ctx.auth.id;
  ctx.body = await getDefaultAddress(id);
});

// 新增用户地址
router.post("/newAddress", new Auth().token, async ctx => {
  await new AddNewAddressValidator().validate(ctx);
  const {
    username,
    phone,
    province,
    city,
    area,
    address,
    isDefault
  } = ctx.request.body;
  const id = ctx.auth.id;
  ctx.body = await newAddress({
    id,
    username,
    phone,
    province,
    city,
    area,
    address,
    isDefault
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

// 获取用户土地订单
router.get("/farmOrder", new Auth().token, async ctx => {
  const userId = ctx.auth.id;
  ctx.body = await getMyFarm(userId);
});

module.exports = router;
