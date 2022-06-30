const md5 = require('md5');

/**
 * pasar contraseña sin encriptar y pasar contraseña encriptada
 * @param {*} passwordPlain
 * @param {*} hashPassword
 */
const compare = async (passwordPlain, hashPassword) => {
	const passEncrypt = md5(passwordPlain);
	let comparacion;
	if (passEncrypt === hashPassword) {
		comparacion = true;
	} else comparacion = false;
	return comparacion;
};

module.exports = { compare };
