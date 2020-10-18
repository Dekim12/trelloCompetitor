const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const cors = require('cors');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const morgan = require('morgan');

process.on('uncaughtException', () => {
  console.log('--------------------someError');
  // process.exit(1);
});

process.on('unhandledRejection', () => {
  console.log('--------------------Promise error');
});

setTimeout(() => {
  throw new Error();
}, 5000);

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(cors());
app.use(express.json());
app.use(
  morgan((tokens, req, res) => {
    return [
      '\n',
      tokens.method(req, res),
      tokens.url(req, res).split('?')[0],
      tokens.status(req, res),
      '-',
      tokens['response-time'](req, res),
      'ms\n',
      `query params: ${JSON.stringify(req.query)}\n`,
      `body: ${JSON.stringify(req.body)}\n`
    ].join(' ');
  })
);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

// app.use((err, req, res, next) => {});

module.exports = app;
