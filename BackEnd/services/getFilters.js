const {
	getMarcaVehicles,
	getModelVehicles,
	getFiltersVehicles,
	getCiudadHotel,
	getPaisHotel,
	getPersonaHotel,
	getFechaHotel,
	getDestinoVuelo,
	getPrecioVuelo
} = require('./funtionsDb');

const { Marca, Model } = require('../utils/data');

// filtro para vehiculos
exports.getMarcaVehicles = async (req, res) => {
	const marca = req.params.MARCA;
	const result = await getMarcaVehicles(marca);
	return res.status(200).send(result);
};

exports.getModeloVehicles = async (req, res) => {
	const model = req.params.MODELO;
	const result = await getModelVehicles(model);
	return res.status(200).send(result);
};

exports.getFilterVehicles = async (req, res) => {
	const { model, marca, price } = req.query;

	const result = await getFiltersVehicles(model, marca, price);
	return res.status(200).send(result);
};

exports.getVehiclesMarca = async (req, res) => res.status(200).send({ 'Marca': Marca });
exports.getVehiclesModelo = async (req, res) => res.status(200).send({ 'Modelo': Model });

// filtro para los hoteles pais, ciudad, cant. personas, rango fecha

exports.getPaisHotel = async (req, res) => {
	const marca = req.params.pais;
	const result = await getPaisHotel(marca);
	return res.status(200).send(result);
};

exports.getCiudadHotel = async (req, res) => {
	const model = req.params.ciudad;
	const result = await getCiudadHotel(model);
	return res.status(200).send(result);
};

exports.getPersonaHotel = async (req, res) => {
	const model = req.params.persona;
	const result = await getPersonaHotel(model);
	return res.status(200).send(result);
};

exports.getFechaHotel = async (req, res) => {
	const { fechaI, fechaF } = req.query;
	const result = await getFechaHotel(fechaI, fechaF);
	return res.status(200).send(result);
};

// filtro para vuelos
exports.getDestinoVuelo = async (req, res) => {
	const { destino } = req.params;
	const result = await getDestinoVuelo(destino);
	return res.status(200).send(result);
};

exports.getPreciosVuelos = async (req, res) => {
	const { precioI, precioF } = req.query;
	const result = await getPrecioVuelo(precioI, precioF);
	return res.status(200).send(result);
};
