const usersRepo = require('../users/user.memory.repository');
const { comparePasswords, generateJWT } = require('../../common/authUtils');

const loginUser = async (login, password) => {
  const user = await usersRepo.getByLogin(login);

  if (!user) {
    return null;
  }

  const isPasswordsEqual = await comparePasswords(password, user.password);

  if (!isPasswordsEqual) {
    return null;
  }

  return generateJWT({ userId: user._id, login: user.login });
};

module.exports = { loginUser };
