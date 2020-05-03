const ASTNode = require('./ASTNode');
const TokenType = require('../../lexer/TokenType');

class Factor extends ASTNode {
  constructor(token) {
    super();
    this.label = token.getValue();
    this.lexeme = token;
  }
}

module.exports = Factor;
const { Variable, Scalar } = require('./index');

Factor.parse = it => {
  const token = it.peek();
  const type = token.getType();

  if (type == TokenType.VARIABLE) {
    it.next();
    return new Variable(token);
  } else if (token.isScalar()) {
    it.next();
    return new Scalar(token);
  }
};
