/**
 * @description 生成token
 */

const jsonwebtoken = require("jsonwebtoken");
const { ACCESS_TOKEN_EXPIRE, TOKEN_KEY } = require("@config/keys");

// 生成token
const generateToken = function(data, outTime = ACCESS_TOKEN_EXPIRE) {
  const token = jsonwebtoken.sign(data, TOKEN_KEY, {
    expiresIn: outTime
  });
  return token;
};

module.exports = generateToken;
