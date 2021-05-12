const _serializeSingleLaunch = (launch, rocketSerializer) => {
  return {
    'flight_number': launch.flight_number,
    'mission_name': launch.mission_name,
    'isFavourite': launch.isFavourite,
    'rocket': rocketSerializer.serialize(launch.rocketObject),
    'payloads': launch.rocket.second_stage.payloads.map(payload => ({
	    payload_id: payload.payload_id,
	    manufacturer: payload.manufacturer,
	    type: payload.payload_type
    })),
  };
}

module.exports = class {
  serialize(data, rocketSerializer) {
    if (!data) {
      throw new Error('Expect data to be not undefined nor null');
    }
    if (Array.isArray(data)) {
      return data.map(launch => _serializeSingleLaunch(launch, rocketSerializer));
    }
    return _serializeSingleLaunch(data, rocketSerializer);
  }
}

