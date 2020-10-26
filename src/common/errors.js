class ApplicationError extends Error {
  constructor(statusCode, result) {
    super();

    this.statusCode = statusCode;
    this.result = result;
  }
}

class Error404 extends ApplicationError {
  constructor(result) {
    super('404', result);
  }
}

module.exports = { ApplicationError, Error404 };
