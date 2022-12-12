//##############################################################
module.exports = (sequelize, Sequelize) => {
    const Transacciones = sequelize.define("transacciones", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      monto: {
        type: Sequelize.STRING,
        defaultValue: false,
      },
      referencia: {
        type: Sequelize.STRING,
        defaultValue: false,
      },
      id_pagometodo: {
        type: Sequelize.INTEGER,
        defaultValue: false,
      },
      id_viaje: {
        type: Sequelize.INTEGER,
        defaultValue: false,
      },
      id_transaccion: {
        type: Sequelize.STRING,
        defaultValue: false,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "ACTIVO",
      },
      eliminatedAt: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
    });
  
    return Transacciones;
  };
  //##############################################################
  