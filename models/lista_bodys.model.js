//##############################################################
module.exports = (sequelize, Sequelize) => {
    const ListaBodys = sequelize.define("lista_bodys", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      method: {
        type: Sequelize.STRING,
        defaultValue: false,
      },
      ruta: {
        type: Sequelize.STRING,
        defaultValue: false,
      },
      body: {
        type: Sequelize.STRING,
        defaultValue: false,
      },
      eliminatedAt: {
        type: Sequelize.DATE,
        defaultValue: false,
      },
    });
  
    return ListaBodys;
  };
  //##############################################################
  