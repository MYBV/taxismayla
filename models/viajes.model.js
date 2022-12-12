//##############################################################
module.exports = (sequelize, Sequelize) => {
    const Viajes = sequelize.define("viajes", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      pasajeroId: {
        type: Sequelize.INTEGER,
        defaultValue: false,
      },
      fechahora_solicitud: {
        type: Sequelize.DATE,
        defaultValue: false,
      },
      fechahora_inicio: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
      fechahora_fin: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
      id_conductor: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      id_vehiculo: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      calificacion: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      observacion_pasajero: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      observacion_conductor: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      total_pago: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: null,
      },
      total_km: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      total_minutos: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      latitud_origen: {
        type: Sequelize.STRING,
        defaultValue: false,
      },
      longitud_origen: {
        type: Sequelize.STRING,
        defaultValue: false,
      },
      latitud_destino: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      longitud_destino: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      estado: {
        type: Sequelize.STRING,
        defaultValue: "ACTIVO",
      },
      eliminatedAt: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
    });
  
    return Viajes;
  };
  //##############################################################
  