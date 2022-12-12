//####################################################################################################
let Viajes = require("../models").viajes;
//####################################################################################################

//####################################################################################################
module.exports = async(id, session)=>{

    if(session.id_perfil != 2) return { statusCode: 400, bodyResponse: { msj: 'Debe ser conductor para iniciar viaje' } };


    let fields = ["id", "fechahora_inicio"];
  	let condition = { id: id, estado: "ACTIVO"};

    let pasajero_trip  = await Viajes.findOne({
        where: condition,
        attributes: fields,
    });

    if(!pasajero_trip) 
        return { statusCode: 400, bodyResponse: { msj: 'Viaje no esta en curso' } };
    if(String(pasajero_trip.fechahora_inicio)!= 'null')
        return { statusCode: 400, bodyResponse: { msj: 'Viaje ya inicio' } };

    return { statusCode: 200, bodyResponse: { msj: 'Data Ok' } };
}
//####################################################################################################