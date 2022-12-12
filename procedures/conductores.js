//#############################################################################################
let Procedure = module.exports;
//#############################################################################################

//#############################################################################################
let Conductores = require("../models").conductores;
//#############################################################################################

//#############################################################################################
Procedure.buscar_libre = async()=>{

    try
    {
        let Conductores = require("../models").conductores;
        let VehConductores = require("../models").vehiculo_conductores;
        let Vehiculos = require("../models").vehiculos;
    
        Conductores.hasMany(VehConductores);
        //Vehiculos.hasMany(VehConductores);
        VehConductores.belongsTo(Vehiculos);
        
        let transportistas = await Conductores.findAll({
            where: {
                estado: 'ACTIVO',
            },
            attributes: ['id', 'identificacion', 'nombre', 'latitud', 'longitud'],
            include: [{
              model: VehConductores,
              attributes: ['vehiculoId'],
              where: {
                estado: 'ACTIVO'
              }, 
              include: [
                { model: Vehiculos,
                  attributes: ['placa'] 
                }
            ]
            },
            ],
        })
    
        transportistas = JSON.stringify(transportistas, null, 2);
        transportistas = JSON.parse(transportistas);
    
        return { statusCode: 200, bodyResponse: transportistas };
    }
    catch(err)
    {
        return { statusCode: 500, bodyResponse: [] };
    }
    
}
//#############################################################################################
Procedure.actualizar_estado_conductor = async(id, estado)=>{

  let mensaje = String();
  let status = 500;

  try {
    let resultado = await Conductores.update({estado: estado}, {
      where: { id: id},
    });

    if (resultado == 1) {
      mensaje = `estado conductor modificado`;
      status  = 200;
    } else {
      mensaje = `No se puede modificar estado conductor`;
      status  = 400;
    }
  } catch (err) {
    mensaje = `Ocurrio un error al modificar estado conductor: ${err}`;
  }

  return { statusCode: status, bodyResponse: { msj: mensaje } };
}
//#############################################################################################
Procedure.liberar_conductor = async(data, id)=>{

  let mensaje = String();
  let status = 500;

  try {
    let resultado = await Conductores.update(data, {
      where: { id: id},
    });

    if (resultado == 1) {
      mensaje = `Conductor liberado`;
      status  = 200;
    } else {
      mensaje = `No se puede liberar conductor`;
      status  = 400;
    }
  } catch (err) {
    mensaje = `Ocurrio un error al liberar conductor: ${err}`;
  }

  return { statusCode: status, bodyResponse: { msj: mensaje } };
}
//#############################################################################################