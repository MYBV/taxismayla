//##############################################################
module.exports = (sequelize, Sequelize) => {
    const ListaAlertas = sequelize.define("notificaciones", {
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
      ref: {
        type: Sequelize.INTEGER,
        defaultValue: false,
      },
      canal: {
        type: Sequelize.STRING,
        defaultValue: false,
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        defaultValue: false,
      },
      evento: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      uuid: {
        type: Sequelize.STRING,
        defaultValue: false,
      },
      eliminatedAt: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
    });
  
    return ListaAlertas;
  };
  //##############################################################
  