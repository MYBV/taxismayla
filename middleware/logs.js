//########################################################################################################################################
const mysql = require("mysql");
//########################################################################################################################################

//########################################################################################################################################
const TablaAuditoria = (tabla) => {
  return `CREATE TABLE ${tabla}  (
        id int(11) NOT NULL AUTO_INCREMENT,
        unix varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
        origen varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
        token text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
        usuario varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
        ip varchar(200) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
        metodo longtext CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
        url longtext CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
        headers longtext CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
        params longtext CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
        body longtext CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
        estatus varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT 'INICIAL',
        res_body longtext CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
        msj_body longtext CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
        size varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
        ms int(11) NULL DEFAULT NULL,
        fechahorapeticion datetime(0) NULL DEFAULT NULL,
        fechahorarespuesta datetime(0) NULL DEFAULT NULL,
        fechahoraregistro datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
        PRIMARY KEY (id) USING BTREE,
        UNIQUE INDEX fk_auditoria01(id) USING BTREE,
        INDEX fechahorapeticion(fechahorapeticion) USING BTREE,
        INDEX index_origen(origen) USING BTREE
      ) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic`;
};
//########################################################################################################################################
global.guardar_auditoria = async (req, res, msj_body = null) => {
  try {
    let sql = String();
    let resultado = Object();

    //Tabla De logs
    let tabla = `auditoria_${CalendarDate.now().toFormat("yyyy_MM_dd")}`;

    //Funcion De Consultas De Logs Inicio
    const consulta_logs = (sqlo) => {
      return new Promise((resolve) => {
        db_logs.getConnection(async (err, connection) => {
          if (err) resolve({ error: 1 });
          connection.query(sqlo, async (error, results, fields) => {
            connection.release();
            if (!error) resolve(results);
            else {
              if (error.sqlMessage.indexOf("doesn't exist") > -1)
                resolve({ error: 2 });
              else resolve({ error: 999 });
            }
          });
        });
      });
    };
    //Funcion De Consultas De Logs Fin

    //Chequear La Talba
    if (typeof CheckTableLogs == "undefined") {
      sql = `show tables like "${tabla}";`;
      resultado = await consulta_logs(sql);
      if (resultado.length === 0) {
        sql = TablaAuditoria(tabla);
        resultado = await consulta_logs(sql);
        if (!resultado.error) global.CheckTableLogs = true;
      } else global.CheckTableLogs = true;
    }

    let unix       = new Date().getTime();
    let api_nombre = process.env.Api_Nombre;
    let ip         = req.connection.remoteAddress.split(":")[3];
    let method     = req.method;
    let url        = req.originalUrl;
    let headers    = JSON.stringify(req.headers);
    let params     = JSON.stringify(req.params);
    let body       = JSON.stringify(req.body);
    let res_body   = JSON.stringify(res.bodyResponse);
    let ms         = new Date(res._startTime).getTime() - new Date(req._startTime).getTime() ||0;
    let status     = res.statusCode;
    let size       = res._contentLength || 0;
    let usuario    = 0;
    let f_req      = CalendarDate.fromJSDate(req._startTime).toFormat("yyyy-MM-dd HH:mm:ss");
    let f_res      = CalendarDate.fromJSDate(res._startTime).toFormat("yyyy-MM-dd HH:mm:ss");
    let token      = String();

    if (Object.keys(req).indexOf("session") >= 0) {
      usuario = req.session.id;
      token   = req.session.token;
    }

    if (status == 304 && usuario == 0) {
      if (req.headers.hasOwnProperty("authorization")) {
        if (typeof list_session[req.headers["authorization"]] !== "undefined") {
          usuario = list_session[req.headers["authorization"]].id;
          token   = list_session[req.headers["authorization"]].token;
        }
      }
    }

    if (CheckTableLogs) {
      if (String(msj_body) != "null") msj_body = JSON.stringify(msj_body);

      sql = `INSERT INTO ${tabla} (ip, url, metodo, headers, params, body, res_body, 
              estatus, origen, ms, size, usuario, fechahorapeticion, fechahorarespuesta, token, 
              unix, msj_body) 
              VALUES ('${ip}','${url}', '${method}', '${headers}', '${params}', '${body}','${res_body}', 
              '${status}', '${api_nombre}', '${ms}', '${size}', '${usuario}', '${f_req}', '${f_res}', '${token}', 
              '${unix}', '${msj_body}')`;
      resultado = await consulta_logs(sql);
      if (resultado.error) {
        let sqlc = TablaAuditoria(tabla);
        resultado = await consulta_logs(sqlc);
        if (!resultado.error) {
          global.CheckTableLogs = true;
          sql = `INSERT INTO ${tabla} (ip, url, metodo, headers, params, body, res_body, 
                      estatus, origen, ms, size, usuario,fechahorapeticion, fechahorarespuesta, 
                      token, unix, msj_body) 
                      VALUES ('${ip}','${url}', '${method}', '${headers}', '${params}', '${body}', '${res_body}', 
                      '${status}','${api_nombre}', '${ms}', '${size}', '${usuario}', '${f_req}', '${f_res}', 
                      '${token}', '${unix}', '${msj_body}')`;
          resultado = await consulta_logs(sql);
        }
      }
    }
  } catch (err) {
    console.log(Color_4, `Error al guardar auditoria ${err}`);
  }
};
//########################################################################################################################################
module.exports = new Promise((resolve) => {
  let db_logs_configure_configure = Object();
  db_logs_configure_configure.host = process.env.DBLOGS_HOST;
  db_logs_configure_configure.user = process.env.DBLOGS_USER;
  db_logs_configure_configure.password = process.env.DBLOGS_PASSWORD;
  db_logs_configure_configure.database = process.env.DBLOGS_DATABASE;
  db_logs_configure_configure.multipleStatements = true;

  let conexion_logs = mysql.createConnection(
    db_logs_configure_configure
  ); /*Conexion Bandera*/
  conexion_logs.connect((err) => {
    if (err) resolve("Error-> Conectando Con La PC(logs)");
    else {
      conexion_logs.destroy(); /*Cierro Conexion Bandera */
      global.db_logs = mysql.createPool(db_logs_configure_configure);
      resolve("Correcto-> Conectado Con PC(logs)");
    }
  });
});
//########################################################################################################################################
