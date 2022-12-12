//#############################################################################################
let Procedure = module.exports;
//#############################################################################################

//#############################################################################################
let Usuarios = require("../models").usuarios;
let Pasajeros = require("../models").usuario_pasajeros;
let Conductores = require("../models").usuario_conductores;
//#############################################################################################

//#############################################################################################
Procedure.login = async (login, password) => {
  let fields = ["id", "id_perfil", "login", "token"];
  let condition = {
    usuario_login: login,
    usuario_password: password,
    estado: "ACTIVO",
  };

  try {
    let resultado = await Usuarios.findOne({
      where: condition,
      attributes: fields,
    });
    if (resultado) {
      resultado = JSON.stringify(resultado, null, 2);
      resultado = JSON.parse(resultado);

      if (String(resultado.token) != "null") {
        if (typeof list_session[resultado.token] !== "undefined")
          await CerrarSession(resultado.token);
      }

      let datos_session = Object.assign({}, resultado);

      let perfil = Storage.get("perfiles").find(
        (row) => row.id == datos_session.id_perfil
      );

      datos_session.perfil = perfil
        ? String(perfil.descripcion).toLocaleUpperCase()
        : "NINGUNO";

      datos_session.id_persona = 0;

      let condition_persona = { id_usuario: datos_session.id };

      if (datos_session.id_perfil == 2) {
        let fields_persona = ["id_conductor"];

        let persona = await Conductores.findOne({
          where: condition_persona,
          attributes: fields_persona,
        });
        if (persona) datos_session.id_persona = persona.id_conductor;
      }

      if (datos_session.id_perfil == 3) {
        let fields_persona = ["id_pasajero"];
        let persona = await Pasajeros.findOne({
          where: condition_persona,
          attributes: fields_persona,
        });
        if (persona) datos_session.id_persona = persona.id_pasajero;
      }

      let canales = [`usuario_${resultado.id}`, `${datos_session.perfil}`];

      datos_session.canales = canales;
      datos_session.token = JWT.sign(
        _pick(datos_session, ["id", "id_perfil", "estado"]),
        process.env.API_JWT
      );

      await Usuarios.update(
        { token: datos_session.token },
        {
          where: { id: datos_session.id },
        }
      );

      await AgregarSesion(datos_session);
      return { statusCode: 200, bodyResponse: datos_session };
    } else {
      let mensaje = `Datos incorrectos`;
      return { statusCode: 400, bodyResponse: { msj: mensaje } };
    }
  } catch (err) {
    let mensaje = `Ocurrio un error al realizar login: ${err}`;
    return { statusCode: 500, bodyResponse: { msj: mensaje } };
  }
};
//#############################################################################################
