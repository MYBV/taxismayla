
//#################################################################################################
var {Router}  = require('express')
var router    = Router()
//#################################################################################################


//#################################################################################################
let index = async(req, res, next)=> {

    let {index} = require('../procedures/perfiles')
    let resultado = await index()
    res = Object.assign(res, resultado)
    return next()
}
//#################################################################################################
let read = async(req, res, next)=> {

    let {read} = require('../procedures/perfiles')
    let resultado = await read(req.params.id)
    res = Object.assign(res, resultado)
    return next()
}
//#################################################################################################
let create = async(req, res, next)=> {

    let data = Object.assign({},req.body)

    let {create} = require('../procedures/perfiles')
    let resultado = await create(data)
    res = Object.assign(res, resultado)
    return next()
}
//#################################################################################################
let update = async(req, res, next)=> {

    let data = Object.assign({},req.body)
    data.id = req.params.id

    let {update} = require('../procedures/perfiles')
    let resultado = await update(data)
    res = Object.assign(res, resultado)
    return next()
}
//#################################################################################################
let del = async(req, res, next)=>{

    let {del} = require('../procedures/perfiles')

    let resultado = await del(req.params.id)
    res = Object.assign(res, resultado)
    return next()
}
//#################################################################################################


//#################################################################################################
router.get('/',acceso, index) 
router.get('/:id([0-9]+)', read) 
router.post('/', create) 
router.put('/:id([0-9]+)', update) 
router.delete('/:id([0-9]+)', del) 
//#################################################################################################


//#################################################################################################
module.exports = router
//#################################################################################################