/**
 * @description base地址
 */

const { isProd } = require("@utils/env");

BASEURL = isProd ? "47.96.96.127" : "127.0.0.1:3000";
PORT = isProd ? 80 : 3000;
module.exports = {
  BASEURL,
  PORT
};
