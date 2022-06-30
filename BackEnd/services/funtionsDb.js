/* eslint-disable max-len */
const query = require('../config/connectDb');

const insertUsers = async (Name, Date, Email, Password, TypeUser) => {
	const sql = `INSERT INTO Usuario(nombre, FechaNacimiento, Correo, Pass, TipoUsuario_Id_Tipo)
	Values('${Name}','${Date}','${Email}','${Password}',${TypeUser});`;

	const rows = await query(sql);
	return rows;
};

const searchUser = async (connection, Email) => new Promise((resolve, reject) => {
	const sql = `Select * from Usuario where Correo='${Email}'
	union 
	Select Id_Servicio as Id_Usuario, Nombre as Nombre, '01/01/2000' as FechaNacimiento, Correo as Correo , 
	Pass as Pass, '3' as TipoUsuario_Id_Tipo
	from Servicio where Correo = '${Email}'`;
	connection.query(sql, (error, results) => {
		if (error) return reject(error);
		const data = { results };
		return resolve(data.results[0]);
	});
});

const searchUserPerfil = async (connection, Iduser) => new Promise((resolve, reject) => {
	const sql = `Select * from Usuario where Id_Usuario='${Iduser}'`;
	connection.query(sql, (error, results) => {
		if (error) return reject(error);
		return resolve(results);
	});
});

const EditProfile = async (connection, Iduser, Name, Birth, email, pass) => new Promise((resolve, reject) => {
	const Fecha = Birth.toString();
	const sql = `update Usuario SET Nombre = '${Name}', FechaNacimiento =DATE('${Fecha}'), Correo = '${email}', Pass = '${pass}' where Id_Usuario = '${Iduser}'`;

	connection.query(sql, (error, results) => {
		if (error) return reject(error);
		const data = { results };
		return resolve(data.results[0]);
	});
});

const getServices = async (connection) => new Promise((resolve, reject) => {
	const sql = 'Select * from Servicio;';

	connection.query(sql, (error, results) => {
		if (error) return reject(error);
		const data = { results };
		return resolve(data.results);
	});
});

const getServicesStatus = async (connection, status) => new Promise((resolve, reject) => {
	const sql = `Select * from Servicio where Estado = ${status}; `;

	connection.query(sql, (error, results) => {
		if (error) return reject(error);
		const data = { results };
		return resolve(data.results);
	});
});

const getMarcaVehicles = async (Marca) => {
	const sql = `Select * from Automovil where Marca='${Marca}';`;
	const rows = await query(sql);
	return rows;
};

const getModelVehicles = async (Model) => {
	const sql = `Select * from Automovil where Modelo=${Model};`;
	const rows = await query(sql);
	return rows;
};

const getFiltersVehicles = async (model, marca, price) => {
	const sql = `Select * from Automovil where Modelo=${model} and Marca = '${marca}' and Precio = ${price};`;
	const rows = await query(sql);
	return rows;
};

// filtro para hotel
const getPaisHotel = async (pais) => {
	const sql = `	
				select * from Servicio s
				inner join Ciudad c 
				on c.Id_Ciudad = s.Ciudad_Id_Ciudad 
				inner join Pais p 
				on p.Id_Pais =c.Pais_Id_Pais 
				inner join Habitacion h
				on h.Id_Habitacion = s.id_Servicio
				where p.Nombre = '${pais}' 
				and TipoServicio_Id_Tipo= 1
				and h.Activa= '0' ;`;
	const rows = await query(sql);
	return rows;
};

const getCiudadHotel = async (ciudad) => {
	const sql = `	
				select * from Servicio s
				inner join Ciudad c 
				on c.Id_Ciudad = s.Ciudad_Id_Ciudad 
				inner join Pais p 
				on p.Id_Pais =c.Pais_Id_Pais
				inner join Habitacion h
				on h.Id_Habitacion = s.id_Servicio 
				where c.Nombre = '${ciudad}'  and TipoServicio_Id_Tipo= 1 and h.Activa= '0' ;`;
	const rows = await query(sql);
	return rows;
};

const getPersonaHotel = async (cantPersonas) => {
	const sql = `	
				select * from Servicio s
				inner join Ciudad c 
				on c.Id_Ciudad = s.Ciudad_Id_Ciudad 
				inner join Pais p 
				on p.Id_Pais =c.Pais_Id_Pais 
				inner join Habitacion h 
				on h.Servicio_Id_Servicio = s.Id_Servicio 
				where h.CantPersonas = ${cantPersonas} and TipoServicio_Id_Tipo= 1 
				and h.Activa= '0' ;`;
	const rows = await query(sql);
	return rows;
};

const getFechaHotel = async (fecha1, fecha2) => {
	const sql = `	
				select * from Servicio s
				inner join Ciudad c 
				on c.Id_Ciudad = s.Ciudad_Id_Ciudad 
				inner join Pais p 
				on p.Id_Pais =c.Pais_Id_Pais 
				inner join Habitacion h 
				on h.Servicio_Id_Servicio = s.Id_Servicio 
				where  (h.FechaDisponibilidad BETWEEN '${fecha1}' and '${fecha2}') 
				and TipoServicio_Id_Tipo= 1 
				and h.Activa= '0' ;`;
	const rows = await query(sql);
	return rows;
};

// filtro para vuelo

const getDestinoVuelo = async (Nombre) => {
	const sql = `	
				select * from Vuelo v
				inner join Ciudad c 
				on c.Id_Ciudad = v.Ciudad_Id_Ciudad 
				where c.Nombre = '${Nombre}'
				and v.Activo= '0';`;
	const rows = await query(sql);
	return rows;
};

const getPrecioVuelo = async (precio1, precio2) => {
	const sql = `	
				select * from Vuelo v
				inner join Ciudad c 
				on c.Id_Ciudad = v.Ciudad_Id_Ciudad 
				where (v.Precio BETWEEN ${precio1} and ${precio2}) and v.Activo = '0';`;
	const rows = await query(sql);
	return rows;
};

const searchCity = async (connection) => new Promise((resolve, reject) => {
	const sql = `Select Ciudad.Nombre as Ciudad, Ciudad.Id_Ciudad as IdCiudad, Pais.Nombre as Pais, Pais.Id_Pais as IdPais from Ciudad
				inner join Pais on Ciudad.Pais_Id_Pais = Pais.Id_Pais`;
	connection.query(sql, (error, results) => {
		if (error) return reject(error);
		return resolve(results);
	});
});

const CHabitacion = async (connection, Precio, Estado, FechaDisponible, CantPersonas, Imagen, IdServicio) => new Promise((resolve, reject) => {
	const sql = `INSERT INTO Habitacion (Precio, Estado, FechaDisponibilidad, CantPersonas, Servicio_Id_Servicio, img, Activa)
				 VALUES ('${Precio}','${Estado}','${FechaDisponible}','${CantPersonas}','${IdServicio}','${Imagen}', '1')`;
	connection.query(sql, (error, results) => {
		if (error) return reject(error);
		const data = { results };
		return resolve(data);
	});
});

const RHabitacion = async (connection) => new Promise((resolve, reject) => {
	// eslint-disable-next-line quotes
	const sql = `SELECT * FROM Habitacion`;
	connection.query(sql, (error, results) => {
		if (error) return reject(error);
		return resolve(results);
	});
});

const searchHabitacion = async (connection, IdHabitacion) => new Promise((resolve, reject) => {
	const sql = `Select * from Habitacion where Id_Habitacion='${IdHabitacion}'`;
	connection.query(sql, (error, results) => {
		if (error) return reject(error);
		return resolve(results);
	});
});

const UHabitacion = async (connection, IdHabitacion, Precio, Estado, date, CantPersonas, Imagen) => new Promise((resolve, reject) => {
	const Fecha = date.toString();
	const sql = `update Habitacion SET Precio = '${Precio}', FechaDisponibilidad =DATE('${Fecha}'), 
	Estado = '${Estado}', CantPersonas = '${CantPersonas}', img = '${Imagen}' where Id_Habitacion = '${IdHabitacion}'`;
	connection.query(sql, (error, results) => {
		if (error) return reject(error);
		const data = { results };
		return resolve(data.results[0]);
	});
});

const DHabitacion = async (connection, IdHabitacion) => new Promise((resolve, reject) => {
	const sql = `update Habitacion SET Activa = 0 where Id_Habitacion = '${IdHabitacion}'`;
	connection.query(sql, (error, results) => {
		if (error) return reject(error);
		const data = { results };
		return resolve(data.results[0]);
	});
});

const CAutomovil = async (connection, Marca, Placa, Modelo, Precio, date, IdServicio, Imagen) => new Promise((resolve, reject) => {
	const sql = `INSERT INTO Automovil (Marca, Placa, Modelo, Precio, FechaDisponible, Servicio_Id_Servicio, img)
				 VALUES ('${Marca}','${Placa}','${Modelo}','${Precio}','${date}','${IdServicio}', '${Imagen}')`;
	connection.query(sql, (error, results) => {
		if (error) return reject(error);
		const data = { results };
		return resolve(data);
	});
});

const RAutomovil = async (connection) => new Promise((resolve, reject) => {
	// eslint-disable-next-line quotes
	const sql = `SELECT * FROM Automovil`;
	connection.query(sql, (error, results) => {
		if (error) return reject(error);
		return resolve(results);
	});
});

const UAutomovil = async (connection, IdAutomovil, Marca, Placa, Modelo, Precio, date, Imagen, Estado, Activo) => new Promise((resolve, reject) => {
	const Fecha = date.toString();
	const sql = `update Automovil SET Marca = '${Marca}', Placa = '${Placa}',Modelo = '${Modelo}', Precio = '${Precio}', FechaDisponible =DATE('${Fecha}'), 
	Estado = '${Estado}', Activo = '${Activo}', img = '${Imagen}' where Id_Auto = '${IdAutomovil}'`;
	connection.query(sql, (error, results) => {
		if (error) return reject(error);
		const data = { results };
		return resolve(data.results[0]);
	});
});

const DAutomovil = async (connection, IdAutomovil) => new Promise((resolve, reject) => {
	const sql = `update Automovil SET Activo = 0 where Id_Auto = '${IdAutomovil}'`;
	connection.query(sql, (error, results) => {
		if (error) return reject(error);
		const data = { results };
		return resolve(data.results[0]);
	});
});

const searchAutomovil = async (connection, IdAutomovil) => new Promise((resolve, reject) => {
	const sql = `Select * from Automovil where Id_Auto='${IdAutomovil}'`;
	connection.query(sql, (error, results) => {
		if (error) return reject(error);
		return resolve(results);
	});
});

const CVuelo = async (connection, date, AsientosDisponibles, Precio, IdServicio, IdCiudad, Imagen) => new Promise((resolve, reject) => {
	const sql = `INSERT INTO Vuelo (FechaVuelo, AsientosDisponibles, Precio, Servicio_Id_Servicio, Ciudad_Id_Ciudad, img)
				 VALUES ('${date}','${AsientosDisponibles}','${Precio}','${IdServicio}','${IdCiudad}','${Imagen}')`;
	connection.query(sql, (error, results) => {
		if (error) return reject(error);
		const data = { results };
		return resolve(data);
	});
});

const RVuelo = async (connection) => new Promise((resolve, reject) => {
	// eslint-disable-next-line quotes
	const sql = `SELECT * FROM Vuelo`;
	connection.query(sql, (error, results) => {
		if (error) return reject(error);
		return resolve(results);
	});
});

const UVuelo = async (connection, IdVuelo, date, AsientosDisponibles, Precio, IdCiudad, Imagen, Activo) => new Promise((resolve, reject) => {
	const Fecha = date.toString();
	const sql = `update Vuelo SET FechaVuelo = '${Fecha}', AsientosDisponibles = '${AsientosDisponibles}',Precio = '${Precio}', Ciudad_Id_Ciudad = '${IdCiudad}', 
	 Activo = '${Activo}', img = '${Imagen}' where Id_Vuelo = '${IdVuelo}'`;
	connection.query(sql, (error, results) => {
		if (error) return reject(error);
		const data = { results };
		return resolve(data.results[0]);
	});
});

const DVuelo = async (connection, IdVuelo) => new Promise((resolve, reject) => {
	const sql = `update Vuelo SET Activo = 0 where Id_Vuelo = '${IdVuelo}'`;
	connection.query(sql, (error, results) => {
		if (error) return reject(error);
		const data = { results };
		return resolve(data.results[0]);
	});
});

const searchVuelo = async (connection, IdVuelo) => new Promise((resolve, reject) => {
	const sql = `Select * from Vuelo where Id_Vuelo='${IdVuelo}'`;
	connection.query(sql, (error, results) => {
		if (error) return reject(error);
		return resolve(results);
	});
});

const CReservacionHabitacion = async (connection, CantHabitaciones, dateIngreso, dateSalida, IdUsuario, IdHabitacion) => new Promise((resolve, reject) => {
	const sql = `INSERT INTO ReservaHotel (CantHabitaciones, FechaIngreso, fechaSalida, Usuario_Id_Usuario, Habitacion_Id_Habitacion)
				 VALUES ('${CantHabitaciones}','${dateIngreso}','${dateSalida}','${IdUsuario}','${IdHabitacion}')`;
	connection.query(sql, (error, results) => {
		if (error) return reject(error);
		const data = { results };
		return resolve(data);
	});
});

const RReservacionHabitacion = async (connection) => new Promise((resolve, reject) => {
	// eslint-disable-next-line quotes
	const sql = `SELECT * FROM ReservaHotel`;
	connection.query(sql, (error, results) => {
		if (error) return reject(error);
		return resolve(results);
	});
});

const searchReservacionHabitacion = async (connection, IdReservacion) => new Promise((resolve, reject) => {
	const sql = `Select * from ReservaHotel where Id_Reserva='${IdReservacion}'`;
	connection.query(sql, (error, results) => {
		if (error) return reject(error);
		return resolve(results);
	});
});

const UReservacionHabitacion = async (connection, IdReservacion, dateIngreso, dateSalida, CantHabitaciones) => new Promise((resolve, reject) => {
	const Fecha = dateIngreso.toString();
	const sql = `update ReservaHotel SET FechaIngreso = DATE('${Fecha}'), fechaSalida =DATE('${dateSalida}'), CantHabitaciones= '${CantHabitaciones}'
	where Id_Reserva = '${IdReservacion}'`;
	connection.query(sql, (error, results) => {
		if (error) return reject(error);
		const data = { results };
		return resolve(data.results[0]);
	});
});

const DReservacionHabitacion = async (connection, IdReservacion) => new Promise((resolve, reject) => {
	const sql = `update ReservaHotel SET Estado = 0 where Id_Reserva = '${IdReservacion}'`;
	connection.query(sql, (error, results) => {
		if (error) return reject(error);
		const data = { results };
		return resolve(data.results[0]);
	});
});

const CReservacionVuelo = async (connection, CantAsientos, dateReserva, dateFinReserva, IdUsuario, IdVuelo) => new Promise((resolve, reject) => {
	const sql = `INSERT INTO ReservaVuelo (CantAsientos, FechaReserva, FechaFinReserva, Usuario_Id_Usuario, Vuelo_Id_Vuelo)
				 VALUES ('${CantAsientos}','${dateReserva}','${dateFinReserva}','${IdUsuario}','${IdVuelo}')`;
	connection.query(sql, (error, results) => {
		if (error) return reject(error);
		const data = { results };
		return resolve(data);
	});
});

const RReservacionVuelo = async (connection) => new Promise((resolve, reject) => {
	// eslint-disable-next-line quotes
	const sql = `SELECT * FROM ReservaVuelo`;
	connection.query(sql, (error, results) => {
		if (error) return reject(error);
		return resolve(results);
	});
});

const searchReservacionVuelo = async (connection, IdReservacion) => new Promise((resolve, reject) => {
	const sql = `Select * from ReservaVuelo where Id_Reserva='${IdReservacion}'`;
	connection.query(sql, (error, results) => {
		if (error) return reject(error);
		return resolve(results);
	});
});

const UReservacionVuelo = async (connection, IdReservacion, dateIngreso, dateSalida, CantAsientos) => new Promise((resolve, reject) => {
	const Fecha = dateIngreso.toString();
	const sql = `update ReservaVuelo SET FechaReserva = DATE('${Fecha}'), FechaFinReserva =DATE('${dateSalida}'), CantAsientos= '${CantAsientos}'
	where Id_Reserva = '${IdReservacion}'`;
	connection.query(sql, (error, results) => {
		if (error) return reject(error);
		const data = { results };
		return resolve(data.results[0]);
	});
});

const DReservacionVuelo = async (connection, IdReservacion) => new Promise((resolve, reject) => {
	const sql = `update ReservaVuelo SET Estado = 0 where Id_Reserva = '${IdReservacion}'`;
	connection.query(sql, (error, results) => {
		if (error) return reject(error);
		const data = { results };
		return resolve(data.results[0]);
	});
});

const CReservacionAuto = async (connection, CantDias, dateReserva, dateFinReserva, IdUsuario, IdAuto) => new Promise((resolve, reject) => {
	const sql = `INSERT INTO ReservaAuto (CantDias, FechaReserva, FechaFinReserva, Usuario_Id_Usuario, Automovil_Id_Auto)
				 VALUES ('${CantDias}','${dateReserva}','${dateFinReserva}','${IdUsuario}','${IdAuto}')`;
	connection.query(sql, (error, results) => {
		if (error) return reject(error);
		const data = { results };
		return resolve(data);
	});
});

const RReservacionAuto = async (connection) => new Promise((resolve, reject) => {
	// eslint-disable-next-line quotes
	const sql = `SELECT * FROM ReservaAuto`;
	connection.query(sql, (error, results) => {
		if (error) return reject(error);
		return resolve(results);
	});
});

const searchReservacionAuto = async (connection, IdReservacion) => new Promise((resolve, reject) => {
	const sql = `Select * from ReservaAuto where Id_Reserva='${IdReservacion}'`;
	connection.query(sql, (error, results) => {
		if (error) return reject(error);
		return resolve(results);
	});
});

const UReservacionAuto = async (connection, IdReservacion, dateIngreso, dateSalida, CantDias) => new Promise((resolve, reject) => {
	const Fecha = dateIngreso.toString();
	const sql = `update ReservaAuto SET FechaReserva = DATE('${Fecha}'), FechaFinReserva =DATE('${dateSalida}'), CantDias= '${CantDias}'
	where Id_Reserva = '${IdReservacion}'`;
	connection.query(sql, (error, results) => {
		if (error) return reject(error);
		const data = { results };
		return resolve(data.results[0]);
	});
});

const DReservacionAuto = async (connection, IdReservacion) => new Promise((resolve, reject) => {
	const sql = `update ReservaAuto SET Estado = 0 where Id_Reserva = '${IdReservacion}'`;
	connection.query(sql, (error, results) => {
		if (error) return reject(error);
		const data = { results };
		return resolve(data.results[0]);
	});
});

const getReservasHotelUsuario = async (connection, IdUsuario) => new Promise((resolve, reject) => {
	const sql = `SELECT * FROM ReservaHotel where Usuario_Id_Usuario ='${IdUsuario}'`;
	connection.query(sql, (error, results) => {
		if (error) return reject(error);
		return resolve(results);
	});
});

const getReservasVueloUsuario = async (connection, IdUsuario) => new Promise((resolve, reject) => {
	const sql = `SELECT * FROM ReservaVuelo where Usuario_Id_Usuario ='${IdUsuario}'`;
	connection.query(sql, (error, results) => {
		if (error) return reject(error);
		return resolve(results);
	});
});

const getReservasAutoUsuario = async (connection, IdUsuario) => new Promise((resolve, reject) => {
	const sql = `SELECT * FROM ReservaAuto where Usuario_Id_Usuario ='${IdUsuario}'`;
	connection.query(sql, (error, results) => {
		if (error) return reject(error);
		return resolve(results);
	});
});

const CResenia = async (connection, Descripcion, IdUsuario, IdServicio) => new Promise((resolve, reject) => {
	const sql = `INSERT INTO Resenia (Descripcion, Usuario_Id_Usuario, Servicio_Id_Servicio)
				 VALUES ('${Descripcion}','${IdUsuario}','${IdServicio}')`;
	connection.query(sql, (error, results) => {
		if (error) return reject(error);
		const data = { results };
		return resolve(data);
	});
});

const RResenia = async (connection) => new Promise((resolve, reject) => {
	// eslint-disable-next-line quotes
	const sql = `SELECT * FROM Resenia`;
	connection.query(sql, (error, results) => {
		if (error) return reject(error);
		return resolve(results);
	});
});

const searchResenia = async (connection, IdResenia) => new Promise((resolve, reject) => {
	const sql = `Select * from Resenia where Id_Resenia='${IdResenia}'`;
	connection.query(sql, (error, results) => {
		if (error) return reject(error);
		return resolve(results);
	});
});

const UResenia = async (connection, IdResenia, Descripcion) => new Promise((resolve, reject) => {
	const sql = `update Resenia SET Descripcion = '${Descripcion}' where Id_Resenia = '${IdResenia}'`;
	connection.query(sql, (error, results) => {
		if (error) return reject(error);
		const data = { results };
		return resolve(data.results[0]);
	});
});

const DResenia = async (connection, IdResenia) => new Promise((resolve, reject) => {
	const sql = `update Resenia SET Estado = 0 where Id_Resenia = '${IdResenia}'`;
	connection.query(sql, (error, results) => {
		if (error) return reject(error);
		const data = { results };
		return resolve(data.results[0]);
	});
});

const searchReseniaServicio = async (connection, IdServicio) => new Promise((resolve, reject) => {
	const sql = `Select * from Resenia where Servicio_Id_Servicio='${IdServicio}'`;
	connection.query(sql, (error, results) => {
		if (error) return reject(error);
		return resolve(results);
	});
});

const AprobarServicio = async (connection, Estado, IdServicio) => new Promise((resolve, reject) => {
	
	const sql = `update Servicio SET Estado = '${Estado}'  where Id_Servicio = '${IdServicio}'`;
	connection.query(sql, (error, results) => {
		if (error) return reject(error);
		const data = { results };
		return resolve(data.results[0]);
	});
});

const ModificarServicio = async (connection, Nombre, Correo, Contra, Direccion, Tipo,  IdServicio) => new Promise((resolve, reject) => {
	
	const sql = `update Servicio SET Nombre = '${Nombre}', Correo = '${Correo}', Pass = '${Contra}', Ciudad_Id_Ciudad = '${Direccion}', TipoServicio_Id_Tipo = '${Tipo}'  where Id_Servicio = '${IdServicio}'`;
	connection.query(sql, (error, results) => {
		if (error) return reject(error);
		const data = { results };
		return resolve(data.results[0]);
	});
});

module.exports = {
	insertUsers,
	searchUser,
	getServices,
	getServicesStatus,
	getMarcaVehicles,
	getModelVehicles,
	getFiltersVehicles,
	getPaisHotel,
	getCiudadHotel,
	getPersonaHotel,
	getFechaHotel,
	getDestinoVuelo,
	getPrecioVuelo,
	searchUserPerfil,
	EditProfile,
	searchCity,
	CHabitacion,
	RHabitacion,
	UHabitacion,
	DHabitacion,
	searchHabitacion,
	CAutomovil,
	RAutomovil,
	UAutomovil,
	DAutomovil,
	searchAutomovil,
	CVuelo,
	RVuelo,
	UVuelo,
	DVuelo,
	searchVuelo,
	CReservacionHabitacion,
	RReservacionHabitacion,
	UReservacionHabitacion,
	DReservacionHabitacion,
	searchReservacionHabitacion,
	CReservacionVuelo,
	RReservacionVuelo,
	UReservacionVuelo,
	DReservacionVuelo,
	searchReservacionVuelo,
	CReservacionAuto,
	RReservacionAuto,
	UReservacionAuto,
	DReservacionAuto,
	searchReservacionAuto,
	getReservasHotelUsuario,
	getReservasVueloUsuario,
	getReservasAutoUsuario,
	CResenia,
	RResenia,
	UResenia,
	DResenia,
	searchResenia,
	searchReseniaServicio,
	AprobarServicio,
	ModificarServicio
};


