const Stmt = require("./Stmt.js");
const ASTNodeType = require("./ASTNodeType");

class IfStmt extends Stmt {
  constructor(parent) {
    super(parent, ASTNodeType.IF_STMT, "if");
  }
}

module.exports = IfStmt;
