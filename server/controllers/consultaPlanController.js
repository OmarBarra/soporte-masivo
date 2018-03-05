const ws = require('../modules/webservice')
const helpers = require('../modules/helpers')
const CambioPlan = require('../models/cambioPlan')
let datos;
function consultaPlan(d) {
  return new Promise(function(resolve, reject) {
    d.user = "VI9M2KW";
    d.region = "I";
    d.function = "I*0F";
    d.action = "H";
    d.fecha = '26/02/18';
    d.dist = 'POLANCO'
    d.mtv = 'CAPPR';
    d.bn = 'S';
    let linea = d.linea;
    ws.dommy(d)
    .then((result)=>{
      // helpers.returnData(result,linea)
      // .then((result)=>{
        console.log(result);
        result.folio = d.folio
        if (result.estatus === "EXITO") {
          // actualizacion base de datos
          CambioPlan.insertErrorPlan(result)
          .then((result)=>{
            resolve()
          })
        }else if (result.estatus === "FALLIDO") {
          // Cambio de plan Exitoso
          result.cuota = 0.5;
          result.idpeticion = '3j00esjnbj367-shgdjg39'
          result.mensaje = "OPERACION EXITOSA"
          result.code = "PG010"
          result.bonificacion = '10';
          CambioPlan.insertExitoPlan(result)
          .then((result)=>{
            resolve()
          })
          // actualizacion base de datos
        }
        // resolve(result)
      // })
    })
  })
}

function conversion(req,res) {
  helpers.xmlJson(datos)
  .then((result)=>{
    helpers.cleanResultConsulta(result)
    .then((result)=>{
      helpers.xmlJson(result)
      .then((result)=>{
        res.json(result)
      })
    })
  })
}

module.exports = {
  consultaPlan
};
