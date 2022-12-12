module.exports = {
    apps: [{

        name: "Bk_taxis",
        script: "./app.js",
        env: {
            "NODE_ENV": "development",
            "Api_Nombre":"Bk taxis nodejs express dev",
            "API_PORT":1204,
            "API_PORT_SOCKET":1205,
            "API_HOST":"127.0.0.1",
            "API_USUARIO":"desarrollo",
            "API_PASSWORD":"BerSys29*",
            "API_DATABASE":"mayla_taxis",
            "DBLOGS_HOST":"127.0.0.1",
            "DBLOGS_USER":"desarrollo",
            "DBLOGS_PASSWORD":"BerSys29*",
            "DBLOGS_DATABASE":"taxis_logs",
            "API_JWT":"BK_taxis_*0001",
            "tok_test": "tok_test_30865_9147aec8BFC5f48518939FBd4830a522",
            "priv_test": "prv_test_9KPEQ8YxWmysyLzeYKqHGVvlHc2jFdTS",
            "pub_test": "pub_test_eq4oeIsNr6lGmCyBFspIJqnL8UK2esYo",
            "url_pagos": "https://sandbox.wompi.co/v1"
        },  

        env_production: {
            "NODE_ENV": "production",
            "Api_Nombre":"Bk taxis nodejs express pro",
            "API_PORT":1988,
            "API_PORT_SOCKET":1989,
            "API_HOST":"127.0.0.1",
            "API_USUARIO":"desarrollo",
            "API_PASSWORD":"BerSys2911*",
            "API_DATABASE":"mayla_taxis",
            "DBLOGS_HOST":"127.0.0.1",
            "DBLOGS_USER":"desarrollo",
            "DBLOGS_PASSWORD":"BerSys2911*",
            "DBLOGS_DATABASE":"taxis_logs",
            "API_JWT":"BK_taxis_*0001",
            "tok_test": "tok_test_30865_9147aec8BFC5f48518939FBd4830a522",
            "priv_test": "prv_test_9KPEQ8YxWmysyLzeYKqHGVvlHc2jFdTS",
            "pub_test": "pub_test_eq4oeIsNr6lGmCyBFspIJqnL8UK2esYo",
            "url_pagos": "https://sandbox.wompi.co/v1"
        }  
    }]
}