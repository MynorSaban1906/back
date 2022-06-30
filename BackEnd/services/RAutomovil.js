const connection = require('../config/connectDb2');
const {
	CReservacionAuto,
	RReservacionAuto,
	UReservacionAuto,
	DReservacionAuto,
	searchReservacionAuto
} = require('./funtionsDb');

function reverse(s) {
	return s.split('/').reverse().join('/');
}

exports.CreateReservacionAuto = async (req, res) => {
	const {
		CantDias,
		FechaReserva,
		FechaFinReserva,
		IdUsuario,
		IdAuto
	} = req.body;
	if (CantDias === '') {
		return res.status(400).json('Es necesario seleccionar cantidad de dias a reservar');
	}
	if (FechaReserva === '') {
		return res.status(400).json('Es necesario Indicar fecha de reserva vuelo');
	}
	if (FechaFinReserva === '') {
		return res.status(400).json('Es necesario Indicar fecha de fin de reserva vuelo');
	}
	if (IdUsuario === '') {
		return res.status(400).json('Es necesario Indicar que usuario realiza la reservacion');
	}
	if (IdAuto === '') {
		return res.status(400).json('Es necesario indicar que automovil quiere reservar');
	}
	const dateReserva = reverse(FechaReserva);
	const dateFinReserva = reverse(FechaFinReserva);
	// eslint-disable-next-line max-len
	const result = await CReservacionAuto(connection, CantDias, dateReserva, dateFinReserva, IdUsuario, IdAuto);

	return res.status(200).json({ data: { msg: 'Registro reservacion de Automovil exitoso', resultado: result } });
};

exports.ReadReservacionAuto = async (req, res) => {
	const Reservaciones = await RReservacionAuto(connection);
	const data = {};
	// eslint-disable-next-line no-plusplus
	for (let index = 0; index < Reservaciones.length; index++) {
		data[index] = Reservaciones[index];
	}

	return res.status(200).send({ data });
};

exports.UpdateReservacionAuto = async (req, res) => {
	const {
		IdReservacion,
		FechaReserva,
		FechaFinReserva,
		CantDias
	} = req.body;
	const Reservacion = await searchReservacionAuto(connection, IdReservacion);
	if (Reservacion.length === 0) {
		return res.status(404).json('Reservacion no encontrada');
	}
	const dateIngreso = reverse(FechaReserva);
	const dateSalida = reverse(FechaFinReserva);
	// eslint-disable-next-line max-len
	const result = await UReservacionAuto(connection, IdReservacion, dateIngreso, dateSalida, CantDias);
	return res.status(200).send({ data: { msg: 'Edicion de reservacion de Automovil exitoso', resultado: result } });
};

exports.DeleteReservacionAuto = async (req, res) => {
	const {
		IdReserva
	} = req.body;
	const Reservacion = await searchReservacionAuto(connection, IdReserva);
	if (Reservacion.length === 0) {
		return res.status(404).json('Reservacion no encontrada');
	}
	// eslint-disable-next-line max-len
	const result = await DReservacionAuto(connection, IdReserva);
	return res.status(200).send({ data: { msg: 'Reservacion de Automovil eliminada exitosamente', resultado: result } });
};
