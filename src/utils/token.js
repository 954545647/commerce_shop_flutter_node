/**
 * @description 生成token
 */

const jsonwebtoken = require("jsonwebtoken");
const { TOKEN_EXPIRE, TOKEN_KEY } = require("@config/keys");

const generateToken = function(data) {
  const token = jsonwebtoken.sign(data, TOKEN_KEY, {
    expiresIn: TOKEN_EXPIRE
  });
  return token;
};

module.exports = generateToken;
