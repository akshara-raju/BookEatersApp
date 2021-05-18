const express = require('express');

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://userone:userone@libraryfiles.bpm79.mongodb.net/BookEaters?retryWrites=true&w=majority');

const Schema = mongoose.Schema;
const BookSchema = new Schema({
    title : String,
    author : String,
    genre : String,
    image : String,
    about : String
});

var Bookdata = mongoose.model('bookdata',BookSchema);
module.exports = Bookdata;
