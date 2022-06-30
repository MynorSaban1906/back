const config = require('config');
const s3 = require('../config/connectS3');
const connection = require('../config/connectDb2');
const AWS = require('aws-sdk')
const {
	CHabitacion,
	RHabitacion,
	UHabitacion,
	DHabitacion,
	searchHabitacion
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

exports.createHabitacion = async (req, res) => {

	const {
		Precio,
		Estado,
		FechaDisponible,
		CantPersonas,
		Imagen64,
		Imagen,
		IdServicio
	} = req.body;

	const nombre = "full-trip-imagenes/" + Imagen
	const nombreCompleto = "https://ayd1-g10-full-trip.s3.amazonaws.com/full-trip-imagenes/" + Imagen
	AWS.config.update({
		region: 'us-east-1',
		accessKeyId: 'AKIAYJE2IZP5FSXLHIW5',
		secretAccessKey: '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'
	});
	var s3 = new AWS.S3();
	const params ={
		Bucket: "ayd1-g10-full-trip",
		Key:nombre,
		Body:Imagen64,
		ContentType: "image"
	};
	s3.putObject(params).promise();
	if (IdServicio === '') {
		return res.status(400).json('Es necesario seleccionar el Proveedor del servicio');
	}
	if (Precio === '') {
		return res.status(400).json('Es necesario Indicar el precio del servicio');
	}
	if (Estado === '') {
		return res.status(400).json('Es necesario Indicar el estado del servicio');
	}
	if (FechaDisponible === '') {
		return res.status(400).json('Es necesario Indicar la fecha disponible para el servicio');
	}
	if (CantPersonas === '') {
		return res.status(400).json('Es necesario indicar cantidad de personas');
	}
	if (Imagen === '') {
		return res.status(400).json('Es necesario seleccionar imagen para el servicio');
	}
	const date = reverse(FechaDisponible);
	const imagenS3 = bucketS3(Imagen);
	// eslint-disable-next-line max-len
	const result = await CHabitacion(connection, Precio, Estado, date, CantPersonas, imagenS3, IdServicio);

	return res.status(200).json({ data: { msg: 'Registro de habitación exitoso', resultado: result } });
};

exports.ReadHabitacion = async (req, res) => {
	const Habitaciones = await RHabitacion(connection);
	const data = [];
	// eslint-disable-next-line no-plusplus
	for (let index = 0; index < Habitaciones.length; index++) {
		data[index] = Habitaciones[index];
	}
	return res.status(200).send({ data });
};

exports.UpdateHabitacion = async (req, res) => {
	const {
		IdHabitacion,
		Precio,
		Estado,
		FechaDisponible,
		CantPersonas,
		Imagen
	} = req.body;
	const Habitacion = await searchHabitacion(connection, IdHabitacion);
	if (Habitacion.length === 0) {
		return res.status(404).json('Habitacion no encontrada');
	}
	const imagenS3 = bucketS3(Imagen);
	const date = reverse(FechaDisponible);
	// eslint-disable-next-line max-len
	const result = await UHabitacion(connection, IdHabitacion, Precio, Estado, date, CantPersonas, imagenS3);

	return res.status(200).send({ result });
};

exports.DeleteHabitacion = async (req, res) => {
	const {
		IdHabitacion
	} = req.body;
	const Habitacion = await searchHabitacion(connection, IdHabitacion);
	if (Habitacion.length === 0) {
		return res.status(404).json('Habitacion no encontrada');
	}
	// eslint-disable-next-line max-len
	const result = await DHabitacion(connection, IdHabitacion);

	return res.status(200).send({ result });
};
