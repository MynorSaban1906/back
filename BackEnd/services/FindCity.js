const connection = require('../config/connectDb2');
const { searchCity } = require('./funtionsDb');

exports.verCiudad = async (req, res) => {
	const City = await searchCity(connection);
	if (City.length === 0) {
		return res.status(400).json('Ciudades no encontradas');
	}
	const Ciudades = [];
	// eslint-disable-next-line no-plusplus
	for (let index = 0; index < City.length; index++) {
		Ciudades[index] = City[index];
	}
	return res.status(200).send({ Ciudades });
};
