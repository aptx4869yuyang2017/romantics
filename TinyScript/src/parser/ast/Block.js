const Stmt = require("./Stmt.js");
const ASTNodeType = require("./ASTNodeType");

class Block extends Stmt {
  constructor(parent) {
    super(parent, ASTNodeType.BLOCK, "block");
  }
}

module.exports = Block;
