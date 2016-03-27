(function () {
  'use strict';
  var mongoose,
      genreSchema,
      Genre;
  // Node modueles
  mongoose = require('mongoose');

  // Genre Schema
  genreSchema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    create_date: {
      type: Date,
      default: Date.now
    }
  });

  Genre = module.exports = mongoose.model('Genre', genreSchema);

  // Get genres
  module.exports.getGenres = function (callback, limit) {
    Genre.find(callback).limit(limit);
  };

  // Add genre
  module.exports.addGenre = function (genre, callback) {
    Genre.create(genre, callback);
  };

  // Update genre
  module.exports.updateGenre = function (id, genre, options, callback) {
    var query,
        update;

    query = {_id: id};
    update = {
      name: genre.name
    };
    Genre.findOneAndUpdate(query, update, options, callback);
  };

  // Delete genre
  module.exports.deleteGenre = function (id, callback) {
    var query;
    query = {_id: id};
    Genre.remove(query, callback);
  };
}());


