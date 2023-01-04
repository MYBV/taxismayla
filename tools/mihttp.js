//#####################################################################################################################################
const request = require("request")
//#####################################################################################################################################


//#####################################################################################################################################
let consultahttp =  async (method,endpoint,headers={},form={},data=String())=>{

    return new Promise(resolve=>{

        let options = 
        { 
            method: method,
            url: `${process.env.url_pagos}/${endpoint}`,
            headers: headers, 
        }
        
        if(Object.keys(form).length > 0)options.form = form
        if(data.length > 0)options.body = data

        request(options,(error, response, body)=> {
            if (!error) 
            {
                try 
                {
                    resolve({status:response.statusCode, body:JSON.parse(body),header:response.headers})   
                } 
                catch (error) 
                {
                    resolve(false)  
                }

            }else 
            {
                resolve(false)
            }
        })
    })
}
//#####################################################################################################################################


//#####################################################################################################################################
module.exports = consultahttp
//#####################################################################################################################################