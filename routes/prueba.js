
//#################################################################################################
const {Router}  = require('express')
const router    = Router()
//#################################################################################################


//#################################################################################################
let index = async(req, res, next)=> {

    res.bodyResponse = {api:process.env.Api_Nombre}
    res.statusCode = 200
    next()

    let Conductores = require("../models").conductores;
    let VehConductores = require("../models").vehiculo_conductores;
    let Vehiculos = require("../models").vehiculos;

    Conductores.hasMany(VehConductores);
    //Vehiculos.hasMany(VehConductores);
    VehConductores.belongsTo(Vehiculos);
    

/*
    const transportistas = await Conductores.findAll({
        where: {
            estado: 'ACTIVO',
        },
        attributes: ['id', 'identificacion', 'nombre', 'latitud', 'longitud'],
        include: [{
          model: VehConductores,
          //attributes: ['id', 'placa'],
          where: {
            conductoreId: MySequelize.col('conductores.id'),
            estado: 'ACTIVO'
          }, 
          include: [
            { model: Vehiculos,
              attributes: ['id', 'placa'] 
            }
        ]
        },
        ],
      })
      console.log(JSON.stringify(transportistas, null, 2))*/

      const transportistas = await Conductores.findAll({
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
      console.log(JSON.stringify(transportistas, null, 2))

    /*let Pasajeros = require("../models").pasajeros;
    let Viajes = require("../models").viajes;

    Pasajeros.hasMany(Viajes);
    //Viajes.belongsTo(Pasajeros);

    //const pasajeros = await Pasajeros.findAll({ include: model: Viajes, required: true});

    const pasajeros = await Pasajeros.findAll({
        include: {
          model: Viajes,
          where: {
            pasajeroId: MySequelize.col('pasajeros.id')
          }
        }
      })
    console.log(JSON.stringify(pasajeros, null, 2))*/
    
    /*let mihttp = require('../middleware/http')
    let headers = {"accept": "application/json"}
    let resultado = await mihttp('GET', 'transactions/130865-1670552442-38594')
    console.log(resultado)*/
}
//#################################################################################################


//#################################################################################################
router.get('/',index) 
//#################################################################################################


//#################################################################################################
module.exports = router
//#################################################################################################