//#############################################################################################
let Procedure = module.exports;
const Alertas = require('../tools/notifications');
//#############################################################################################

//#############################################################################################
let Viajes = require("../models").viajes;
//#############################################################################################

//#############################################################################################
Procedure.index = async (session) => {

  let sql = `SELECT 
  viajes.id, 
  viajes.fechahora_solicitud, 
  viajes.fechahora_inicio, 
  viajes.fechahora_fin,
  viajes.calificacion,
  viajes.observacion_pasajero,
  viajes.observacion_conductor,
  viajes.total_pago,
  viajes.total_minutos,
  viajes.total_km,
  viajes.latitud_origen,
  viajes.longitud_origen,
  viajes.latitud_destino,
  viajes.longitud_destino,
  pasajeros.nombre AS pasajero_nombre,
  conductores.nombre AS conductor_nombre,
  vehiculos.placa 
  FROM viajes 
  JOIN pasajeros ON pasajeros.id = viajes.pasajeroId
  LEFT JOIN conductores ON conductores.id = viajes.id_conductor
  LEFT JOIN vehiculos ON vehiculos.id = viajes.id_vehiculo
  WHERE`

  if(session.id_perfil == 2) 
  {
    sql = `${sql} viajes.id_conductor = ${session.id_persona} AND viajes.estado <> 'INACTIVO'`
  }
  else
  {
    if(session.id_perfil == 3)
    {
      sql = `${sql} viajes.pasajeroId = ${session.id_persona} AND viajes.estado <> 'INACTIVO'`
    }
    else
    {
      sql = `${sql} viajes.estado <> 'INACTIVO'`
    }
  }

  try
  {
    let [results] = await mysequelize.query(sql);
    let resultado = JSON.stringify(results, null, 2)
    resultado = JSON.parse(resultado)
    return { statusCode: 200, bodyResponse:  resultado };
  }
  catch(err)
  {
    return { statusCode: 500, bodyResponse: { msj: 'Error al consultar viajes' }};
  }
};
//#############################################################################################
Procedure.solicitar_viaje = async(data)=>{

    let id = 0
    data.fechahora_solicitud = CalendarDate.now().toFormat('yyyy-LL-dd HH:mm:ss');

    let mensaje = String();
    let status = 500;
    try {
      let resultado = await Viajes.create(data);

      id = resultado.dataValues.id
      mensaje = `Viaje creado, en solo segundos te asignaremos un taxi`;
      status  = 200;
    } catch (err) {
      mensaje = `Ocurrio un error al solicitar viaje: ${err}`;
    }
    return { statusCode: status, bodyResponse: { msj: mensaje }, id:id };
}
//#############################################################################################
Procedure.cancelar_viaje = async(data)=>{

  let mensaje = String();
  let status = 500;

  let viaje = await Viajes.findOne({
    where: {id: data.id}
  });

  try {
    let resultado = await Viajes.update(_pick(data, ["estado", "eliminatedAt"]), {
      where: { id: data.id, estado: "ACTIVO" },
    });

    if (resultado == 1) {
      mensaje = `viaje cancelado`;
      status  = 200;

      let {actualizar_estado_conductor} = require('./conductores')
      await actualizar_estado_conductor(viaje.id_conductor, 'ACTIVO')

      let UsuarioConductor = require('../models').usuario_conductores
      let datos_conductor = await UsuarioConductor.findOne({
        where: {id_conductor: viaje.id_conductor},
      });

      await new Alertas(datos_conductor.id_usuario).notificar(4) 
    } else {
      mensaje = `No se puede cancelar viaje`;
      status  = 400;
    }
  } catch (err) {
    mensaje = `Ocurrio un error al cancelar viaje: ${err}`;
  }

  return { statusCode: status, bodyResponse: { msj: mensaje } };
}
//#############################################################################################
Procedure.modificar_viaje = async(data, id)=>{

  let mensaje = String();
  let status = 500;

  try {
    let resultado = await Viajes.update(data, {
      where: { id: id },
    });

    if (resultado == 1) {
      mensaje = `informacion viaje modificada`;
      status  = 200;
    } else {
      mensaje = `No se puede modificar informacion viaje`;
      status  = 400;
    }
  } catch (err) {
    mensaje = `Ocurrio un error al modificar informacion viaje: ${err}`;
  }

  return { statusCode: status, bodyResponse: { msj: mensaje } };
}
//#############################################################################################
Procedure.culminar_viaje = async(data, id)=>{
  console.log('culminar_viajeculminar_viajeculminar_viajeculminar_viaje')
  let status = 500;
  let mensaje = String();

  let pasajero_trip  = await Viajes.findOne({
    where: {id: id}
  })
  let fin = new CalendarDate(data.fechahora_fin)
  let inicio = CalendarDate.fromJSDate(pasajero_trip.fechahora_inicio)

  let obj_diferencia = fin.diff(inicio, 'minutes')

  data.total_minutos = parseInt(obj_diferencia.values.minutes)

  let hasta   = turf.point([data.longitud_destino,data.latitud_destino])
  let desde   = turf.point([pasajero_trip.longitud_origen, pasajero_trip.latitud_origen])

  data.total_km = turf.distance(desde, hasta,{units: 'kilometers'})

  try {
    let resultado = await Viajes.update(data, {
      where: { id: id, estado: "ACTIVO" },
    });

    if (resultado == 1) {
      mensaje = `Viaje culminado. Realizando Transaccion de pago`;
      status  = 200;

      let obj_liberar = {
        latitud: data.latitud_destino,
        longitud: data.longitud_destino,
        estado: 'ACTIVO'
      }

      let {liberar_conductor} = require('./conductores')
      await liberar_conductor(obj_liberar, pasajero_trip.id_conductor)

    } else {
      mensaje = `No se puede culminar viaje`;
      status  = 400;
    }
  } catch (err) {
    mensaje = `Ocurrio un error al culminar viaje: ${err}`;
  }

  return { statusCode: status, bodyResponse: { msj: mensaje } };
}
//#############################################################################################