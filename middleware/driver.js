//##########################################################################################################
let Procedure = {};
//##########################################################################################################
list_reglas = Storage.get("lista_bodys"); //Cargar Listado de bodys
//##########################################################################################################

//##########################################################################################################
Procedure.reglas = (req) => {
  let method   = req.method;
  let body     = Object.assign({}, req.body);
  let url_ruta = req.originalUrl.split("?cache")[0];
  let b_keys   = Object.keys(body); //Keys Body

  if (method == "PUT") url_ruta = url_ruta.split("/").slice(0, -1).join("/");

  let regla_body = list_reglas.find(
    (row) => row.method == method && row.ruta == url_ruta
  );
  if (!regla_body) {
    return {
      statusCode: 400,
      bodyResponse: { mensaje: "No se encuentra instancia de body" },
    };
  } else {

    let regla = Object.keys(regla_body.body);

    let erradas = b_keys.filter((x) => !regla.includes(x));

    let faltantes = regla.filter((x) => !b_keys.includes(x));

    let diferencia = String();

    if (erradas.length > 0 || faltantes.length > 0) {
      diferencia = erradas.concat({ faltantes: faltantes });
    }

    if (Object.keys(diferencia).length > 0) {

      return {
        statusCode: 422,
        bodyResponse: { mensaje: "Error Entrada De Datos", campos: diferencia },
      };
    } else {
      let peticion = {};

      for (let key of Object.keys(body))
        peticion[key] =
          body[key] == null || body[key].length == 0 ? false : true;

      let valido = Object.assign({}, regla_body.body);

      diferencia = new Array();

      for (let key of Object.keys(valido))
        if (valido[key] == true)
          if (valido[key] != peticion[key]) diferencia.push({ requerido: key });

      if (diferencia.length > 0) {
        return {
          statusCode: 422,
          bodyResponse: {
            mensaje: "Error Entrada De Datos",
            campos: resultado,
          },
        };
      } else return diferencia;
    }
  }
};
//##########################################################################################################
Procedure.seguridad_peticiones = (req) => {
  let ip = req.connection.remoteAddress.split(":")[3];
  let method = req.method;
  let url = req.originalUrl.split("?cache")[0];
  let usuario = 0;

  let encontro = false;
  let diferencia = 0;
  let ahora = new Date().getTime();

  let tipo = "ip";

  if (
    req.headers.hasOwnProperty("authorization") &&
    typeof list_session[req.headers["authorization"]] !== "undefined"
  ) {
    tipo = "usuario";
    usuario = list_session[req.headers["authorization"]].id;
  }

  if (typeof list_peticiones[`${usuario}`] !== "undefined") {
    if (usuario != 0) {
      if (
        list_peticiones[`${usuario}`].method == method &&
        list_peticiones[`${usuario}`].url == url
      ) {
        diferencia = ahora - list_peticiones[`${usuario}`].tiempo;
        list_peticiones[`${usuario}`].tiempo = new Date().getTime();
        if (diferencia < 1500) {
          return false;
        }
      } else {
        list_peticiones[`${usuario}`].method = method;
        list_peticiones[`${usuario}`].url = url;
        list_peticiones[`${usuario}`].tiempo = new Date().getTime();
      }
    } else {
      if (
        list_peticiones[`${usuario}`].ip == ip &&
        list_peticiones[`${usuario}`].method == method &&
        list_peticiones[`${usuario}`].url == url
      ) {
        diferencia = ahora - list_peticiones[`${usuario}`].tiempo;
        list_peticiones[`${usuario}`].tiempo = new Date().getTime();
        if (diferencia < 1500) {
          return false;
        }
      } else {
        list_peticiones[`${usuario}`].ip = ip;
        list_peticiones[`${usuario}`].method = method;
        list_peticiones[`${usuario}`].url = url;
        list_peticiones[`${usuario}`].tiempo = new Date().getTime();
      }
    }
  } else
    list_peticiones[`${usuario}`] = {
      ip: ip,
      tiempo: new Date().getTime(),
      method: method,
      url: url,
    };

  return true;
};
//##########################################################################################################
Procedure.metodos_validos = (req) => {
  if (
    Array("GET", "POST", "PUT", "DELETE", "OPTIONS").indexOf(req.method) == -1
  ) {
    return false;
  } else {
    return true;
  }
};
//##########################################################################################################
Procedure.principal = (req, res, next) => {
  if (Procedure.metodos_validos(req)) {
    if (Procedure.seguridad_peticiones(req)) {
      if (req.method == "POST" || req.method == "PUT") {
        //validaremos body (keys requeridas para metodo de escritura)
        resultado = Procedure.reglas(req);

        if (Object.keys(resultado).length > 0) {
          res.statusCode = resultado.statusCode;
          res.bodyResponse = resultado.bodyResponse;
          guardar_auditoria(req, res);
          res.status(res.statusCode).send(res.bodyResponse);
        } else return next();
      } else return next();
    } else {
      res.statusCode = 304;
      guardar_auditoria(req, res, { mensaje: "Peticiones concurrentes" });

      res.status(304).send({ mensaje: "Peticiones concurrentes" });
    }
  } else {
    res.statusCode = 405;
    guardar_auditoria(req, res, { mensaje: "Metodo NO permitido" });
    res.status(405).send({ mensaje: "Metodo NO permitido" });
  }
};
//##########################################################################################################
Procedure.error_404 = (req, res, next) => {
  let err = new Error("Not Found");
  err.status = 404;

  res.statusCode = 404;
  res.bodyResponse = { msj: "Recurso no encontrado" };
  guardar_auditoria(req, res);

  res.status(res.statusCode).send(res.bodyResponse);
};
//##########################################################################################################
Procedure.http_estatus = (req, res, next) => {
  let ms = 7000;

  setTimeout(() => req.emit("timeout", {}), ms);

  req.on("timeout", (data) => {
    if (res.statusMessage == undefined) {
      res.statusTimeOut = true;
      res.statusCode = 503;
      res.bodyResponse = { msj: "Servidor Tiempo Agotado" };
      guardar_auditoria(req, res);
      res.status(res.statusCode).send(res.bodyResponse);
    } else {
      guardar_auditoria(req, res);
    }
  });

  next();
};
//##########################################################################################################
Procedure.respuesta_driver = (req, res, next) => {
  if (res.hasOwnProperty("bodyResponse")) {
    //res.status(res.statusCode).send(res.bodyResponse);
    if (!res.statusTimeOut) res.status(res.statusCode).send(res.bodyResponse);
  } else next();
};
//##########################################################################################################

//##########################################################################################################
module.exports = Procedure;
//##########################################################################################################
