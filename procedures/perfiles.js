//#############################################################################################
let Procedure = module.exports;
//#############################################################################################

//#############################################################################################
let Perfiles = require("../models").perfiles;
//#############################################################################################

//#############################################################################################
Procedure.index = async () => {
  let resultado = Storage.get("perfiles");
  return { statusCode: 200, bodyResponse: resultado };
};
//#############################################################################################
Procedure.read = async (id) => {
  let resultado = Storage.get("perfiles").find((row) => row.id == id);
  if (!resultado) {
    let mensaje = `Perfil no encontrado`;
    return { statusCode: 404, bodyResponse: { msj: mensaje } };
  }

  return { statusCode: 200, bodyResponse: resultado };
};
//#############################################################################################
Procedure.create = async (data) => {
  data.eliminatedAt = null;

  let mensaje = String();
  let status = 500;
  try {
    let resultado = await Perfiles.create(data);
    mensaje = `Perfil creado`;
    status  = 200;

    await Storage.reload("perfiles");
  } catch (err) {
    mensaje = `Ocurrio un error al crear perfil: ${err}`;
  }
  return { statusCode: status, bodyResponse: { msj: mensaje } };
};
//#############################################################################################
Procedure.update = async (data) => {
  data.eliminatedAt = null;

  let mensaje = String();
  let status = 500;

  try {
    let resultado = await Perfiles.update(_pick(data, ["descripcion"]), {
      where: { id: data.id, estado: "ACTIVO" },
    });

    if (resultado == 1) {
      mensaje = `Perfil modificado`;
      status  = 200;
      await Storage.reload("perfiles");
    } else {
      mensaje = `No se puede modificar perfil con id ${data.id}`;
      status  = 400;
    }
  } catch (err) {
    mensaje = `Ocurrio un error al modificar perfil: ${err}`;
  }

  return { statusCode: status, bodyResponse: { msj: mensaje } };
};
//#############################################################################################
Procedure.del = async (id) => {
  let obj = {
    estado: "INACTIVO",
    eliminatedAt: CalendarDate.now().toFormat("yyyy-MM-dd HH:mm:ss"),
  };

  let mensaje = String();
  let estatus = 200;

  try {
    let resultado = await Perfiles.update(obj, {
      where: { id: id, estado: "ACTIVO" },
    });

    if (resultado == 1) {
      mensaje = `Perfil eliminado`;
      estatus = 200;
      await Storage.reload("perfiles");
    } else {
      mensaje = `No se puede eliminar perfil con id ${id}`;
      estatus = 400;
    }
  } catch (err) {
    mensaje = `Ocurrio un error al eliminar perfil: ${err}`;
  }

  return { statusCode: estatus, bodyResponse: { msj: mensaje } };
};
//#############################################################################################
