const { assert } = require("chai");
const arrayToGenerator = require("../common/arrayToGenerator");
const Lexer = require("../lexer/Lexer");
const PeekIterator = require("../common/PeekIterator");

// const source = "(a+b)^100.12==+100-20";
// const lexer = new Lexer();
// const it = new PeekIterator(arrayToGenerator([...source]), "\0");
// console.log(arrayToGenerator([...source]));

// for (let i = 0; i < 23; i++) {
//   console.log(it.peek(), !!it.peek());
//   it.next();
// }

describe("Lexer", () => {
  it("expression", () => {
    const source = "(a+b)^100.12==+100-200";
    const lexer = new Lexer();
    const tokens = lexer.analyse(arrayToGenerator(source));

    assert.equal(tokens.length, 11);
  });
});
