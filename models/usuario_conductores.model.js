//##############################################################
module.exports = (sequelize, Sequelize) => {
  const UsuarioConductor = sequelize.define("usuario_conductores", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_usuario: {
      type: Sequelize.INTEGER,
      defaultValue: false,
    },
    id_conductor: {
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

  return UsuarioConductor;
};
//##############################################################
