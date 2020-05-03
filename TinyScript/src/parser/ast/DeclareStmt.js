const Stmt = require('./Stmt.js');
const ASTNodeTypes = require('./ASTNodeTypes');

class DeclareStmt extends Stmt {
  constructor(parent) {
    super(parent, ASTNodeTypes.DECLARE_STMT, 'declare');
  }
}

module.exports = DeclareStmt;

const { Factor, Expr } = require('./index');

// var a = expr
DeclareStmt.parse = it => {
  const stmt = new DeclareStmt();
  it.nextMatch('var');
  const token = it.peek();
  const factor = Factor.parse(it);

  if (factor == null) {
    throw ParseException.fromToken(token);
  }

  stmt.addChild(factor);
  const lexeme = it.nextMatch('=');
  const expr = Expr.parse(it);
  stmt.addChild(expr);
  stmt.setLexeme(lexeme);

  return stmt;
};
