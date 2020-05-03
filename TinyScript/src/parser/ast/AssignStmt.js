const Stmt = require('./Stmt.js');
const ASTNodeTypes = require('./ASTNodeTypes');
const ParseException = require('../util/ParseException');

class AssignStmt extends Stmt {
  constructor() {
    super(ASTNodeTypes.ASSIGN_STMT, 'assign');
  }
}

module.exports = AssignStmt;

const { Factor, Expr } = require('./index');

AssignStmt.parse = it => {
  const stmt = new AssignStmt();
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
