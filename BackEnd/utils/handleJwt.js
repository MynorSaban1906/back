const jwt = require('jsonwebtoken');

/**
 * se necesita el objeto del usuario.
 * @param {*} user
 */
const tokenSign = async (user) => {
	const sign = await jwt.sign(
		{
			_id: user.id,
			role: user.tipo
		},
		`${process.env.JWT_SECRET}`,
		{
			expiresIn: '2h'
		}
	);

	return sign;
};

/*

const verifyToken = async (tokenJwt) => {
	try {
		return jwt.verify(tokenJwt, `${process.env.JWT_SECRET}`);
	} catch (e) {
		return null;
	}
};
*/

module.exports = { tokenSign };
