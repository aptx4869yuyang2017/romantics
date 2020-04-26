const ASTNode = require("./ASTNode");
const ASTNodeType = require("./ASTNodeType");
const TokenType = require("../../lexer/TokenType");

class Factor extends ASTNode {
  constructor(parent, it) {
    super(parent, it);
    const token = it.next();

    var type = token.getType();

    if (type === TokenType.VARIABLE) {
      this.type = ASTNodeType.VARIABLE;
    } else {
      this.type = ASTNodeType.SCALAR;
    }

    this.label = token.getValue();
    this.lexeme = token;
  }
}

module.exports = Factor;
