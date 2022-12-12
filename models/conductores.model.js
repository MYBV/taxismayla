//##############################################################
module.exports = (sequelize, Sequelize) => {
    const Conductores = sequelize.define("conductores", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_tipoidentificacion: {
        type: Sequelize.INTEGER,
        defaultValue: false,
      },
      identificacion: {
        type: Sequelize.STRING,
        defaultValue: false,
      },
      nombre: {
        type: Sequelize.STRING,
        defaultValue: false,
      },
      telefono: {
        type: Sequelize.STRING,
        defaultValue: false,
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      latitud: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      longitud: {
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
  
    return Conductores;
  };
  //##############################################################
  