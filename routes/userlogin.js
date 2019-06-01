/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
   email: {type: String, unqiue: true},
   password: {type: String}

});

var user = mongoose.model('users', userSchema);
module.exports = user;