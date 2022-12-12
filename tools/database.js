//###################################################################################
const { Sequelize } = require("sequelize");
//###################################################################################
const ConectSequelize = module.exports;
//ConectSequelize.db = Object();
//###################################################################################

//###################################################################################
ConectSequelize.TestConect = async () => {
  const sequelize = new Sequelize(
    process.env.API_DATABASE,
    process.env.API_USUARIO,
    process.env.API_PASSWORD,
    {
      host: process.env.API_HOST,
      dialect: "mysql",
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    }
  );

  return new Promise(async (resolve) => {
    try {
      await sequelize.authenticate();
      console.log(Color_2, `Conexion prueba sequelize OK`);
      global.MySequelize = Sequelize;
      global.mysequelize = sequelize;
      global.MyOp        = Sequelize.Op;
      resolve(true);
    } catch (error) {
      console.log(ColDanger, `Error probando conect Sequelize`);
      resolve(false);
    }
  });
};
//###################################################################################
