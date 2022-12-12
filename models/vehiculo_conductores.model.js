//##############################################################
module.exports = (sequelize, Sequelize) => {
    const VehiculoConductor = sequelize.define("vehiculo_conductores", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      vehiculoId: {
        type: Sequelize.INTEGER,
        defaultValue: false,
      },
      conductoreId: {
          type: Sequelize.INTEGER,
          defaultValue: false,
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
  
    return VehiculoConductor;
  };
  //##############################################################
  