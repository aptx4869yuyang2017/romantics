const Token = require("../lexer/Token");
const arrayToGenerator = require("../common/arrayToGenerator");
const PeekIterator = require("../common/PeekIterator");
const TokenType = require("../lexer/TokenType");

const { assert } = require("chai");

// console.log("test");
// let a = new PeekIterator(arrayToGenerator("'abc'"));
// let b = Token.makeVarOrKeyword(a);
// console.log(b);

// console.log("");

describe("Token", () => {
  function assertToken(token, value, type) {
    assert.equal(token.getValue(), value);
    assert.equal(token.getType(), type);
  }

  it("varOrKeyword", () => {
    let it1 = new PeekIterator(arrayToGenerator([..."if abc"]));
    let it2 = new PeekIterator(arrayToGenerator([..."true abc"]));

    let token1 = Token.makeVarOrKeyword(it1);
    let token2 = Token.makeVarOrKeyword(it2);
    it1.next();

    let token3 = Token.makeVarOrKeyword(it1);
    assertToken(token1, "if", TokenType.KEYWORD);
    assertToken(token2, "true", TokenType.BOOLEAN);
    assertToken(token3, "abc", TokenType.VARIABLE);
  });

  it("makeString", () => {
    const tests = ["'abc'", '"cde"'];

    for (let test of tests) {
      const it = new PeekIterator(arrayToGenerator(test));
      const token = Token.makeString(it);
      assertToken(token, test, TokenType.STRING);
    }
  });

  it("makeOp", () => {
    const tests = [
      ["+ xx", "+"],
      ["++xx", "++"],
      ["+=xx", "+="],

      ["- xx", "-"],
      ["--xx", "--"],
      ["-=xx", "-="],

      ["* xx", "*"],
      ["**xx", "**"],
      ["*=xx", "*="],

      ["/ xx", "/"],
      ["//xx", "//"],
      ["/=xx", "/="],

      ["> xx", ">"],
      [">>xx", ">>"],
      [">=xx", ">="],

      ["< xx", "<"],
      ["<<xx", "<<"],
      ["<=xx", "<="],

      ["< xx", "<"],
      ["<<xx", "<<"],
      ["<=xx", "<="],

      ["= xx", "="],
      ["==xx", "=="],

      ["! xx", "!"],
      ["!=xx", "!="],

      ["& xx", "&"],
      ["&&xx", "&&"],
      ["&=xx", "&="],

      ["| xx", "|"],
      ["||xx", "||"],
      ["|=xx", "|="],

      ["^ xx", "^"],
      ["^^xx", "^^"],
      ["^=xx", "^="],

      ["% xx", "%"],
      ["%=xx", "%="]
    ];

    for (let test of tests) {
      const [input, expected] = test;
      const it = new PeekIterator(arrayToGenerator(input));
      const token = Token.makeOp(it);

      assertToken(token, expected, TokenType.OPERATOR);
    }
  });

  it("makeNumber", () => {
    const tests = [
      "+0 aa",
      "-0 bb",
      ".3 cc",
      ".5555 dd",
      "7899.99 aaa",
      "-100 ggg",
      "-1999.354*234"
    ];

    for (let test of tests) {
      const it = new PeekIterator(arrayToGenerator(test));
      const token = Token.makeNumber(it);
      const [expected] = test.split(/[ *]/);
      const type =
        test.indexOf(".") == "-1" ? TokenType.INTEGER : TokenType.FLOAT;
      console.log(token.toString());
      assertToken(token, expected, type);
    }

    // const it1 = new PeekIterator(arrayToGenerator(". a"));
    // const token1 = Token.makeNumber(it1);
    // const it2 = new PeekIterator(arrayToGenerator("0.023.2 aa"));
    // const token2 = Token.makeNumber(it2);
    const it3 = new PeekIterator(arrayToGenerator("20"), "\0");
    const token3 = Token.makeNumber(it3);
    console.log(token3.toString());
    assertToken(token3, "20", TokenType.INTEGER);
  });
});
