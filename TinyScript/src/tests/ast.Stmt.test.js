const Lexer = require('../lexer/Lexer');
const arrayToGenerator = require('../common/arrayToGenerator');
const PeekTokenIterator = require('../parser/util/PeekTokenIterator');
const ParserUtils = require('../parser/util/ParserUtils');
const path = require('path');
const { assert } = require('chai');
const { AssignStmt } = require('../parser/ast/index');

describe('Stmts', () => {
  it('assign', () => {
    const it = createTokenIt('i = 100 * 2');
    const stmt = AssignStmt.parse(it);
    stmt.print();
    assert.equal(ParserUtils.toPostfixExpression(stmt), 'i 100 2 * =');
  });
});

function createTokenIt(src) {
  const lexer = new Lexer();
  const tokens = lexer.analyse(arrayToGenerator([...src]));
  const tokenIt = new PeekTokenIterator(arrayToGenerator(tokens));
  return tokenIt;
}
