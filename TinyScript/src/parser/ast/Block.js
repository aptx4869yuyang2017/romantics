const Stmt = require('./Stmt.js');
const ASTNodeTypes = require('./ASTNodeTypes');

class Block extends Stmt {
  constructor(parent) {
    super(parent, ASTNodeTypes.BLOCK, 'block');
  }
}

module.exports = Block;

Block.parse = it => {
  it.nextMatch('{');
  const block = new Block();

  let stmt = null;
  while ((stmt = Stmt.parse(it)) !== null) {
    block.addChild(stmt);
  }

  it.nextMatch('}');
  return block;
};
