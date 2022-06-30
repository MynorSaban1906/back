const md5 = require('md5');
const registroServicios = require('./RepositorioBD');
const connection = require('../config/connectDb2');

exports.registroServicios = async (req, res) => {
	const {
		nombre, correo, password, ciudad, estado
	} = req.body;
	if (!password.toString().match(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/) && password.length < 8) {
		return res.status(400).json('Error: No cumple con patron de 8 caracters...');
	}
	if (!correo.toString().match(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)) {
		return res.status(400).json('Error: No cumple patron para correo');
	}
	registroServicios(connection, nombre, correo, md5(password), ciudad, estado);
	return res.status(200).json('Mensaje: ¡Registro de usuario Exitoso !');
};
