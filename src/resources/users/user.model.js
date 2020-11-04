const mongoose = require('mongoose');

const { hashPassword } = require('../../common/authUtils');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    login: {
      type: String,
      required: true
    },
    password: {
      type: String,
      default: 'P@55w0rd'
    }
  },
  { versionKey: false }
);

function toResponse() {
  const { id, name, login } = this;

  return { id, name, login };
}

async function hashUserPassword(next) {
  const hash = await hashPassword(this.password);

  this.password = hash;

  next();
}

UserSchema.methods.toResponse = toResponse;
UserSchema.pre('save', hashUserPassword);

const User = mongoose.model('User', UserSchema);

module.exports = User;
