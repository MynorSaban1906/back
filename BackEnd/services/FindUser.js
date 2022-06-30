const md5 = require('md5');
const connection = require('../config/connectDb2');
const { searchUserPerfil, EditProfile } = require('./funtionsDb');

exports.verPerfil = async (req, res) => {
	const {
		IdUsuario
	} = req.body;
	const User = await searchUserPerfil(connection, IdUsuario);
	if (User.length === 0) {
		return res.status(400).json('Usuario no encontrado');
	}
	console.log(User[0])
	return res.status(200).send(User[0]);
};

exports.editarPerfil = async (req, res) => {
	const {
		IdUsuario,
		Name,
		Nacimiento,
		Correo,
		Pass
	} = req.body;
	const User = await searchUserPerfil(connection, IdUsuario);
	if (User.length === 0) {
		return res.status(400).json('Usuario no encontrado');
	}
	const passEncrypt = md5(Pass);
	const date = Nacimiento.split('/').reverse().join('/');
	const result = await EditProfile(connection, IdUsuario, Name, date, Correo, passEncrypt);
	return res.status(200).send({ data: { msg: 'Actualización de perfil correcto', Resultado: result } });
};
