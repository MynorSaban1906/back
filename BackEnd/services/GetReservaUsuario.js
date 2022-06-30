const connection = require('../config/connectDb2');
const {
	getReservasAutoUsuario,
	getReservasHotelUsuario,
	getReservasVueloUsuario
} = require('./funtionsDb');

exports.getReservaUsuario = async (req, res) => {
	const {
		IdUsuario
	} = req.body;
	if (IdUsuario === '') {
		return res.status(400).json('Es necesario el usuario del servicio');
	}
	const ReservaAuto = [];
	const ReservaVuelo = [];
	const ReservaHotel = [];
	const Autos = await getReservasAutoUsuario(connection, IdUsuario);
	const Vuelos = await getReservasVueloUsuario(connection, IdUsuario);
	const Hoteles = await getReservasHotelUsuario(connection, IdUsuario);

	// eslint-disable-next-line no-plusplus
	for (let index = 0; index < Autos.length; index++) {
		ReservaAuto[index] = Autos[index];
	}
	// eslint-disable-next-line no-plusplus
	for (let index = 0; index < Vuelos.length; index++) {
		ReservaVuelo[index] = Vuelos[index];
	}
	// eslint-disable-next-line no-plusplus
	for (let index = 0; index < Hoteles.length; index++) {
		ReservaHotel[index] = Hoteles[index];
	}
	return res.status(200).json({ ReservaAuto, ReservaVuelo, ReservaHotel });
};
