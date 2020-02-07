const router = require("koa-router")();
router.prefix("/rentLand");

router.get("/leftList", async ctx => {
  try {
    let menuList = [
      "重庆",
      "四川",
      "佛山",
      "云南",
      "上海",
      "海南",
      "北京",
      "广州",
      "中山",
      "茂名",
      "广西",
      "内蒙古",
      "西藏",
      "乌鲁木齐",
      "海口",
      "坦洲"
    ];

    ctx.body = {
      status: 200,
      data: {
        menuList
      }
    };
  } catch (error) {
    ctx.body = {
      status: 404,
      message: `访问出错${error}`
    };
  }
});

module.exports = router;
