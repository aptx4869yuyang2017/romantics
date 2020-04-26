const Stmt = require("./Stmt.js");
const ASTNodeType = require("./ASTNodeType");

class ForStmt extends Stmt {
  constructor(parent) {
    super(parent, ASTNodeType.FOR_STMT, "for");
  }
}

module.exports = ForStmt;
