/**
 * @description socket 模型
 */

class MessageInfo {
  constructor({ fromId, toId = null, content, username = null }) {
    this.fromId = fromId;
    this.toId = toId;
    this.content = content;
    this.username = username;
  }
}

module.exports = {
  MessageInfo
};
