/**
 * 异常处理
 */

class LexicalException extends Error {
  constructor(msg) {
    super(msg);
  }

  static fromChar(c, s) {
    return new LexicalException(`unexpected char ${c} after ${s}`);
  }
}

module.exports = LexicalException;
