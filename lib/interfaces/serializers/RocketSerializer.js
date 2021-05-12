const _serializeSingleRocket = (rocket) => ({
	rocket_id: rocket.rocket_id,
	rocket_name: rocket.rocket_name,
	description: rocket.description,
	images: rocket.flickr_images
})

module.exports = class {
  serialize(data) {
    if (!data) {
      throw new Error('Expect data to be not undefined nor null');
    }
    if (Array.isArray(data)) {
      return data.map(_serializeSingleRocket);
    }
    return _serializeSingleRocket(data);
  }
}
