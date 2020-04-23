const AlphabetHelper = require("../lexer/AlphabetHelper");
const { assert } = require("chai");

describe("AlphabetHelper", () => {
  it("charCheck", () => {
    assert.equal(true, AlphabetHelper.isLetter("a"));
    assert.equal(true, AlphabetHelper.isLetter("A"));
    assert.equal(false, AlphabetHelper.isLetter("+"));
    assert.equal(false, AlphabetHelper.isLetter("_"));
    assert.equal(false, AlphabetHelper.isLetter("4"));

    assert.equal(true, AlphabetHelper.isNumber("1"));
    assert.equal(true, AlphabetHelper.isNumber("7"));
    assert.equal(true, AlphabetHelper.isNumber("9"));
    assert.equal(false, AlphabetHelper.isNumber("+"));
    assert.equal(false, AlphabetHelper.isNumber("_"));
    assert.equal(false, AlphabetHelper.isNumber("a"));

    assert.equal(true, AlphabetHelper.isOperator("+"));
    assert.equal(true, AlphabetHelper.isOperator("-"));
    assert.equal(true, AlphabetHelper.isOperator("*"));
    assert.equal(true, AlphabetHelper.isOperator("/"));
    assert.equal(true, AlphabetHelper.isOperator("!"));
    assert.equal(true, AlphabetHelper.isOperator("="));
    assert.equal(true, AlphabetHelper.isOperator("/"));
    assert.equal(true, AlphabetHelper.isOperator("<"));
    assert.equal(true, AlphabetHelper.isOperator(">"));
    assert.equal(true, AlphabetHelper.isOperator("&"));
    assert.equal(true, AlphabetHelper.isOperator("|"));
    assert.equal(true, AlphabetHelper.isOperator("^"));
    assert.equal(true, AlphabetHelper.isOperator("%"));
    assert.equal(AlphabetHelper.isOperator("_"), false);
    assert.equal(AlphabetHelper.isOperator("2"), false);
    assert.equal(AlphabetHelper.isOperator("_"), false);
    assert.equal(AlphabetHelper.isOperator("a"), false);

    assert.equal(true, AlphabetHelper.isLiteral("_"));
    assert.equal(true, AlphabetHelper.isLiteral("a"));
    assert.equal(true, AlphabetHelper.isLiteral("A"));
    assert.equal(true, AlphabetHelper.isLiteral("2"));
    assert.equal(false, AlphabetHelper.isLiteral("*"));
  });
});
