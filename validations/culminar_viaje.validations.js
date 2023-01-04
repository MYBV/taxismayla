//####################################################################################################
let Viajes = require("../models").viajes;
//####################################################################################################

//####################################################################################################
module.exports = async(data, session)=>{
    
    if(session.id_perfil != 3) return { statusCode: 400, bodyResponse: { msj: 'Debe ser pasajero para culminar viaje' } };

    let fields = ["id", "fechahora_inicio", "latitud_origen", "longitud_origen"];
  	let condition = { id: data.id, estado: "ACTIVO"};

    let pasajero_trip  = await Viajes.findOne({
        where: condition,
        attributes: fields,
    });

    if(!pasajero_trip) 
        return { statusCode: 400, bodyResponse: { msj: 'Viaje no esta en curso' } };
    if(String(pasajero_trip.fechahora_inicio)== 'null')
        return { statusCode: 400, bodyResponse: { msj: 'Viaje no ha iniciado' } };

    if(String(data.latitud_destino) == '0' || String(data.longitud_destino) == '0' )
        return { statusCode: 400, bodyResponse: { msj: 'Destino del viaje no valido' } };

    if(data.latitud_destino == pasajero_trip.latitud_origen && data.longitud_destino == pasajero_trip.longitud_origen)
        return { statusCode: 400, bodyResponse: { msj: 'Origen destino del viaje no pueden ser iguales' } };

    return { statusCode: 200, bodyResponse: { msj: 'Data Ok' } };
}
//####################################################################################################