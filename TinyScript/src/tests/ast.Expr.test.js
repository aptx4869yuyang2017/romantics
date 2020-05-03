const Lexer = require('../lexer/Lexer');
const Expr = require('../parser/ast/Expr');
const PeekTokenIterator = require('../parser/util/PeekTokenIterator');
const arrayToGenerator = require('../common/arrayToGenerator');
// const ParserUtils = require('../parser/util/ParserUtils')
const { assert } = require('chai');

function createExpr(str) {
  const gen = arrayToGenerator([...str]);
  const lexer = new Lexer();
  const tokens = lexer.analyse(gen);
  const it = new PeekTokenIterator(arrayToGenerator(tokens));
  const expr = Expr.parse(it);
  return expr;
}

describe('ParseExpression', () => {
  //   it('simple', () => {
  //     const expr1 = createExpr('1+2+3');
  //     expr1.print();
  //     assert.equal(expr1.getChild(0).getLabel(), 1);
  //   });

  it('complex', () => {
    const expr1 = createExpr('1+2*3');
    const expr2 = createExpr('1*2+3');
    const expr3 = createExpr('10 * (7+4)');
    const expr4 = createExpr('(1*2!=7)==3!=4*5+6');
    const expr5 = createExpr('12>>1*1');

    expr1.print();
    expr2.print();
    expr3.print();
    expr4.print();
    expr5.print();

    console.log('-');
  });
});
