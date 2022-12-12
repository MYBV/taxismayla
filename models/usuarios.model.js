//##############################################################
module.exports = (sequelize, Sequelize) => {
    const Usuarios = sequelize.define("usuarios", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_perfil: {
        type: Sequelize.INTEGER,
        defaultValue: false,
      },
      login: {
        type: Sequelize.STRING,
        defaultValue: false,
      },
      token: {
        type: Sequelize.STRING,
        defaultValue: true,
      },
      estado: {
        type: Sequelize.STRING,
        defaultValue: "ACTIVO",
      },
      eliminatedAt: {
        type: Sequelize.DATE,
        defaultValue: true,
      },
    });
  
    return Usuarios;
  };
  //##############################################################
  