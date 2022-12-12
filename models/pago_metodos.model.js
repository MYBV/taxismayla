//##############################################################
module.exports = (sequelize, Sequelize) => {
    const PagoMetodos = sequelize.define("pago_metodos", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_pasajero: {
        type: Sequelize.INTEGER,
        defaultValue: false,
      },
      accept: {
        type: Sequelize.STRING,
        defaultValue: false,
      },
      token: {
        type: Sequelize.STRING,
        defaultValue: "ACTIVO",
      },
      id_metodo: {
        type: Sequelize.STRING,
        defaultValue: "ACTIVO",
      },
      eliminatedAt: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
    });
  
    return PagoMetodos;
  };
  //##############################################################
  