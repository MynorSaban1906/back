/* eslint-disable no-console */
const mysql = require('mysql');
const config = require('config');

// crea la conexion a la base de datos de la pc o maquina virtual
const pool = mysql.createPool({
	host: config.Database.host,
	user: config.Database.user,
	password: config.Database.password,
	database: config.Database.database,
	port: config.Database.port
});

const query = (sql) => new Promise((resolve, reject) => {
	pool.getConnection((err, conexion) => {
		if (err) {
			reject(err);
		} else {
			conexion.query(sql, (error, rows) => {
				if (error) {
					reject(error);
				} else {
					resolve(rows);
				}
				// finaliza la sesión
				conexion.release();
			});
		}
	});
});

module.exports = query;
