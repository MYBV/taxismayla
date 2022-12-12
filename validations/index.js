//########################################################################################################################
const ValidationsTaxis = {};
//########################################################################################################################

//########################################################################################################################
ValidationsTaxis.solicitar_viaje = require("./solicitar_viaje.validations.js");
ValidationsTaxis.cancelar_viaje  = require("./cancelar_viaje.validations.js");
ValidationsTaxis.iniciar_viaje   = require("./iniciar_viaje.validations.js");
ValidationsTaxis.culminar_viaje  = require("./culminar_viaje.validations.js");
//########################################################################################################################

//########################################################################################################################
module.exports = ValidationsTaxis;
//########################################################################################################################
