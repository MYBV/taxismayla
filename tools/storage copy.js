//##############################################################################################################################
let Perfiles = require("../models").perfiles;
//##############################################################################################################################

//##############################################################################################################################
class StorageClass {

    constructor() 
    {
        this._data = []
    }

    async set(modelo, entidad,condition, fields)
    {
        let start      = new Date
        let data = await modelo.findAll({
            where: condition,
            attributes: fields,
          });
        data = JSON.stringify(data, null, 2)
        data = JSON.parse(data)

        let obj = {
            modelo: modelo,
            entidad: entidad,
            condition: condition,
            fields: fields
        }
        
        if(Object.keys(data).length>0)
        {
            obj.result = data.map((row)=>{ return Object.freeze(row)})
        }
        else obj.result = data

        this._data.push(obj)

        let tiempo = new Date().getTime() - start.getTime()
        
        console.log(Color_2,
        `Storage->${entidad} (Cargado) en ${tiempo} ms. Tam ${data.length} Rows.`)
    }

    get(entidad)
    {
        let resultado = this._data.find(row=>row.entidad == entidad)
        return resultado.result 
    }

    async reload(entidad)
    {
        let index =  this._data.findIndex(row=>row.entidad == entidad)
        if(index >= 0)
        {
            let resultado = await this._data[index].modelo.findAll({
                where: this._data[index].condition,
                attributes: this._data[index].fields,
            });
            resultado = JSON.stringify(resultado, null, 2)
            resultado = JSON.parse(resultado)

            if(Object.keys(resultado).length>0)
            {
                this._data[index].result = resultado.map((row)=>{ return Object.freeze(row)})
            }
            else this._data[index].result = resultado
        }
    }

    async loading()
    {
        //Inicio Maestros
        await Storage.set(Perfiles, `perfiles`,{ estado: "ACTIVO" }, ["id", "descripcion"])
        // Fin Maestros 
 
        //Inicio Usuarios

        //Fin Usuarios
 
        //Inicio Registros
        
        //Fin Registros 
    }
    
    /*async reloadall()
    {
        let resultado = this._data.map((row)=> { return row.entidad})

        for(let row of resultado)
        {
            await Storage.reload(row)
        }
    }*/

    /*list_entidad()
    {
        for(index in this._data)
        {
            console.log(`Indice: ${index}, Entidad: ${this._data[index].entidad}, Sql: ${this._data.sql}`)
        }
    }*/
}
//##############################################################################################################################
global.Storage  = new StorageClass() 
//##############################################################################################################################


//##############################################################################################################################
module.exports = async ()=> {

    await Storage.loading()

    return `Correcto-> Storage Cargado Completado ${CalendarDate.now().toFormat('yyyy-LL-dd HH:mm:ss')}`
} 
//##############################################################################################################################