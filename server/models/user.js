import { Schema, model } from 'mongoose';
import crypto from 'node:crypto';

const userSchema = new Schema({
  name: {
    type: String,
  },
  email: { type: String , required: true,
    unique: true},
  lastName: { type: String },
  hash: String,
  salt: String
});

// Method to set salt and hash the password for a user 
userSchema.methods.setPassword = function (password) {
  // Creating a unique salt for a particular user 
  this.salt = crypto.randomBytes(16).toString('hex');
  // Hashing user's salt and password with 1000 iterations, 
  this.hash = crypto.pbkdf2Sync(password, 
    this.salt, 1000, 64, `sha512`).toString(`hex`);
};

// Method to check the entered password is correct or not 
userSchema.methods.validPassword = function (password) {
  const hash = crypto.pbkdf2Sync(password,
    this.salt, 1000, 64, `sha512`).toString(`hex`);
  return this.hash === hash;
};

export default model('User', userSchema)
