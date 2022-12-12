//##############################################################
module.exports = (sequelize, Sequelize) => {
    const Vehiculos = sequelize.define("vehiculos", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      placa: {
        type: Sequelize.STRING,
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
  
    return Vehiculos;
  };
  //##############################################################
  