//######################################################################################################################
// Modulo Externos Inicio
const environment     = require('dotenv').config()
const express         = require('express')
const logger          = require('morgan')
const cookieParser    = require('cookie-parser')
const compression     = require('compression')
const bodyParser      = require('body-parser')
const cors            = require('cors')
const app             = express()
// Modulo Externos Fin
//######################################################################################################################


//###################################################################################################################### 
function cargar_variables_entorno()
{
    if(!process.env.hasOwnProperty('pm_id'))
    {
        const variables = require('./ecosystem.config')

        let entorno = String()

        if(process.argv.length  === 3)
        {
            if(process.argv[2] == "pro")entorno = "env_production"
            else 
            {
                entorno = "env"
            }
        }
        else entorno = "env"

        process.env = variables.apps[0][entorno]
        console.log(`Corriendo Con NPM ( ${process.env.NODE_ENV} ) `)
    }
    else console.log(`Corriendo Con PM2 ( ${process.env.NODE_ENV}) `)
}
//######################################################################################################################


//######################################################################################################################
async function inicio()
{
    app.use(compression())
    cargar_variables_entorno()
  
    global.HOME = __dirname

    let status = require('./tools/globales')//Cargamos varibles globales 
    console.log(Color_1, status)
   
    global.directorio = path.join(__dirname)
  
    //Conexion Mysql Sequelize
    const {TestConect} = require('./tools/database')
    if(await TestConect())
    {
        status = require('./tools/herramientas') //Cargamos Funciones globales
        console.log(Color_1, status)

        status = await require('./tools/storage')() 
        console.log(Color_1, status)

        status = await require('./middleware/logs')
        console.log(Color_1, status)

        status = await require('./tools/routes') //Cargamos Rutas
        console.log(Color_1, status)

        status = await require('./middleware/sessiones') //cargamos acceso
        console.log(Color_1, status)

        status = await require('./websocket/conexion')
        console.log(Color_1, status)

        await require('./middleware/eventosinternos') //Cargar Eventos Internos

        let driver   = require('./middleware/driver') //Cargar Middleware Principal
        console.log(Color_1, 'Correcto-> Driver Principal Cargado')

        app.use(logger('dev'))
        app.use(bodyParser.json({limit: '50mb'}))
        app.use(bodyParser.urlencoded({limit: '50mb', extended: true})) //Tamano De 50MB  
        app.use(cookieParser())
        app.use(cors())
      
        app.use(driver.principal) //Http OPtions Acepta o Rechaza Peticciones
        app.use(driver.http_estatus) //Http Verifica El Timeout errores

        for(let valor of listado_routes) 
            app.use(valor.path,require(valor.ruta)) //Instancia cada ruta del sistema
            
        app.use(driver.respuesta_driver)
        app.use(driver.error_404) //Error 404

        console.log('Puertoooooooooooooooooo ',process.env.API_PORT)

        http_server.createServer(app).listen(process.env.API_PORT)
        http_socket.listen(process.env.API_PORT_SOCKET)

        let f_actual = CalendarDate.now().toFormat('yyyy-LL-dd HH:mm:ss')
        console.log(ColAviso,`===> ${process.env.Api_Nombre}, Funcionando ${f_actual} <===`)
    }
    else
    {
        console.log(ColDanger,`Error -> No Se pudo Conectar Con la Base De Datos`)
    }
}
//######################################################################################################################


//######################################################################################################################
inicio()
//######################################################################################################################