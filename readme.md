# TaxisMayla
Este Backend posee las siguientes funciones generales: 

- MAneja los pedidos de viajes para un servicio pequeño de taxis.
- Gestiona los medios de pago y transacciones de pago.

## Comenzando 🚀

_Ejecuta los siguientes pasos en orden:_

## Paso 1 Clona el repositorio:
    ``` 
    $ git clone https://github.com/MYBV/taxismayla.git
    ```
## Paso 2 Entra a la carpeta donde se cescargo el repositorio y ejecuta el siguiente comando:
    ``` 
    $ npm install
    ```

Ya con estos dos pasos se tiene el código del proyecto y se instalan las dependencias.
Adicional a esto debe configurarse los valores de las variables contenidas en el archivo ´´ecosystem.config.js ´´, tales como 
el nombre del servicio de MySQL que corre en la máquina de ejecución, nombre de la BD ...


### Pre-requisitos 📋

_Necesitas instalar lo siguiente:_

## Pre-requisitos 1
* Instala Nodejs

## Pre-requisitos 2
* Instala SGBD MySQL y ajusta en el archivo ecosystem.config los valores de 'API_USUARIO' y 'API_PASSWORD'.
* Crea la BD mayla_taxis.
* Ejecuta el archivo dump contenido en la carpeta bd_inicial.
* Crea una BD llamada taxis_logs (aquí guardaras los logs).
* Ejecuta el siguiente comando en la terminal: npm run pm2 && pm2 log y tendrás el servidor funcionando.


## Construido con 🛠️

_Menciona las herramientas que utilizaste para crear tu proyecto_

* [MySQL](https://www.mysql.com/) - Gestor base de datos.
* [expressjs](https://expressjs.com/es/) - Infraestructura para nodejs utilizada.
* [npm](https://www.npmjs.com/) - Permite instalar diversas librerías utilizadas en el proyecto.


## Autores ✒️

* **Mayla Bautista** - *Trabajo Inicial* - [@bautista_mayla](#Des_Mayla).

## Licencia 📄

Este proyecto está pertenece a [des_mayla].


## Versionado 📌

* **V 1.0.0**

**Caracteristicas de la Versión (V 1.0.0) TAXIS MAYLA**

- Permite a los pasajeros solicitar.
- Conductor incia el viaje.
- Pasajeros culminan el viaje.
- Existen notificaciones a través de socket.io.