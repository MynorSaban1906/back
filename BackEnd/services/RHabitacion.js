const connection = require('../config/connectDb2');
const {
	CReservacionHabitacion,
	RReservacionHabitacion,
	UReservacionHabitacion,
	DReservacionHabitacion,
	searchReservacionHabitacion
} = require('./funtionsDb');

function reverse(s) {
	return s.split('/').reverse().join('/');
}

exports.CreateReservacionHabitacion = async (req, res) => {
	const {
		CantHabitaciones,
		FechaIngreso,
		FechaSalida,
		IdUsuario,
		IdHabitacion
	} = req.body;
	if (CantHabitaciones === '') {
		return res.status(400).json('Es necesario seleccionar cantidad de habitaciones a reservar');
	}
	if (FechaIngreso	 === '') {
		return res.status(400).json('Es necesario Indicar fecha de ingreso al hotel');
	}
	if (FechaSalida === '') {
		return res.status(400).json('Es necesario Indicar fecha de salida del hotel');
	}
	if (IdUsuario === '') {
		return res.status(400).json('Es necesario Indicar que usuario realiza la reservacion');
	}
	if (IdHabitacion === '') {
		return res.status(400).json('Es necesario indicar que habitación quiere reservar');
	}
	const dateIngreso = reverse(FechaIngreso);
	const dateSalida = reverse(FechaSalida);
	// eslint-disable-next-line max-len
	const result = await CReservacionHabitacion(connection, CantHabitaciones, dateIngreso, dateSalida, IdUsuario, IdHabitacion);

	return res.status(200).json({ data: { msg: 'Registro reservacion de habitación exitoso', resultado: result } });
};

exports.ReadReservacionHabitacion = async (req, res) => {
	const Reservaciones = await RReservacionHabitacion(connection);
	const data = {};
	// eslint-disable-next-line no-plusplus
	for (let index = 0; index < Reservaciones.length; index++) {
		data[index] = Reservaciones[index];
	}

	return res.status(200).send({ data });
};

exports.UpdateReservacionHabitacion = async (req, res) => {
	const {
		IdReservacion,
		FechaIngreso,
		FechaSalida,
		CantHabitaciones
	} = req.body;
	const Reservacion = await searchReservacionHabitacion(connection, IdReservacion);
	if (Reservacion.length === 0) {
		return res.status(404).json('Reservacion no encontrada');
	}
	const dateIngreso = reverse(FechaIngreso);
	const dateSalida = reverse(FechaSalida);
	// eslint-disable-next-line max-len
	const result = await UReservacionHabitacion(connection, IdReservacion, dateIngreso, dateSalida, CantHabitaciones);
	return res.status(200).send({ data: { msg: 'Edicion de reservacion de habitación exitoso', resultado: result } });
};

exports.DeleteReservacionHabitacion = async (req, res) => {
	const {
		IdReserva
	} = req.body;
	const Reservacion = await searchReservacionHabitacion(connection, IdReserva);
	if (Reservacion.length === 0) {
		return res.status(404).json('Reservacion no encontrada');
	}
	// eslint-disable-next-line max-len
	const result = await DReservacionHabitacion(connection, IdReserva);
	return res.status(200).send({ data: { msg: 'Reservacion de habitación eliminada exitosamente', resultado: result } });
};
