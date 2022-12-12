//#############################################################################################
let Procedure = module.exports;
//#############################################################################################
let mihttp = require('../tools/mihttp')
//#############################################################################################

//#############################################################################################
Procedure.calcular_total = async(viaje)=>{

    let tarifas = Storage.get('tarifas')

    let basico = parseInt(tarifas.find(row=> row.tipo == 'BASICA').monto)

    let tarifas_min = tarifas.find(row=> row.tipo == 'MINUTO').monto
    let tarifas_km = tarifas.find(row=> row.tipo == 'KM').monto

    let total_min = parseInt((viaje.total_minutos * tarifas_min))
    let total_km  = parseInt((viaje.total_km * tarifas_km))

    console.log('basico ',basico)
    console.log('total_min ',total_min)
    console.log('total_km ',total_km)

    let total_pago = (basico + total_min + total_km)

    return total_pago
}
//#############################################################################################
Procedure.CrearTransaccion = async(pagometodo, referencia, monto)=>{
    console.log('CrearTransaccionCrearTransaccionCrearTransaccionCrearTransaccion')
    let body_tr = {
        "acceptance_token": pagometodo.accept,
        "amount_in_cents": monto,
        "currency": "COP",
        "customer_email": "example@wompi.co",
        "payment_method": {
          "type": "CARD",
          "token": pagometodo.token,
          "installments": 2
        },
        "payment_source_id": pagometodo.id_metodo,
        "redirect_url": "https://mitienda.com.co/pago/resultado",
        "reference": referencia,
        "customer_data": {
          "phone_number": "573307654321",
          "full_name": "Juan Alfonso Perez Rodriguez",
          "legal_id": "1234567890",
          "legal_id_type": "CC"
        },
        "shipping_address": {
          "address_line_1": "Calle 34 # 56 - 78",
          "address_line_2": "Apartamento 502, Torre I",
          "country": "CO",
          "region": "Cundinamarca",
          "city": "Bogota",
          "name": "Pepe Perez",
          "phone_number": "573109999999",
          "postal_code": "111111"
        }
    }

    let headers_tr = {
        "Authorization": `Bearer ${process.env.priv_test}`,
        "Content-Type": "application/json",
        "accept": "application/json"
    }

    let end_point = 'transactions'

    let resultado = await mihttp('POST', end_point, headers_tr, {}, JSON.stringify(body_tr))
    console.log(resultado)
    return {id: resultado.body.data.id, status: resultado.body.data.status}
}
//#############################################################################################
Procedure.CrearMetodoPago = async(email, token_accept, token_tr)=>{

    let headers_tr = {
        "Authorization": `Bearer ${process.env.priv_test}`,
        "Content-Type": "application/json",
        "accept": "application/json"
    }

    let obj_body = {
        "type": "CARD",
        "token": token_tr,
        "acceptance_token": token_accept,
        "customer_email": email
    }

    let end_point = 'payment_sources'

    let resultado = await mihttp('POST', end_point, headers_tr, {}, JSON.stringify(obj_body))
    console.log(resultado)
    return resultado.body.data.id
}
//#############################################################################################
Procedure.ObtenerMerchants = async()=>{
    
    let endpoint = `merchants/${process.env.pub_test}`
    let resultado = await mihttp('GET', endpoint)
    console.log(resultado)

    if(resultado === false)
    {
        //Emitir alerta error transaccion
    }

    let token_aceptacion = resultado.body.data.presigned_acceptance.acceptance_token

    return token_aceptacion
}
//#############################################################################################
Procedure.TokenizarTarjeta = async()=>{
    console.log('TokenizarTarjetaTokenizarTarjetaTokenizarTarjetaTokenizarTarjetaTokenizarTarjeta')
    let body_tk = {
        "number": "4242424242424242",
        "cvc": "789",
        "exp_month": "12",
        "exp_year": "29",
        "card_holder": "Pedro Perez"
    }

    let headers_tk = {
        "Authorization": `Bearer ${process.env.pub_test}`,
        "Content-Type": "application/json",
        "accept": "application/json"
    }

    let endpoint = 'tokens/cards'

    let resultado = await mihttp('POST', endpoint, headers_tk, {}, JSON.stringify(body_tk))
    console.log(resultado)

    if(resultado === false)
    {
        //Emitir alerta error transaccion
    }

    let token_tarjeta = resultado.body.data.id

    return token_tarjeta
}
//#############################################################################################