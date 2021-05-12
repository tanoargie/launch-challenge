module.exports = async (userId, { favouritesRepository }) => {
   const favouriteLaunches = await favouritesRepository.getByUser(userId);
   return favouriteLaunches.map(fav => fav.launchId)
}
