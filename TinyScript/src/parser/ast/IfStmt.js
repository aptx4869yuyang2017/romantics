const Stmt = require('./Stmt.js');
const ASTNodeTypes = require('./ASTNodeTypes');

class IfStmt extends Stmt {
  constructor(parent) {
    super(parent, ASTNodeTypes.IF_STMT, 'if');
  }
  getExpr() {
    return this.getChild(0);
  }

  getBlock() {
    return this.getChild(1);
  }

  getElseBlock() {
    const block = this.getChild(2);
    if (block instanceof Block) {
      return block;
    }
    return null;
  }

  getElseIfStmt() {
    const ifStmt = this.getChild(2);
    if (ifStmt instanceof IfStmt) {
      return ifStmt;
    }
    return null;
  }
}

module.exports = IfStmt;
const { Expr, Block } = require('./index');

// IfStmt -> if(expr) {Block} Tail
IfStmt.parse = it => {
  const lexeme = it.nextMatch('if');
  const stmt = new IfStmt();
  stmt.setLexeme(lexeme);

  it.nextMatch('(');

  const expr = Expr.parse(it);
  stmt.addChild(expr);

  it.nextMatch(')');

  const block = Block.parse(it);
  stmt.addChild(block);

  const tail = IfStmt.parseTail(it);
  if (tail != null) {
    stmt.addChild(tail);
  }

  return stmt;
};

// else {Block} | else IfStmt | ε
IfStmt.parseTail = it => {
  if (!it.hasNext() || it.peek().getValue() !== 'else') {
    return null;
  }
  it.nextMatch('else');
  const lookahead = it.peek();

  if (lookahead.getValue() === '{') {
    return Block.parse(it);
  } else if (lookahead.getValue() === 'if') {
    return IfStmt.parse(it);
  } else {
    return null;
  }
};
