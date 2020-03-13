/**
 * @description socket 模型
 */

class MessageInfo {
  constructor({
    fromId = null,
    toId = null,
    content = null,
    fromName = null,
    toName = null,
    type = 0 // 是顾客or商家、客服
  }) {
    this.fromId = fromId;
    this.toId = toId;
    this.content = content;
    this.fromName = fromName;
    this.toName = toName;
    this.type = type;
  }
}

module.exports = {
  MessageInfo
};
