const mysql = require('mysql');
const config = require('config');

const connection = mysql.createConnection({
	host: config.Database.host,
	user: config.Database.user,
	password: config.Database.password,
	database: config.Database.database,
	port: config.Database.port
});

connection.connect((err) => {
	if (err) console.log(`Error al conectarse a la base de datos!\nERROR: ${err}`);
	else console.log('Conexión a la base de datos establecida');
});

module.exports = connection;
