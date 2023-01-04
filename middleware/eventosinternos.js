//##########################################################################################################
const Alertas = require('../tools/notifications') 
//##########################################################################################################

//##########################################################################################################
AsignarConductor.on("asignarconductor",async (data)=>{

    try
    {
        console.log('evento asignar conductor')

        let {buscar_libre} = require('../procedures/conductores')
        let conductores = await buscar_libre() //ubicamos conductores que esten desocupados

        if(Object.keys(conductores.bodyResponse).length >0)
        {
            let transportistas = conductores.bodyResponse

            let dist_minima = 0
            let asignado    = {}

            for(let transportista of transportistas)
            {
                //ubicamos el conductor mas cercano al pasajero

                let desde     = turf.point([transportista.longitud,transportista.latitud])
                let hasta     = turf.point([data.longitud_origen, data.latitud_origen])

                let distancia = turf.distance(desde, hasta,{units: 'kilometers'})

                if(dist_minima == 0) 
                {
                    asignado = Object.assign({},transportista)
                    dist_minima = distancia
                }
                else
                {
                    if(dist_minima>distancia) 
                    {
                        dist_minima = distancia
                        asignado = Object.assign({},transportista)
                    }
                }
            }

            let obj_viaje = {
                id_conductor: asignado.id,
                id_vehiculo: asignado.vehiculo_conductores[0].vehiculoId
            }

            let {modificar_viaje} = require('../procedures/viajes')
            await modificar_viaje(obj_viaje,data.id)

            let Pasajeros = require('../models').pasajeros

            let nombre_pasajero = String()
            let datos_pasajero = await Pasajeros.findOne({
                where: {id: data.pasajeroId},
              });
              if (datos_pasajero) nombre_pasajero = datos_pasajero.nombre

            let mensaje_cond = `Dirigete a latitud: ${data.latitud_origen}, longitud: ${data.longitud_origen}. Pasajero: ${nombre_pasajero}`
            await new Alertas(501).notificar(1,mensaje_cond) //aviso al conductor que tine un viaje

            let placa = asignado.vehiculo_conductores[0].vehiculo.placa
            let mensaje_pas = `Vehiculo Placa: ${placa}, Conductor: ${asignado.nombre}`
            await new Alertas(data.id_usuario).notificar(2,mensaje_pas) //aviso al pasajero que ya le fue asignado un conductor

            let {actualizar_estado_conductor} = require('../procedures/conductores')
            await actualizar_estado_conductor(asignado.id, 'OCUPADO')
        }
        else
        {
            await new Alertas(data.id_usuario).notificar(3) //aviso al pasajero que no hay conductores disponibles
        }

        //new Alertas(id_usuario).notificar(120,id_oferta)
    }
    catch(error){console.log(`------------- Error en Asignar Conductor ------------- ${error}`)}

})
//##########################################################################################################
ProcesarTransaccion.on("procesartransacion",async (id)=>{
//uid.randomUUID(32)
    try
    {
        let Viajes = require('../models').viajes
        let viaje  = await Viajes.findOne({
            where: {id: id}
        })

        if(viaje)
        {
            let {calcular_total} = require('../procedures/transacciones')
            let total_pago = await calcular_total(viaje)

            let {modificar_viaje} = require('../procedures/viajes')
            await modificar_viaje({total_pago: total_pago}, id)

            let centavos = (total_pago * 1000)

            let PagoMetodos = require('../models').pago_metodos
            let pagometodo  = await PagoMetodos.findOne({
                where: {id_pasajero: viaje.pasajeroId}
            })

            if(pagometodo)
            {
                let obj_tr = {
                    monto: centavos,
                    referencia: uid.randomUUID(32),
                    id_pagometodo: pagometodo.id, 
                    id_viaje: viaje.id
                }

                let {CrearTransaccion} = require('../procedures/transacciones')

                let transanccion_pago = await CrearTransaccion(pagometodo, obj_tr.referencia, obj_tr.monto)

                obj_tr.id_transaccion = transanccion_pago.id
                obj_tr.status         = transanccion_pago.status

                let Transacciones = require('../models').transacciones
                await Transacciones.create(obj_tr);
            }
        }
    }
    catch(error){console.log(`------------- Error en Procesar Transaccion ------------- ${error}`)}
})
//##########################################################################################################
CrearMediosPagos.on("crearmediospagos",async (id)=>{

    try
    {
        let Pasajeros = require('../models').pasajeros

        let datos_pasajero  = await Pasajeros.findOne({
            where: {id: id},
        });

        if(datos_pasajero)
        {
            let PagoMetodos = require('../models').pago_metodos
            let pagometodo  = await PagoMetodos.findOne({
                where: {id_pasajero: id}
            })

            if(!pagometodo)
            {
                let email = datos_pasajero.email ? datos_pasajero.email : 'user@example.com'

                let obj_metodo = {
                    id_pasajero: id
                }

                let {ObtenerMerchants} = require('../procedures/transacciones')
                obj_metodo.accept = await ObtenerMerchants()
    
                let {TokenizarTarjeta} = require('../procedures/transacciones')
                obj_metodo.token = await TokenizarTarjeta()
    
                let {CrearMetodoPago} = require('../procedures/transacciones')
                obj_metodo.id_metodo = await CrearMetodoPago(email, obj_metodo.accept, obj_metodo.token)

                await PagoMetodos.create(obj_metodo);
            }
        }
    }
    catch(error){console.log(`------------- Error en crear medios pago ------------- ${error}`)}
})
//##########################################################################################################