const SpaceXController = require('../controllers/SpaceXController');

module.exports = {
  name: 'spacex',
  version: '1.0.0',
  register: async (server) => {

    server.route([
      {
        method: 'GET',
        path: '/launches',
        handler: SpaceXController.getLaunches,
        options: {
          description: 'Return launches from spacex',
          tags: ['api'],
	  auth: 'oauth-jwt',
        },
      },
      {
        method: 'POST',
        path: '/launches/favourites/{id}',
        handler: SpaceXController.addToFavourites,
        options: {
          description: 'Add the launch with id {id} to my favourites',
          tags: ['api'],
	  auth: 'oauth-jwt',
        },
      },
      {
        method: 'DELETE',
        path: '/launches/favourites/{id}',
        handler: SpaceXController.removeFromFavourites,
        options: {
          description: 'Remove the launch with id {id} in my favourites',
          tags: ['api'],
	  auth: 'oauth-jwt',
        },
      }
    ]);
  }
}
