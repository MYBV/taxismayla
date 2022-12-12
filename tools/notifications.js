//##############################################################################

//##############################################################################

//##############################################################################
function Aviso(usuario)
{
    this.usuario = usuario
}
//##############################################################################

//##############################################################################
Aviso.prototype.msj = async function(canal, alerta, evento){

    let obj = {
        uuid: uuid(),
        accion: alerta.accion,
        descripcion: alerta.descripcion,
        ref: alerta.id,
        canal: canal,
        id_usuario: this.usuario,
        evento: String(evento) != 'null' ? evento : null
    }
    let Notificaciones = require("../models").notificaciones;
    await Notificaciones.create(obj)

    io.to(canal).emit(obj.canal,obj)
}
//##############################################################################
Aviso.prototype.canal = async function(alerta, evento){

    let canal = `usuario_${this.usuario}`
    this.msj(canal,alerta,evento)
    return true
}
//##############################################################################
Aviso.prototype.notificar = async function (id, evento = ''){

    let alerta = Storage.get('lista_alertas').find(row=> row.id == id);
    await this.canal(alerta,evento);
    return true;
}
//##############################################################################

//##############################################################################
module.exports = Aviso
//##############################################################################