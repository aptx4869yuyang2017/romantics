const Stmt = require("./Stmt.js");
const ASTNodeType = require("./ASTNodeType");

class FunctionDefineStmt extends Stmt {
  constructor(parent) {
    super(parent, ASTNodeType.FUNCTION_DECLARE_STMT, "function define");
  }
}

module.exports = FunctionDefineStmt;
