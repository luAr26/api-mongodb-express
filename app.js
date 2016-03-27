(function () {
  'use strict';
  var express,
      bodyParser,
      mongoose,
      app,
      mongodbURL,
      db,
      port,
      Genre,
      Book;

  express = require('express');
  bodyParser = require('body-parser');
  mongoose = require('mongoose');
  mongodbURL = 'mongodb://localhost/bookstore';

  // models
  Genre = require('./models/genre');
  Book = require('./models/book');

  // port and app
  port = 3000;
  app = express();

  app.use(bodyParser.json());

  // Connect to MongoDB with Mongoose
  mongoose.connect(mongodbURL);
  db = mongoose.connection;

  app.get('/', function (req, res) {
    res.send('Please use /api/books or /api/genres');
  });

  app.get('/api/genres', function (req, res) {
    Genre.getGenres(function (err, genres) {
      if (err) {
        console.log('There was an error');
      }
      res.json(genres);
    });
  });

  app.post('/api/genres', function (req, res) {
    var genre = req.body;
    Genre.addGenre(genre, function (err, genre) {
      if (err) {
        console.log('There was an error');
      }
      res.json(genre);
    });
  });

  app.put('/api/genres/:_id', function (req, res) {
    var id,
        genre;

    id = req.params._id;
    genre = req.body;

    Genre.updateGenre(id, genre, {}, function (err, genre) {
      if (err) {
        console.log('There was an error');
      }
      res.json(genre);
    });
  });

  app.delete('/api/genres/:_id', function (req, res) {
    var id;
    id = req.params._id;
    Genre.deleteGenre(id, function (err, genre) {
      if (err) {
        console.log('There was an error');
      }
      res.json(genre);
    });
  });

  app.get('/api/books', function (req, res) {
    Book.getBooks(function (err, books) {
      if (err) {
        console.log('There was an error');
      }
      res.json(books);
    });
  });

  app.get('/api/books/:_id', function (req, res) {
    Book.getBookById(req.params._id, function (err, book) {
      if (err) {
        console.log('There was an error');
      }
      res.json(book);
    });
  });

  app.post('/api/books', function (req, res) {
    var book = req.body;
    Book.addBook(book, function (err, book) {
      if (err) {
        console.log('There was an error');
      }
      res.json(book);
    });
  });

  app.put('/api/books/:_id', function (req, res) {
    var id,
        book;

    id = req.params._id;
    book = req.body;

    Book.updateBook(id, book, {}, function (err, book) {
      if (err) {
        console.log('There was an error');
      }
      res.json(book);
    });
  });

  app.delete('/api/books/:_id', function (req, res) {
    var id;
    id = req.params._id;
    Book.deleteBook(id, function (err, book) {
      if (err) {
        console.log('There was an error');
      }
      res.json(book);
    });
  });

  app.listen(port, function () {
    console.log('Listening on port ' + port);
  });
}());
