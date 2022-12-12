//##############################################################
module.exports = (sequelize, Sequelize) => {
    const UsuarioPasajero = sequelize.define("usuario_pasajeros", {
      id_usuario: {
        type: Sequelize.INTEGER,
        defaultValue: false,
      },
      id_pasajero: {
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
  
    return UsuarioPasajero;
  };
  //##############################################################
  