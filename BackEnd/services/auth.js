// agregar el compare en el const de acá abajo
const validation = require('validator');
const connection = require('../config/connectDb2');
const { searchUser } = require('./funtionsDb');
const { compare } = require('../utils/handlePassword');
const { tokenSign } = require('../utils/handleJwt');

/* exports.authCTRL = async (req, res) => {
	const info = req.body;
	const password = await encrypt(info.password);
	const body = { ...info, password };
	const data = {
		token: await tokenSign(body),
		user: body
	};
	return res.status(200).json({ data });
}; */

exports.LoginCTRL = async (req, res) => {
	const {
		Email, Password
	} = req.body;
	const User = await searchUser(connection, Email);
	if (!validation.isEmail(Email)) {
		return res.status(400).json('Email is not valid');
	}
	if (!User) {
		return res.status(404).json('Usuario no encontrado');
	}
	const passEncriptada = User.Pass;
	const check = await compare(Password, passEncriptada);
	if (!check) {
		return res.status(402).json('La contraseña no es correcta');
	}

	const data = {
		token: await tokenSign(User),
		User: {
			Id_user: User.Id_Usuario,
			Name: User.Nombre,
			Nacimiento: User.FechaNacimiento,
			Correo: User.Correo,
			Tipo_user: User.TipoUsuario_Id_Tipo
		}
	};

	return res.status(200).send({ data });
};
