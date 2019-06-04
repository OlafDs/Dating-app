/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const valid = require('validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');


//User Schema - Gives mongoose information which data we want to store and remember in the database
//Email validator - Checks if email is an legit email
//Credits https://www.npmjs.com/package/validator

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name:{
    type: String,
    required: true
  },
  age:{
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  sport: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
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
    const salt = await bcrypt.genSalt(12);
    //Generates a password hash (salt + hash)
    const passwordHash = await bcrypt.hash(this.password, salt);
    next();
    this.password = password;
  } catch (error) {
    next(error);
  }
});

const User = module.exports = mongoose.model('users', userSchema);