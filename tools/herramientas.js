//##################################################################################################
global.isjson = (json) => {
  if (json == null) return false;
  else {
    //let str = json.toString()
    try {
      let str = String();

      if (typeof json != "string") str = JSON.stringify(json);
      else str = json;
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
};
//##################################################################################################
global.sleep = async function (segundos) {
  return new Promise((resolve) => {
    setTimeout(async () => {
      resolve(true);
    }, segundos * 1000);
  });
};
//##################################################################################################

//##################################################################################################
module.exports = "Correcto-> Herramientas Cargadas";
//##################################################################################################
