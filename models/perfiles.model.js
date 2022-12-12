//##############################################################
module.exports = (sequelize, Sequelize) => {
  const Perfiles = sequelize.define("perfiles", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    descripcion: {
      type: Sequelize.STRING,
      defaultValue: false,
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

  return Perfiles;
};
//##############################################################
