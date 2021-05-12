const Favourite = require('../../domain/Favourite');

module.exports = (id, userId, { favouritesRepository }) => {
	const removedFavourite = new Favourite(userId, id);
	favouritesRepository.remove(removedFavourite);
	return removedFavourite;
}
