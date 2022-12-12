//#####################################################################################################
let Usuarios = require("../models").usuarios;
let Pasajeros = require("../models").usuario_pasajeros;
let Conductores = require("../models").usuario_conductores;
//#####################################################################################################

//#####################################################################################################
global.CerrarSession = async (usuario_token) => {
  console.log(Color_4, "Cerrando Session", usuario_token);

  if (typeof list_session[usuario_token] !== "undefined") {
    await Usuarios.update(
      { token: null },
      {
        where: { id: list_session[usuario_token].id },
      }
    );

    delete list_session[usuario_token];
  }

  return true;
};
//#####################################################################################################
global.acceso = async (req, res, next) => {
  //Control de acceso a las rutas con authorization en headers
  if (req.headers.hasOwnProperty("authorization")) {
    let token = req.headers["authorization"];

    if (typeof list_session[token] !== "undefined") {
      req.session = list_session[token];
      return next();
    } else {
      res.status(401).send({ mensaje: "Autorizacion Incorrecta..." });
    }
  } else {
    res.status(401).send({ mensaje: "authorization faltante" });
  }
};
//#####################################################################################################
global.AgregarSesion = async (datos) => {
  list_session[datos.token] = Object.assign({}, datos);
  return true;
};
//#####################################################################################################
global.cargasession = async () => {
  //Precargar Datos Sessiones
  let fields    = ["id", "id_perfil", "login", "token"];
  let condition = {
    estado: "ACTIVO",
    token: {
      [MyOp.ne]: null,
    },
  };

  let resultado = await Usuarios.findAll({
    where: condition,
    attributes: fields,
  });

  resultado = JSON.stringify(resultado, null, 2);
  resultado = JSON.parse(resultado);

  if (Object.keys(resultado).length > 0) {
    
    let perfiles = Storage.get('perfiles');

    for (let valor of resultado) {
      let datos_session = Object.assign({}, valor);

      let perfil = perfiles.find((row) => row.id == valor.id_perfil);

      datos_session.perfil = perfil
        ? String(perfil.descripcion).toLocaleUpperCase()
        : "NINGUNO";

      datos_session.id_persona = 0

      let condition_persona = { id_usuario: datos_session.id};

      

      if(datos_session.id_perfil == 2)
      {
        let fields_persona = ["id_conductor"];

        let persona = await Conductores.findOne({
          where: condition_persona,
          attributes: fields_persona,
        });
        if (persona) datos_session.id_persona = persona.id_conductor
      }

      if(datos_session.id_perfil == 3)
      {
        let fields_persona = ["id_pasajero"];
        let persona = await Pasajeros.findOne({
          where: condition_persona,
          attributes: fields_persona,
        });
        if (persona) datos_session.id_persona = persona.id_pasajero
      }
  	  
      let canales = [`usuario_${valor.id}`, `${datos_session.perfil}`];

      datos_session.canales = canales;

      await AgregarSesion(datos_session);
    }
  }
};
//#####################################################################################################

//#####################################################################################################
cargasession();
//#####################################################################################################
module.exports = "Correcto-> Modulo De Autorizacion Cargado";
//#####################################################################################################
