const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('config');
const registrarServicio = require('./services/registroServicio');
const registerService = require('./services/registerService');
const autenticacion = require('./services/auth');
const servicesAdmin = require('./services/getServicesAdmin');
const filters = require('./services/getFilters');
const Perfil = require('./services/FindUser');
const City = require('./services/FindCity');
const Habitacion = require('./services/Habitacion');
const Automovil = require('./services/Automovil');
const Vuelo = require('./services/Vuelo');
const ReservaHotel = require('./services/RHabitacion');
const ReservaVuelo = require('./services/RVuelo');
const ReservaAuto = require('./services/RAutomovil');
const ReservacionesUsuario = require('./services/GetReservaUsuario');
const Resenia = require('./services/Resenia');

const app = express();
const router = express.Router();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(cors({
	origin: 'http://34.125.201.105:3000',

	methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']

}));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

router.post(('/v1/fullTrip/registrarServicio'), registrarServicio.registroServicios);
router.post(config.get('localServer.servicePathRegisterService'), registerService.register);
router.post(config.get('localServer.servicePathAuthentication'), autenticacion.LoginCTRL);
router.post(config.get('localServer.servicePathgetService'), servicesAdmin.service);
router.get(config.get('localServer.servicePathgetServices'), servicesAdmin.allServices);
router.get(config.get('localServer.servicePathgetServicesEnabled'), servicesAdmin.activeService);
router.get(config.get('localServer.servicePathgetServicesDisabled'), servicesAdmin.disabledService);
router.get(config.get('localServer.servicePathgetMarcaVehicles'), filters.getMarcaVehicles);
router.get(config.get('localServer.servicePathgetModelVehicles'), filters.getModeloVehicles);
router.get(config.get('localServer.servicePathgetFiltersVehicles'), filters.getFilterVehicles);
router.get(config.get('localServer.servicePathgetVehiclesMarca'), filters.getVehiclesMarca);
router.get(config.get('localServer.servicePathgetVehiclesModelo'), filters.getVehiclesModelo);

router.get(config.get('localServer.servicePathgetCiudadHotel'), filters.getCiudadHotel);
router.get(config.get('localServer.servicePathgetPaisHotel'), filters.getPaisHotel);
router.get(config.get('localServer.servicePathgetPersonaHotel'), filters.getPersonaHotel);
router.get(config.get('localServer.servicePathgetFechaHotel'), filters.getFechaHotel);

router.get(config.get('localServer.servicePathgetPrecioVuelo'), filters.getPreciosVuelos);
router.get(config.get('localServer.servicePathgetDestinoVuelo'), filters.getDestinoVuelo);

router.post(config.get('localServer.servicePathViewProfile'), Perfil.verPerfil);
router.put(config.get('localServer.servicePathEditProfile'), Perfil.editarPerfil);
router.get(config.get('localServer.servicePathViewCity'), City.verCiudad);
router.post(config.get('localServer.servicePathCreateHabitacion'), Habitacion.createHabitacion);
router.get(config.get('localServer.servicePathReadHabitacion'), Habitacion.ReadHabitacion);
router.put(config.get('localServer.servicePathUpdateHabitacion'), Habitacion.UpdateHabitacion);
router.put(config.get('localServer.servicePathDeleteHabitacion'), Habitacion.DeleteHabitacion);
router.post(config.get('localServer.servicePathCreateAutomovil'), Automovil.createAutomovil);
router.get(config.get('localServer.servicePathReadAutomovil'), Automovil.ReadAutomovil);
router.put(config.get('localServer.servicePathUpdateAutomovil'), Automovil.UpdateAutomovil);
router.put(config.get('localServer.servicePathDeleteAutomovil'), Automovil.DeleteAutomovil);
router.post(config.get('localServer.servicePathCreateVuelo'), Vuelo.createVuelo);
router.get(config.get('localServer.servicePathReadVuelo'), Vuelo.ReadVuelo);
router.put(config.get('localServer.servicePathUpdateVuelo'), Vuelo.UpdateVuelo);
router.put(config.get('localServer.servicePathDeleteVuelo'), Vuelo.DeleteVuelo);
router.post(config.get('localServer.servicePathCreateReservacionHabitacion'), ReservaHotel.CreateReservacionHabitacion);
router.get(config.get('localServer.servicePathReadReservacionHabitacion'), ReservaHotel.ReadReservacionHabitacion);
router.put(config.get('localServer.servicePathUpdateReservacionHabitacion'), ReservaHotel.UpdateReservacionHabitacion);
router.put(config.get('localServer.servicePathDeleteReservacionHabitacion'), ReservaHotel.DeleteReservacionHabitacion);
router.post(config.get('localServer.servicePathCreateReservacionVuelo'), ReservaVuelo.CreateReservacionVuelo);
router.get(config.get('localServer.servicePathReadReservacionVuelo'), ReservaVuelo.ReadReservacionVuelo);
router.put(config.get('localServer.servicePathUpdateReservacionVuelo'), ReservaVuelo.UpdateReservacionVuelo);
router.put(config.get('localServer.servicePathDeleteReservacionVuelo'), ReservaVuelo.DeleteReservacionVuelo);
router.post(config.get('localServer.servicePathCreateReservacionAuto'), ReservaAuto.CreateReservacionAuto);
router.get(config.get('localServer.servicePathReadReservacionAuto'), ReservaAuto.ReadReservacionAuto);
router.put(config.get('localServer.servicePathUpdateReservacionAuto'), ReservaAuto.UpdateReservacionAuto);
router.put(config.get('localServer.servicePathDeleteReservacionAuto'), ReservaAuto.DeleteReservacionAuto);
router.get(config.get('localServer.servicePathReadReservacionesUser'), ReservacionesUsuario.getReservaUsuario);
router.post(config.get('localServer.servicePathCreateResenia'), Resenia.createResenia);
router.get(config.get('localServer.servicePathReadResenia'), Resenia.ReadResenia);
router.put(config.get('localServer.servicePathUpdateResenia'), Resenia.UpdateResenia);
router.put(config.get('localServer.servicePathDeleteResenia'), Resenia.DeleteResenia);
router.get(config.get('localServer.servicePathReadReseniaServicio'), Resenia.ReadReseniaServicio);
router.post(config.get('localServer.servicePathAprobarServicio'),servicesAdmin.aprobandoServicios);
router.post(config.get('localServer.servicePathModificarServicio'),servicesAdmin.modificandoServicios);
app.use('/', router);
module.exports = app;
