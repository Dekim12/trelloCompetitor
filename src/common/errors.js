class ApplicationError extends Error {
  constructor(statusCode, result) {
    super();

    this.statusCode = statusCode;
    this.result = result;
  }
}

class Error401 extends ApplicationError {
  constructor() {
    super('401', 'Unauthorized user.');
  }
}
class Error403 extends ApplicationError {
  constructor() {
    super('403', 'Incorrect login or password');
  }
}

class Error404 extends ApplicationError {
  constructor(result) {
    super('404', result);
  }
}

module.exports = { ApplicationError, Error401, Error403, Error404 };
