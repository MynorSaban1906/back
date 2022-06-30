const connection = require('../config/connectDb2');
const {
	CReservacionVuelo,
	RReservacionVuelo,
	UReservacionVuelo,
	DReservacionVuelo,
	searchReservacionVuelo
} = require('./funtionsDb');

function reverse(s) {
	return s.split('/').reverse().join('/');
}

exports.CreateReservacionVuelo = async (req, res) => {
	const {
		CantAsientos,
		FechaReserva,
		FechaFinReserva,
		IdUsuario,
		IdVuelo
	} = req.body;
	if (CantAsientos === '') {
		return res.status(400).json('Es necesario seleccionar cantidad de asientos a reservar');
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
	if (IdVuelo === '') {
		return res.status(400).json('Es necesario indicar que vuelo quiere reservar');
	}
	const dateReserva = reverse(FechaReserva);
	const dateFinReserva = reverse(FechaFinReserva);
	// eslint-disable-next-line max-len
	const result = await CReservacionVuelo(connection, CantAsientos, dateReserva, dateFinReserva, IdUsuario, IdVuelo);

	return res.status(200).json({ data: { msg: 'Registro reservacion de vuelo exitoso', resultado: result } });
};

exports.ReadReservacionVuelo = async (req, res) => {
	const Reservaciones = await RReservacionVuelo(connection);
	const data = {};
	// eslint-disable-next-line no-plusplus
	for (let index = 0; index < Reservaciones.length; index++) {
		data[index] = Reservaciones[index];
	}

	return res.status(200).send({ data });
};

exports.UpdateReservacionVuelo = async (req, res) => {
	const {
		IdReservacion,
		FechaReserva,
		FechaFinReserva,
		CantAsientos
	} = req.body;
	const Reservacion = await searchReservacionVuelo(connection, IdReservacion);
	if (Reservacion.length === 0) {
		return res.status(404).json('Reservacion no encontrada');
	}
	const dateIngreso = reverse(FechaReserva);
	const dateSalida = reverse(FechaFinReserva);
	// eslint-disable-next-line max-len
	const result = await UReservacionVuelo(connection, IdReservacion, dateIngreso, dateSalida, CantAsientos);
	return res.status(200).send({ data: { msg: 'Edicion de reservacion de VUELO exitoso', resultado: result } });
};

exports.DeleteReservacionVuelo = async (req, res) => {
	const {
		IdReserva
	} = req.body;
	const Reservacion = await searchReservacionVuelo(connection, IdReserva);
	if (Reservacion.length === 0) {
		return res.status(404).json('Reservacion no encontrada');
	}
	// eslint-disable-next-line max-len
	const result = await DReservacionVuelo(connection, IdReserva);
	return res.status(200).send({ data: { msg: 'Reservacion de Vuelo eliminada exitosamente', resultado: result } });
};
