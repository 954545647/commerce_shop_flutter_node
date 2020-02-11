const router = require("koa-router")();
const Auth = require("@middlewares/auth");
router.prefix("/home"); // 前缀
// 首页轮播图列表数据
router.get("/homeSwiperImgList", async ctx => {
  try {
    let swiperImgList = [
      { url: "https://inews.gtimg.com/newsapp_ls/0/10843271260_295195/0" },
      { url: "https://inews.gtimg.com/newsapp_ls/0/10843271260_295195/0" },
      { url: "https://inews.gtimg.com/newsapp_ls/0/10843271261_295195/0" }
    ];
    ctx.body = {
      status: 200,
      data: {
        swiperImgList
      }
    };
  } catch (error) {
    ctx.body = {
      status: 404,
      message: `访问出错${error}`
    };
  }
});

// 首页新闻数据
router.get("/homeNewsList", async ctx => {
  try {
    let newsList = [
      "1111Google新闻是Google开发的一款Web新闻聚合器，由Google首席工程师克里希纳·巴拉特创造与领导开发",
      "最新最全面的即時香港新聞、本地社會新聞、要聞港聞、頭條新聞及專題報道，全方位了解社會大小事，揭示社會現象.",
      "北方迎今冬以来最大范围降雪 北京等地或降下初雪,天气很冷多穿衣服",
      "随降雪而来的还有大风降温天气，气象学意义上的冬季前线将跨过长江，覆盖八成以上国土。"
    ];
    ctx.body = {
      data: { newsList },
      status: 200
    };
  } catch (error) {
    ctx.body = {
      status: 404,
      message: `访问出错${error}`
    };
  }
});

// 热门商品
router.post("/hotGoods", async ctx => {
  try {
    let goodsList = [
      {
        id: "1",
        name: "豆角",
        imgUrl: "https://hellorfimg.zcool.cn/preview260/81293572.jpg",
        price: "12.8",
        desc:
          "这个是豆角，这个是豆角，这个是豆角，这个是豆角，这个是豆角，这个是豆角，这个是豆角，这个是豆角，这个是豆角，",
        carriage: 0,
        monthlySales: 1204,
        yieldly: "浙江杭州"
      },
      {
        id: "2",
        name: "青瓜",
        imgUrl: "https://hellorfimg.zcool.cn/preview260/81632644.jpg",
        price: "4.7",
        desc:
          "这个是青瓜，这个是青瓜，这个是青瓜，这个是青瓜，这个是青瓜，这个是青瓜，这个是青瓜，这个是青瓜，这个是青瓜，",
        carriage: 8.0,
        monthlySales: 1204,
        yieldly: "浙江杭州"
      },
      {
        id: "3",
        name: "番茄",
        imgUrl: "https://hellorfimg.zcool.cn/preview260/56332219.jpg",
        price: "7.4",
        desc:
          "这个是番茄，这个是番茄，这个是番茄，这个是番茄，这个是番茄，这个是番茄，这个是番茄，这个是番茄，这个是番茄，",
        carriage: 0,
        monthlySales: 1204,
        yieldly: "浙江杭州"
      },

      {
        id: "4",
        name: "马铃薯",
        imgUrl: "https://hellorfimg.zcool.cn/preview260/38406874.jpg",
        price: "9.8",
        desc:
          "这个是马铃薯，这个是马铃薯，这个是马铃薯，这个是马铃薯，这个是马铃薯，这个是马铃薯，这个是马铃薯，这个是马铃薯，",
        carriage: 22.0,
        monthlySales: 1204,
        yieldly: "浙江杭州"
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
