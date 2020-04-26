class ParseException extends Error {
  constructor(msg) {
    super(msg);
  }

  static fromToken(token) {
    return new ParseException(
      `Syntax Error, unexcepted token ${token.getValeu()}`
    );
  }
}
