//##############################################################
module.exports = (sequelize, Sequelize) => {
    const ListaAlertas = sequelize.define("lista_alertas", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      accion: {
        type: Sequelize.STRING,
        defaultValue: false,
      },
      descripcion: {
        type: Sequelize.STRING,
        defaultValue: false,
      },
      eliminatedAt: {
        type: Sequelize.DATE,
        defaultValue: false,
      },
    });
  
    return ListaAlertas;
  };
  //##############################################################
  