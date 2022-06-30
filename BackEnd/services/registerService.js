const validation = require('validator');
const md5 = require('md5');

const { insertUsers } = require('./funtionsDb');

// function reverse(s) {
//	return s.split('/').reverse().join('/');
// }

exports.register = async function x(req, res) {
	const {
		Name, Date, Email, Password, TypeUser
	} = req.body;

	// const fechita = reverse(Date);

	if (!validation.isEmail(Email)) {
		res.status(400).json('Email is not valid');
	} else if (Password.length < 8) {
		res.status(400).json('password must be at least 8 characters');
	} else if (Name.length === 0) {
		res.status(400).json('Fields empty');
	} else {
		await insertUsers(Name, Date, Email, md5(Password), TypeUser);
		res.status(200).json('successful registration');
	}
};
