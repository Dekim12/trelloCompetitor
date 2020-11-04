const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const cors = require('cors');

const logger = require('./common/logger');
const { authMiddleware } = require('./common/authUtils');
const loginRouter = require('./resources/auth/auth.router');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(cors());
app.use(express.json());

logger.enableLogger(app);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(authMiddleware);

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }

  next();
});

app.use('/login', loginRouter);
app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

logger.handleServerErrors(app);

module.exports = app;
