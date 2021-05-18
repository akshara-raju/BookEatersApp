const express = require('express');

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://userone:userone@libraryfiles.bpm79.mongodb.net/BookEaters?retryWrites=true&w=majority');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    usrname : String,
    email: String,
    number : Number,
    password : String
});

var Userdata = mongoose.model('userdata',UserSchema);
module.exports = Userdata;
