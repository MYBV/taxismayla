//#################################################################################################
var {Router}  = require('express')
var router    = Router()
//#################################################################################################

//#################################################################################################
let index = async(req, res, next)=> {

    let {index} = require('../procedures/viajes')
    let resultado = await index(req.session)
    res = Object.assign(res, resultado)
    return next()
}
//#################################################################################################
let solicitar_viaje = async(req, res, next)=>{

    let data = Object.assign({},req.body)
    data.pasajeroId = req.session.id_persona
    
    let Validacion = require("../validations").solicitar_viaje;
    let resultado = await Validacion(data, req.session)
    if(resultado.statusCode != 200)
    {
        res = Object.assign(res, resultado)
        return next()
    }
    
    let {solicitar_viaje} = require('../procedures/viajes')
    resultado = await solicitar_viaje(data)
    res = Object.assign(res, resultado)

    next()

    if(resultado.statusCode == 200)
    {
        data.id = resultado.id
        data.id_usuario = req.session.id
        await AsignarConductor.emit("asignarconductor", data)
        await CrearMediosPagos.emit("crearmediospagos", data.pasajeroId)
    }
}
//#################################################################################################
let cancelar_viaje = async(req, res, next)=>{

    let Validacion = require("../validations").cancelar_viaje;
    let resultado = await Validacion(req.params.id, req.session)
    if(resultado.statusCode != 200)
    {
        res = Object.assign(res, resultado)
        return next()
    }

    let data = {
        id: req.params.id,
        eliminatedAt: CalendarDate.now().toFormat('yyyy-LL-dd HH:mm:ss'),
        estado: 'INACTIVO'
    }

    let {cancelar_viaje} = require('../procedures/viajes')
    resultado = await cancelar_viaje(data)
    res = Object.assign(res, resultado)

    return next()
}
//#################################################################################################
let inciar_viaje = async(req, res, next)=>{

    let Validacion = require("../validations").iniciar_viaje;
    let resultado = await Validacion(req.params.id, req.session)
    if(resultado.statusCode != 200)
    {
        res = Object.assign(res, resultado)
        return next()
    }

    let data = {
        fechahora_inicio: CalendarDate.now().toFormat('yyyy-LL-dd HH:mm:ss')
    }

    let {modificar_viaje} = require('../procedures/viajes')
    resultado = await modificar_viaje(data, req.params.id)
    res = Object.assign(res, resultado)

    return next()
}
//#################################################################################################
let culminar_viaje = async(req, res, next)=>{

    let data = Object.assign({},req.body)
    
    data.fechahora_fin = CalendarDate.now().toFormat('yyyy-LL-dd HH:mm:ss')
    data.estado        = 'CULMINADO'
    data.id            = req.params.id
    
    let Validacion = require("../validations").culminar_viaje;
    let resultado = await Validacion(data, req.session)
    if(resultado.statusCode != 200)
    {
        res = Object.assign(res, resultado)
        return next()
    }

    let {culminar_viaje} = require('../procedures/viajes')
    resultado = await culminar_viaje(data, req.params.id)
    res = Object.assign(res, resultado)

    next()

    if(resultado.statusCode == 200)
    {
        ProcesarTransaccion.emit("procesartransacion", data.id)
    }
}
//#################################################################################################

//#################################################################################################
router.get('/',acceso, index) 
//router.get('/:id([0-9]+)', read) 
router.post('/solicitar',acceso, solicitar_viaje) 
router.put('/iniciar/:id([0-9]+)',acceso, inciar_viaje) 
router.put('/culminar/:id([0-9]+)',acceso, culminar_viaje) 
router.delete('/cancelar/:id([0-9]+)',acceso, cancelar_viaje) 
//router.delete('/:id([0-9]+)', del) 
//#################################################################################################


//#################################################################################################
module.exports = router
//#################################################################################################