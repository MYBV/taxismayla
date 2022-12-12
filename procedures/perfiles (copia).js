//#############################################################################################
let Procedure = module.exports
//#############################################################################################


//#############################################################################################
/*const db = require("../models");
const Perfiles = db.perfiles;*/

let Perfiles = require("../models").perfiles;
//const Op = db.Sequelize.Op;
//#############################################################################################


//#############################################################################################
Procedure.index = (req, res, next)=>{

    let fields    = ['id', 'descripcion']
    let condition = {estado: 'ACTIVO'}

    Perfiles.findAll({where: condition, attributes: fields})
    .then(data=>{
        let resultado = JSON.stringify(data);
        res = Object.assign(res, {statusCode:200, bodyResponse: JSON.parse(resultado)})
        next()
    })
    .catch(error=>{
        let mensaje = `Ocurrio un error al listar perfiles: ${error}` 
        res = Object.assign(res, {statusCode:500, bodyResponse: {msj: mensaje}})
        next()
    })
}
//#############################################################################################
Procedure.read = (req, res, next)=>{

    let fields    = ['id', 'descripcion']
    let condition = {id: req.params.id, estado: 'ACTIVO'}

    Perfiles.findOne({where: condition, attributes: fields})
    .then(data=>{
        if(data)
        {
            let resultado = JSON.stringify(data);
            res = Object.assign(res, {statusCode:200, bodyResponse: JSON.parse(resultado)})
        }
        else
        {
            let mensaje = `Perfil no encontrado` 
            res = Object.assign(res, {statusCode:404, bodyResponse: {msj: mensaje}})
        }
        
        next()
    })
    .catch(error=>{
        let mensaje = `Ocurrio un error al consultar perfil: ${error}` 
        res = Object.assign(res, {statusCode:500, bodyResponse: {msj: mensaje}})
        next()
    })
}
//#############################################################################################
Procedure.create = (req, res, next)=>{

    Perfiles.create(req.body)
    .then(data=>{
        let mensaje = `Perfil creado` 
        res = Object.assign(res, {statusCode:200, bodyResponse: {msj: mensaje}})
        
        next()
    })
    .catch(error=>{
        let mensaje = `Ocurrio un error al crear perfil: ${error}` 
        res = Object.assign(res, {statusCode:500, bodyResponse: {msj: mensaje}})
        next()
    })
}
//#############################################################################################
Procedure.update = (req, res, next)=>{

    Perfiles.update(req.body, {where: {id: req.params.id, estado: 'ACTIVO'}})
    .then(data=>{

        if(data == 1)
        {
            let mensaje = `Perfil modificado` 
            res = Object.assign(res, {statusCode:200, bodyResponse: {msj: mensaje}})
        }
        else
        {
            let mensaje = `No se puede modificar perfil con id ${req.params.id}` 
            res = Object.assign(res, {statusCode:400, bodyResponse: {msj: mensaje}})
        }
        
        next()
    })
    .catch(error=>{
        let mensaje = `Ocurrio un error al modificar perfil: ${error}` 
        res = Object.assign(res, {statusCode:500, bodyResponse: {msj: mensaje}})
        next()
    })
}
//#############################################################################################
Procedure.del = (req, res, next)=>{

    let obj = {
        estado: 'INACTIVO',
        eliminatedAt: CalendarDate.now().toFormat('yyyy-MM-dd HH:mm:ss')
    }
    console.log(obj)

    Perfiles.update(obj, {where: {id: req.params.id, estado: 'ACTIVO'}})
    .then(data=>{

        if(data == 1)
        {
            let mensaje = `Perfil eliminado` 
            res = Object.assign(res, {statusCode:200, bodyResponse: {msj: mensaje}})
        }
        else
        {
            let mensaje = `No se puede eliminar perfil con id ${req.params.id}` 
            res = Object.assign(res, {statusCode:400, bodyResponse: {msj: mensaje}})
        }
        
        next()
    })
    .catch(error=>{
        let mensaje = `Ocurrio un error al eliminar perfil: ${error}` 
        res = Object.assign(res, {statusCode:500, bodyResponse: {msj: mensaje}})
        next()
    })
}
//#############################################################################################