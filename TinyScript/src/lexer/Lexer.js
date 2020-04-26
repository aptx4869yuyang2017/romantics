const PeekIterator = require("../common/PeekIterator");
const Token = require("./Token");
const TokenType = require("./TokenType");
const AlphabetHelper = require("./AlphabetHelper");
const LexicalException = require("./LexicalException");

class Lexer {
  analyse(source) {
    const tokens = [];
    const it = new PeekIterator(source, "\0");

    while (it.hasNext()) {
      let c = it.next();

      if (c === "\0") {
        break;
      }
      let lookahead = it.peek();

      if (c === " " || c === "\n" || c === "\r") {
        continue;
      }

      // 提取注释的程序
      if (c == "/") {
        if (lookahead == "/") {
          while (it.hasNext() && (c = it.next()) != "\n");
          continue;
        } else if (lookahead == "*") {
          let valid = false;
          while (it.hasNext()) {
            const p = it.next();
            if (p == "*" && it.peek() == "/") {
              valid = true;
              it.next();
              break;
            }
          }

          if (!valid) {
            throw new LexicalException("comment not matched");
          }
          continue;
        }
      }

      if (c === "{" || c === "}" || c === "(" || c === ")") {
        tokens.push(new Token(TokenType.BRACKET, c));
        continue;
      }

      if (c === "'" || c === '"') {
        it.putBack();
        tokens.push(Token.makeString(it));
        continue;
      }

      if (AlphabetHelper.isLetter(c)) {
        it.putBack();
        tokens.push(Token.makeVarOrKeyword(it));
        continue;
      }

      if (AlphabetHelper.isNumber(c)) {
        it.putBack();
        tokens.push(Token.makeNumber(it));
        continue;
      }

      // + - 开头的 number
      if ((c === "+" || c === "-") && AlphabetHelper.isNumber(lookahead)) {
        const lastToken = tokens[tokens.length - 1] || null;

        if (lastToken == null || !lastToken.isValue()) {
          it.putBack();
          tokens.push(Token.makeNumber(it));
          continue;
        }
      }

      if (AlphabetHelper.isOperator(c)) {
        it.putBack();
        tokens.push(Token.makeOp(it));
        continue;
      }

      throw LexicalException.fromChar(c);
    } // while end

    return tokens;
  }
}

module.exports = Lexer;
