/**
 * @description 集市路由
 */

const router = require("koa-router")();

router.prefix("/market");

router.get("/goodsList", async ctx => {
  try {
    let goodsList = [
      {
        coverUrl: "https://hellorfimg.zcool.cn/preview260/81293572.jpg",
        userName: "豆角",
        description: "新鲜的豆角",
        type: "植物",
        price: "12.8",
        stock: "400",
        growth: "400"
      },
      {
        coverUrl: "https://hellorfimg.zcool.cn/preview260/81632644.jpg",
        userName: "青瓜",
        description: "新鲜的青瓜",
        type: "蔬菜",
        price: "4.7",
        stock: "400",
        growth: "400"
      },
      {
        coverUrl: "https://hellorfimg.zcool.cn/preview260/56332219.jpg",
        userName: "番茄",
        description: "新鲜的番茄",
        type: "植物",
        price: "7.4",
        stock: "400",
        growth: "400"
      }
    ];
    ctx.body = {
      status: 200,
      data: {
        goodsList
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
