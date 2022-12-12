//#############################################################################################
let Procedure = module.exports;
//#############################################################################################

//#############################################################################################
Procedure.buscar = (token) => {
  if (typeof list_socket[token] !== "undefined") return true;
  return false;
};
//#############################################################################################
Procedure.init = async (cliente) => {
  let token = cliente.token;
  let obj = list_session[token];

  if (Object.keys(obj).indexOf("canales") >= 0) {
    for (let canal of obj.canales) {
      console.log(Color_2, `Agregando ${obj.login} Canal: ${canal}`);
      cliente.join(canal);
    }
  }

  //Solo los conductores tiene el canal Track
  if (obj.perfil_descripcion == "CONDUCTOR") {
    cliente.on("track", track);
  }

  cliente.on("disconnect", disconnect(cliente.token));

  list_socket[token] = Object.assign({}, cliente);
};
//#############################################################################################
let track = () => {};
//#############################################################################################
let disconnect = async (token) => {
  let existe = await Procedure.buscar(token);
  if (existe) {
    console.log(
      Color_4,
      `Cliente WS Desconectado, Usuario: ${list_socket[token].login}`
    );
    delete list_socket[token];
  }
};
//#############################################################################################
