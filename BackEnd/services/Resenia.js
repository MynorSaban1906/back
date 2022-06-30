const connection = require('../config/connectDb2');
const {
	CResenia,
	RResenia,
	UResenia,
	DResenia,
	searchResenia,
	searchReseniaServicio
} = require('./funtionsDb');

exports.createResenia = async (req, res) => {
	const {
		Descripcion,
		IdUsuario,
		IdServicio
	} = req.body;
	if (IdServicio === '') {
		return res.status(400).json('Es necesario seleccionar el Proveedor del servicio');
	}
	if (Descripcion	 === '') {
		return res.status(400).json('Es necesario ingresar la descripcion de la reseña');
	}
	if (IdUsuario === '') {
		return res.status(400).json('Es necesario Indicar el usuario que creea la reseña');
	}
	// eslint-disable-next-line max-len
	const result = await CResenia(connection, Descripcion, IdUsuario, IdServicio);

	return res.status(200).json({ data: { msg: 'Registro de Reseña exitoso', resultado: result } });
};

exports.ReadResenia = async (req, res) => {
	const Resenias = await RResenia(connection);
	const data = {};
	// eslint-disable-next-line no-plusplus
	for (let index = 0; index < Resenias.length; index++) {
		data[index] = Resenias[index];
	}

	return res.status(200).send({ data });
};

exports.UpdateResenia = async (req, res) => {
	const {
		IdResenia,
		Descripcion
	} = req.body;
	const Resenia = await searchResenia(connection, IdResenia);
	if (Resenia.length === 0) {
		return res.status(404).json('Resenia no encontrada');
	}
	// eslint-disable-next-line max-len
	const result = await UResenia(connection, IdResenia, Descripcion);

	return res.status(200).send({ data: { msg: 'Edicion de Reseña exitoso', resultado: result } });
};

exports.DeleteResenia = async (req, res) => {
	const {
		IdResenia
	} = req.body;
	const Resenia = await searchResenia(connection, IdResenia);
	if (Resenia.length === 0) {
		return res.status(404).json('Resenia no encontrada');
	}
	// eslint-disable-next-line max-len
	const result = await DResenia(connection, IdResenia);

	return res.status(200).send({ data: { msg: 'Eliminar resenia exitosamente', resultado: result } });
};

exports.ReadReseniaServicio = async (req, res) => {
	const {
		IdServicio
	} = req.body;
	const Resenia = await searchReseniaServicio(connection, IdServicio);
	if (Resenia.length === 0) {
		return res.status(404).json('Resenia no encontradas para este servicio');
	}
	const data = {};
	// eslint-disable-next-line no-plusplus
	for (let index = 0; index < Resenia.length; index++) {
		data[index] = Resenia[index];
	}

	return res.status(200).send({ data });
};
