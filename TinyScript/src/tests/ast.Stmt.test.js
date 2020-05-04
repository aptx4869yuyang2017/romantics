const Lexer = require('../lexer/Lexer');
const arrayToGenerator = require('../common/arrayToGenerator');
const PeekTokenIterator = require('../parser/util/PeekTokenIterator');
const ParserUtils = require('../parser/util/ParserUtils');
const path = require('path');
const { assert } = require('chai');
const { AssignStmt, DeclareStmt, IfStmt } = require('../parser/ast/index');

describe('Stmts', () => {
  it('assign', () => {
    const it = createTokenIt('i = 100 * 2');
    const stmt = AssignStmt.parse(it);
    assert.equal(ParserUtils.toPostfixExpression(stmt), 'i 100 2 * =');
  });

  it('declare', () => {
    const it = createTokenIt('var i = 100 * 2');
    const stmt = DeclareStmt.parse(it);
    assert.equal(ParserUtils.toPostfixExpression(stmt), 'i 100 2 * =');
  });

  it('ifStmt', () => {
    const it = createTokenIt(`if(a){
      var a = 1
    }`);

    const stmt = IfStmt.parse(it);
    const expr = stmt.getExpr();
    const block = stmt.getBlock();
    const assignStmt = block.getChild(0);
    const elseBlock = stmt.getChild(2);

    assert.equal(expr.getLexeme().getValue(), 'a');
    assert.equal(assignStmt.getLexeme().getValue(), '=');
    assert.equal(null, elseBlock);
  });

  it('ifElse', () => {
    const it = createTokenIt(`if(a){
      a =1
    } else {
      a = 2
      a = a * 3
      var b = 3 *3
      if (a < b) {
        c = d
      }

    }`);

    const stmt = IfStmt.parse(it);
    stmt.print();
    const expr = stmt.getExpr();
    const block = stmt.getBlock();
    const assignStmt = block.getChild(0);
    const elseBlock = stmt.getChild(2);
    const AssignStmt2 = elseBlock.getChild(2);

    assert.equal(expr.getLexeme().getValue(), 'a');
  });
});

function createTokenIt(src) {
  const lexer = new Lexer();
  const tokens = lexer.analyse(arrayToGenerator([...src]));
  const tokenIt = new PeekTokenIterator(arrayToGenerator(tokens));
  return tokenIt;
}
