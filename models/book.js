(function () {
  'use strict';
  var mongoose,
      bookSchema,
      Book;
  // Node modueles
  mongoose = require('mongoose');

  // Book Schema
  bookSchema = mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    genre: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    author: {
      type: String,
      required: true
    },
    publisher: {
      type: String
    },
    pages: {
      type: String
    },
    image_url: {
      type: String
    },
    buy_url: {
      type: String
    },
    create_date: {
      type: Date,
      default: Date.now
    }
  });

  Book = module.exports = mongoose.model('Book', bookSchema);

  // Get books
  module.exports.getBooks = function (callback, limit) {
    Book.find(callback).limit(limit);
  };

  // Get book
  module.exports.getBookById = function (id, callback) {
    Book.findById(id, callback);
  };

  // Add genre
  module.exports.addBook = function (book, callback) {
    Book.create(book, callback);
  };

  // Update book
  module.exports.updateBook = function (id, book, options, callback) {
    var query,
        update;

    query = {_id: id};
    update = {
      title: book.title,
      genre: book.genre,
      description: book.description,
      author: book.author,
      publisher: book.publisher,
      image_url: book.image_url,
      buy_url: book.buy_url,
      pages: book.pages
    };
    Book.findOneAndUpdate(query, update, options, callback);
  };

  // Delete book
  module.exports.deleteBook = function (id, callback) {
    var query;
    query = {_id: id};
    Book.remove(query, callback);
  };
}());
