const Favourite = require('../../domain/Favourite');

module.exports = (id, userId, { favouritesRepository }) => {
	const newFavourite = new Favourite(userId, id);
	favouritesRepository.persist(newFavourite);
	return newFavourite;
}
