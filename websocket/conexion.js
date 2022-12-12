//#############################################################################################
let conectar = async (cliente) => {
  let token = cliente.handshake.query.token;
  console.log(Color_2, `Intentando Conectar-> ${token}`);

  if (typeof token != "undefined") {
    if (typeof list_session[token] !== "undefined") {
      let { buscar } = require("./procedures");
      if (await buscar(token)) cliente.disconnect(true);

      console.log(
        Color_1,
        `Cliente WS Conectado: ${list_session[token].login}`
      );
      cliente.token = token;
      cliente.usuario_id = list_session[token].id;

      let { init } = require("./procedures");
      init(cliente);
    }
  } else cliente.disconnect(true);
};
io.on("connection", conectar);
//#############################################################################################

//#############################################################################################
module.exports = "Correcto-> Web Socket Cargado";
//#############################################################################################
