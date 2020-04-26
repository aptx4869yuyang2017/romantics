const Stmt = require("./Stmt.js");
const ASTNodeType = require("./ASTNodeType");

class DeclareStmt extends Stmt {
  constructor(parent) {
    super(parent, ASTNodeType.DECLARE_STMT, "declare");
  }
}

module.exports = DeclareStmt;
