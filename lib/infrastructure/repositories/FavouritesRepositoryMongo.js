'use strict';

const Favourite = require('../../domain/Favourite');
const MongooseFavourite = require('../orm/mongoose/schemas/Favourite');
const FavouriteRepository = require('../../domain/FavouriteRepository');

module.exports = class extends FavouriteRepository {

  constructor() {
    super();
  }

  async persist(favouriteEntity) {
    const { launchId, userId } = favouriteEntity;
    const mongooseFav = new MongooseFavourite({ userId, launchId });
    await mongooseFav.save();
    return new Favourite(mongooseFav.userId, mongooseFav.launchId);
  }

  async remove(favouriteEntity) {
    const { launchId, userId } = favouriteEntity;
    return MongooseFavourite.findOneAndDelete({launchId, userId});
  }

  async getByUser(userId) {
    const mongooseFavs = await MongooseFavourite.find({ userId });
    return mongooseFavs.map(fav => new Favourite(userId, fav.launchId));
  }
};
