const axios = require('axios');

const AddLaunchToFavourite = require('../../application/use_cases/AddLaunchToFavourite');
const RemoveLaunchFromFavourites = require('../../application/use_cases/RemoveLaunchFromFavourites');
const GetUserFavourites = require('../../application/use_cases/GetUserFavourites');

module.exports = {
  async getLaunches(request) {
    const serviceLocator = request.server.app.serviceLocator;
    const uid = request.auth.credentials?.uid ?? '';
    const launches = await axios.get('https://api.spacexdata.com/v3/launches');
    const rockets = await axios.get('https://api.spacexdata.com/v3/rockets');
    const launchesWithRockets = launches.data.map(launch => ({...launch, rocketObject: rockets.data.find(rocket => rocket.rocket_id === launch.rocket.rocket_id)}));
    const userFavourites = await GetUserFavourites(uid, serviceLocator);
    const launchesWithRocketsAndFavourites = launchesWithRockets.map(launch => ({...launch, isFavourite: userFavourites.includes(launch.flight_number.toString())}))
    const rocketSerializer = serviceLocator.rocketSerializer;

    return serviceLocator.launchSerializer.serialize(launchesWithRocketsAndFavourites, rocketSerializer);
  },

  async addToFavourites(request) {
    const serviceLocator = request.server.app.serviceLocator;
    const { uid } = request.auth.credentials;
    const { id } = request.params;
    return AddLaunchToFavourite(id, uid, serviceLocator);
  },

  async removeFromFavourites(request) {
    const serviceLocator = request.server.app.serviceLocator;
    const { uid } = request.auth.credentials;
    const { id } = request.params;
    return RemoveLaunchFromFavourites(id, uid, serviceLocator);
  }
}

