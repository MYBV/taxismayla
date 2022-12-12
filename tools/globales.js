//######################################################################################################
//Variables Modulos Inicio
global.fs            = require("fs");
global.http_server   = require("http");
global.http_socket   = require('http').createServer()
global.io            = require('socket.io')(http_socket)
global.turf          =  require('@turf/turf')
global.path          = require("path");
const { v4: uuidv4 } = require("uuid");
global.uuid          = uuidv4;
global.shortid       = require('short-unique-id')
global.uid           =  new shortid()
global.events        =  require('events')
global.JWT           = require("jsonwebtoken");
global._pick         = require("lodash.pick");
const { DateTime }   = require("luxon");
global.CalendarDate  = DateTime;
//Variables Modulos Inicio

//Arreglos y objetos globales Inicio
global.list_session    = {};
global.list_socket     = {}
global.list_peticiones = {}; 
//Arreglos y objetos globales Fin

//Eventos internos Inicio
global.AsignarConductor    = new events.EventEmitter()
global.ProcesarTransaccion = new events.EventEmitter()
global.CrearMediosPagos    = new events.EventEmitter()
//Eventos  Internos Fin

//Inicio Colores
global.ColAviso  = "\x1b[1;46;33m%s\x1b[0m";
global.ColDanger = "\x1b[1;41;33m%s\x1b[0m";
global.Color_1   = "\x1b[36m%s\x1b[0m"; //Cyan
global.Color_2   = "\x1b[32m%s\x1b[0m"; //Verde
global.Color_3   = "\x1b[1;33m%s\x1b[0m"; //Amarillo
global.Color_4   = "\x1b[35m%s\x1b[0m"; //Magenta
global.Color_5   = "\x1b[5;46;30m%s\x1b[0m";
//Fin Colores
//######################################################################################################

//######################################################################################################
module.exports = "Correcto-> Cargado Variables Globales";
//######################################################################################################
