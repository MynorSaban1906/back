function registroServicios(connection, nombre, correo, password, ciudad, estado) {
	const sql = `INSERT INTO Servicio(Nombre, Correo, Pass, Serviciocol, Ciudad_Id_Ciudad, TipoServicio_id_Tipo, Estado) Values(
		'${nombre}','${correo}','${password}', 'data1', ${ciudad}, ${estado},0 );`;

	// eslint-disable-next-line consistent-return
	connection.query(sql, (err, result) => {
		if (err) {
			console.log(err+ 'Error: No fue posible conectarse a la BD en la nube!');
		} else return result;
	});
}


module.exports = registroServicios;
