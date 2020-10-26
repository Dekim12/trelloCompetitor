const mongoose = require('mongoose');

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

UserSchema.methods.toResponse = toResponse;

const User = mongoose.model('User', UserSchema);

module.exports = User;
