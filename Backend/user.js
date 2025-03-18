const mongoose = require ('mongoose');

mongoose.connect('mongodb://localhost:27017/Books');


// create a book schema 

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    price: Number,
    cover: String,
});

// create a model

const Model = mongoose.model('book' , bookSchema);

module.exports = Model;