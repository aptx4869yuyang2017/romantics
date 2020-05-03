const ASTNodeTypes = require('../ast/ASTNodeTypes');

class ParserUtils {
  // postfix
  // prefix

  static toPostfixExpression(node) {
    // node(left, op, right)
    // left right op

    if (node instanceof Factor) {
      return node.getLexeme().getValue();
    }

    const prts = [];
    for (const child of node.getChildren()) {
      prts.push(ParserUtils.toPostfixExpression(child));
    }
    const lexemeStr =
      node.getLexeme() != null ? node.getLexeme().getValue() : '';
    if (lexemeStr.length > 0) {
      return prts.join(' ') + ' ' + lexemeStr;
    } else {
      return prts.join(' ');
    }
  }
}

module.exports = ParserUtils;
