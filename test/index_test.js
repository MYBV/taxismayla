//##########################################################################################
const { describe, it } = require('mocha')
const { url , chai , expect } = require('./config')
require('../app')
//##########################################################################################

//##########################################################################################
describe('Endpoints',async()=>{
    await require('../app')
    var token_cond = String()
    var token_psg  = String()
    var id_viaje_activo_psg = 0
    var id_viaje_activo_cond = 0
    //######################################################################################
    describe('Login',()=>{
    //Se realiza login de conductor y pasajero para obtener token de cada uno
        //##################################################################################
        it('Login Conductor',async() => {
            await sleep(2)
            let resultado = await chai.request(url)
                .post('/')
                .send({"data":"6ea7d6745683a8233da1e6b205ccd1ff4ebf78816914f099c60c7c51b1a9c7dc63066bd4a6a71bed8f971552e96edabec182de059de01ed79798c9f2f0d9c25b"})
                expect(resultado.statusCode).to.equal(200)
                token_cond = resultado.body.token
        }).timeout(5000)
        //##################################################################################
        it('Login Pasajero',async() => {
            await sleep(2)
            let resultado = await chai.request(url)
                .post('/')
                .send({"data":"dfd5dea2179a6e6ace96be760d172b6917594ada8ab9466e902528cea895cfbd9626c7444717aab7a3bbdd509bcafa35a7491e9478d421b38e539a621f695edd"})
                expect(resultado.statusCode).to.equal(200)
                token_psg = resultado.body.token
        }).timeout(5000)
    })    
    //######################################################################################
    describe('Viajes', ()=>{
        //##################################################################################
        it('Conductor solicita viaje', async()=>{
            //Se espera un status 400 ya que un viaje solo lo puede solicitar un pasajero
            await sleep(1)
            let resultado = await chai.request(url)
            .post('/viajes/solicitar')
            .set('Authorization', token_cond)
            .send({"latitud_origen": "7.8920277375","longitud_origen": "-72.4866977"})
            expect(resultado.statusCode).to.equal(400)
        }).timeout(5000)
        //##################################################################################
        it('Pasajero solicita viaje', async()=>{
            //Se espera un status 200 
            await sleep(1)
            let resultado = await chai.request(url)
            .post('/viajes/solicitar')
            .set('Authorization', token_psg)
            .send({"latitud_origen": "7.8920277375","longitud_origen": "-72.4866977"})
            expect(resultado.statusCode).to.equal(200)
        }).timeout(5000)
        //##################################################################################
        it('Solicitar viajes pasajero', async()=>{
            //Se espera un status 200 
            //de aqui tomare id de viaje activo para cancelarlo
            await sleep(1)
            let resultado = await chai.request(url)
            .get('/viajes')
            .set('Authorization', token_psg)
            expect(resultado.statusCode).to.equal(200)

            let viaje_activo = resultado.body.filter(row=> row.estado == 'ACTIVO')
            expect(viaje_activo).to.have.length(1)

            id_viaje_activo_psg = viaje_activo[0].id
        }).timeout(5000)
        //##################################################################################
        it('Pasajero cancela viaje', async()=>{
            //Se espera un status 200 
            await sleep(1)
            let resultado = await chai.request(url)
            .delete(`/viajes/cancelar/${id_viaje_activo_psg}`)
            .set('Authorization', token_psg)
            expect(resultado.statusCode).to.equal(200)
        }).timeout(5000)
        //##################################################################################
        it('Pasajero solicita nuevo viaje', async()=>{
            //Se espera un status 200 
            await sleep(1)
            let resultado = await chai.request(url)
            .post('/viajes/solicitar')
            .set('Authorization', token_psg)
            .send({"latitud_origen": "7.8920277375","longitud_origen": "-72.4866977"})
            expect(resultado.statusCode).to.equal(200)
        }).timeout(5000)
        //##################################################################################
        it('Solicitar viajes pasajero obtener nuevo', async()=>{
            //Se espera un status 200 
            //de aqui tomare id de viaje activo para cancelarlo
            await sleep(1)
            let resultado = await chai.request(url)
            .get('/viajes')
            .set('Authorization', token_psg)
            expect(resultado.statusCode).to.equal(200)

            let viaje_activo = resultado.body.filter(row=> row.estado == 'ACTIVO')
            expect(viaje_activo).to.have.length(1)

            id_viaje_activo_psg = viaje_activo[0].id
        }).timeout(5000)
        //##################################################################################
        it('Solicitar viajes conductor', async()=>{
            //Se espera un status 200 
            //de aqui tomare id de viaje activo para cancelarlo
            await sleep(1)
            let resultado = await chai.request(url)
            .get('/viajes')
            .set('Authorization', token_cond)
            expect(resultado.statusCode).to.equal(200)

            let viaje_activo = resultado.body.filter(row=> row.estado == 'ACTIVO')
            expect(viaje_activo).to.have.length(1)

            id_viaje_activo_cond = viaje_activo[0].id
        }).timeout(5000)
        //##################################################################################
        it('Conductor inicia viaje', async()=>{
            //Se espera un status 200 
            await sleep(1)
            let resultado = await chai.request(url)
            .put(`/viajes/iniciar/${id_viaje_activo_cond}`)
            .set('Authorization', token_cond)
            expect(resultado.statusCode).to.equal(200)
        }).timeout(5000)
        //##################################################################################
        it('Pasajero culmina viaje', async()=>{
            //Se espera un status 200 
            await sleep(20)
            let resultado = await chai.request(url)
            .put(`/viajes/culminar/${id_viaje_activo_psg}`)
            .send({"latitud_destino": "7.880796", "longitud_destino": "-72.5071057"})
            .set('Authorization', token_psg)
            expect(resultado.statusCode).to.equal(200)
        }).timeout(25000)
    })
    //######################################################################################
})
//##########################################################################################
