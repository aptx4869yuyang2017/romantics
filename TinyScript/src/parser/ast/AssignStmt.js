const Stmt = require("./Stmt.js");
const ASTNodeType = require("./ASTNodeType");

class AssignStmt extends Stmt {
  constructor(parent) {
    super(parent, ASTNodeType.ASSIGN_STMT, "assign");
  }
}

module.exports = AssignStmt;
