/* eslint-disable no-process-exit */
/* eslint-disable no-unused-vars */

const morgan = require('morgan');

const configureMorgan = () => {
  morgan.token('query', req => `\nquery params: ${JSON.stringify(req.query)}`);
  morgan.token('body', req => {
    const { password, ...body } = req.body;

    const token = { ...body };

    if (password) {
      token.password = '*****';
    }

    return `\nbody: ${JSON.stringify(token)}`;
  });
};

const enableLogger = app => {
  process
    .on('uncaughtException', err => {
      console.error('\nUncaught Exception: ', err, '\n');

      process.exit(1);
    })
    .on('unhandledRejection', (reason, promise) =>
      console.error(
        '\nUnhandled Rejection at:',
        promise,
        'reason:',
        reason,
        '\n'
      )
    );

  configureMorgan();
  app.use(morgan('\n:method :url :status - :response-time ms :query :body\n'));
};

const handleServerErrors = app => {
  app.use((err, req, res, next) => {
    const { statusCode, result } = err;

    if (statusCode) {
      return res.status(err.statusCode).json({ success: false, result });
    }

    return next(err);
  });

  app.use((err, req, res, next) => {
    console.error('\nInternal Server Error');

    res.status(500).json({ success: false, err });
  });
};

module.exports = { enableLogger, handleServerErrors };
