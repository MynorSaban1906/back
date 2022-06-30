const config = require('config');
const s3 = require('../config/connectS3');
const connection = require('../config/connectDb2');
const {
	CVuelo,
	RVuelo,
	UVuelo,
	DVuelo,
	searchVuelo
} = require('./funtionsDb');

function reverse(s) {
	return s.split('/').reverse().join('/');
}

function bucketS3(foto) {
	const date = new Date();
	const output = `${date.getFullYear()}${date.getMonth() + 1}${date.getDay()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
	const nameImage = `${output}`;
	const nombrei = `${s3.carpeta}/${nameImage}.png`; // fotos -> se llama la carpeta
	const nombreCompleto = `https://ayd1-g10-full-trip.s3.amazonaws.com/${nombrei}`;
	s3.uploadFile(nombrei, foto);
	return nombreCompleto;
}

exports.createVuelo = async (req, res) => {
	const {
		FechaVuelo,
		AsientosDisponibles,
		Precio,
		IdServicio,
		IdCiudad,
		Imagen
	} = req.body;
	if (FechaVuelo === '') {
		return res.status(400).json('Es necesario seleccionar la fecha del vuelo');
	}
	if (AsientosDisponibles	 === '') {
		return res.status(400).json('Es necesario Indicar la canticad de asientos');
	}
	if (Precio === '') {
		return res.status(400).json('Es necesario Indicar el precio del vuelo');
	}
	if (IdServicio === '') {
		return res.status(400).json('Es necesario Indicar el proveedor del servicio');
	}
	if (IdCiudad === '') {
		return res.status(400).json('Es necesario indicar la Ciudad de destino');
	}
	if (Imagen === '') {
		return res.status(400).json('Es necesario indicar la imagen del servicio');
	}
	const imagenS3 = bucketS3(Imagen);
	const date = reverse(FechaVuelo);
	// eslint-disable-next-line max-len
	const result = await CVuelo(connection, date, AsientosDisponibles, Precio, IdServicio, IdCiudad, imagenS3);

	return res.status(200).json({ data: { msg: 'Registro de Vuelo exitoso', resultado: result } });
};

exports.ReadVuelo = async (req, res) => {
	const Vuelos = await RVuelo(connection);
	if (!Vuelos) {
		return res.status(404).json('Vuelos no encontrados');
	}
	const data = [];
	// eslint-disable-next-line no-plusplus
	for (let index = 0; index < Vuelos.length; index++) {
		data[index] = Vuelos[index];
	}

	return res.status(200).send({ data });
};

exports.UpdateVuelo = async (req, res) => {
	const {
		IdVuelo,
		FechaVuelo,
		AsientosDisponibles,
		Precio,
		IdCiudad,
		Imagen,
		Activo
	} = req.body;
	const Vuelo = await searchVuelo(connection, IdVuelo);
	if (Vuelo.length === 0) {
		return res.status(404).json('Vuelo no encontrado');
	}
	const imagenS3 = bucketS3(Imagen);
	const date = reverse(FechaVuelo);
	// eslint-disable-next-line max-len
	const result = await UVuelo(connection, IdVuelo, date, AsientosDisponibles, Precio, IdCiudad, imagenS3, Activo);

	return res.status(200).send({ data: { msg: 'Actualización de Vuelo correcto', Resultado: result } });
};

exports.DeleteVuelo = async (req, res) => {
	const {
		IdVuelo
	} = req.body;
	const Vuelo = await searchVuelo(connection, IdVuelo);
	if (Vuelo.length === 0) {
		return res.status(404).json('Vuelo no encontrada');
	}
	// eslint-disable-next-line max-len
	const result = await DVuelo(connection, IdVuelo);

	return res.status(200).send({ data: { msg: 'Vuelo Eliminado correctamente', Resultado: result } });
};
