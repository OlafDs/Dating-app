/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const valid = require('validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');


//User Schema
//Email validator - Checks if email is an legit email
//https://www.npmjs.com/package/validator

const userSchema = new Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: (v) => {
        return valid.isEmail(v)
      },
      message: '{VALUE} is geen email'
    }
  },
  password: {
    type: String,
    required: true
  }
});

// Credits: https://www.youtube.com/watch?v=Peww_cdgka4
// Using Bcryptjs to hash password  that the user typed in
userSchema.pre('save', async function (next) {
  try {
    //Generates salt
    const salt = await becrypt.genSalt(12);
    //Generates a password hash (salt + hash)
    const passwordHash = await bcrypt.hash(this.password, salt);
    next();
    this.password = password;
  } catch (error) {
    next(error);
  }
});

const User = module.exports = mongoose.model('users', userSchema);