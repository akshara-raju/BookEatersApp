const express = require('express');

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://userone:userone@libraryfiles.bpm79.mongodb.net/BookEaters?retryWrites=true&w=majority');

const Schema = mongoose.Schema;
const AuthorSchema = new Schema({
    author : String,
    born : String,
    about : String,
    image : String
});

var Authordata = mongoose.model('authordata',AuthorSchema);
module.exports = Authordata;
