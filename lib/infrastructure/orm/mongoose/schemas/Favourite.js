const mongoose = require('../mongoose');

const favouriteSchema = new mongoose.Schema({
  userId: String,
  launchId: String,
});

module.exports = mongoose.model('Favourites', favouriteSchema);
