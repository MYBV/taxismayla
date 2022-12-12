//##############################################################
module.exports = (sequelize, Sequelize) => {
    const Tarifas = sequelize.define("tarifas", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      monto: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: false,
      },
      tipo: {
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
  
    return Tarifas;
  };
  //##############################################################
  