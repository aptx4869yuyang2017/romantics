const Lexer = require('../lexer/Lexer');
const Stmt = require('../parser/ast//AssignStmt');
const PeekTokenIterator = require('../parser/util/PeekTokenIterator');
const arrayToGenerator = require('../common/arrayToGenerator');
const { assert } = require('chai');

function createStmt(str) {
  const gen = arrayToGenerator([...str]);
  const lexer = new Lexer();
  const tokens = lexer.analyse(gen);
  const it = new PeekTokenIterator(arrayToGenerator(tokens));
  const stmt = Stmt.parse(it);
  return stmt;
}

describe('assign', () => {
  it('complex', () => {
    const stmt1 = createStmt('a = 1 + 2');
    const stmt2 = createStmt('c = 1*2+3');
    const stmt3 = createStmt('e = 10 * (7+4)');

    stmt1.print();
    stmt2.print();
    stmt3.print();
  });
});
