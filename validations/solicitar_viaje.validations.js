//####################################################################################################
let Viajes = require("../models").viajes;
//####################################################################################################

//####################################################################################################
module.exports = async(data, session)=>{

    if(session.id_perfil != 3) return { statusCode: 400, bodyResponse: { msj: 'Debe ser pasajero para solicitar viaje' } };
    if(String(data.latitud_origen) == '0' || String(data.longitud_origen) == '0' )
        return { statusCode: 400, bodyResponse: { msj: 'Ubicacion de pasajero no valida' } };

    //if(String(data.latitud_destino) == '0' || String(data.longitud_destino) == '0' )
      //  return { statusCode: 400, bodyResponse: { msj: 'Destino del viaje no valido' } };

    //if(data.latitud_destino == data.latitud_origen && data.longitud_destino == data.longitud_origen)
      //  return { statusCode: 400, bodyResponse: { msj: 'Origen destino del viaje no pueden ser iguales' } };

    let fields = ["id", "pasajeroId"];
  	let condition = { pasajeroId: data.pasajeroId, estado: "ACTIVO"};

    let pasajero_trip  = await Viajes.findOne({
        where: condition,
        attributes: fields,
    });

    if(pasajero_trip) 
        return { statusCode: 400, bodyResponse: { msj: 'Pasajero ya se encuentra en viaje' } };

    return { statusCode: 200, bodyResponse: { msj: 'Data Ok' } };
}
//####################################################################################################