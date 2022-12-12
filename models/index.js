//########################################################################################################################
const ModelosDB = {};
//########################################################################################################################

//########################################################################################################################
ModelosDB.perfiles             = require("./perfiles.model.js")(mysequelize, MySequelize);
ModelosDB.usuarios             = require("./usuarios.model.js")(mysequelize, MySequelize);
ModelosDB.lista_alertas        = require("./lista_alertas.model.js")(mysequelize, MySequelize);
ModelosDB.lista_bodys          = require("./lista_bodys.model.js")(mysequelize, MySequelize);
ModelosDB.notificaciones       = require("./notificaciones.models.js")(mysequelize, MySequelize);
ModelosDB.viajes               = require("./viajes.model.js")(mysequelize, MySequelize);
ModelosDB.conductores          = require("./conductores.model.js")(mysequelize, MySequelize);
ModelosDB.pasajeros            = require("./pasajeros.model.js")(mysequelize, MySequelize);
ModelosDB.usuario_conductores  = require("./usuario_conductores.model.js")(mysequelize, MySequelize);
ModelosDB.usuario_pasajeros    = require("./usuario_pasajeros.model.js")(mysequelize, MySequelize);
ModelosDB.vehiculo_conductores = require("./vehiculo_conductores.model.js")(mysequelize, MySequelize);
ModelosDB.vehiculos            = require("./vehiculos.model.js")(mysequelize, MySequelize);
ModelosDB.tarifas              = require("./tarifas.model.js")(mysequelize, MySequelize);
ModelosDB.pago_metodos         = require("./pago_metodos.model.js")(mysequelize, MySequelize);
ModelosDB.transacciones        = require("./transacciones.model.js")(mysequelize, MySequelize);
//########################################################################################################################

//########################################################################################################################
module.exports = ModelosDB;
//########################################################################################################################
