const jwt = require('jsonwebtoken');
const { genSalt, hash, compare } = require('bcrypt');

const { JWT_SECRET_KEY } = require('./config');
const { Error401 } = require('./errors');

const saltRounds = 10;

const authMiddleware = async (req, res, next) => {
  try {
    const {
      originalUrl,
      headers: { authorization }
    } = req;

    if (originalUrl === '/' || originalUrl === '/login') {
      return next();
    }

    const [authLabel, token] = authorization.split(' ');

    if (authLabel !== 'Bearer' || !token) {
      throw new Error();
    }

    await verifyJWT(token);

    return next();
  } catch (err) {
    return next(new Error401());
  }
};

const hashPassword = async password => {
  const salt = await genSalt(saltRounds);

  return hash(password, salt);
};

const comparePasswords = async (password, hashedPassword) =>
  compare(password, hashedPassword);

const generateJWT = user => jwt.sign(user, JWT_SECRET_KEY, { expiresIn: '1h' });

const verifyJWT = token => jwt.verify(token, JWT_SECRET_KEY);

module.exports = {
  authMiddleware,
  hashPassword,
  comparePasswords,
  generateJWT,
  verifyJWT
};
