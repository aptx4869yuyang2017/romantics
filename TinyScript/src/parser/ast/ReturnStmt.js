const ASTNodeTypes = require('../ast/ASTNodeTypes');
const { Stmt, Expr } = require('../ast/index');

class ReturnStmt extends Stmt {
  constructor() {
    super(ASTNodeTypes.RETURN_STMT, 'return');
  }
}

module.exports = ReturnStmt;

ReturnStmt.parse = it => {
  const lexeme = it.nextMatch('return');
  const expr = Expr.parse(it);
  const stmt = new ReturnStmt();
  stmt.setLexeme(lexeme);
  stmt.addChild(expr);

  return stmt;
};
