const helpers = require('../modules/helpers')
const ws = require('../modules/webservice')
const BajaGrupo = require('../models/bajaGrupo')


function consultaRetusBja(d) {
  return new Promise(function(resolve, reject) {
    let typeGrp = "tipo de grupo";
    let prodAg = "producto agenda";
    let linea = d.linea;
    d.user = "VI9M2KW";
    d.region = "I";
    d.function = "I*0F";
    d.action = "C";
    d.parametros = d.linea + d['tipo de grupo'] + d['producto agenda'];
    // ws.consultaRetus(d)
    ws.consultaRetusDommy(d)
    .then((result)=>{
      // helpers.returnData(result,linea)
      // .then((result)=>{
        if (result.estatus === "FALLIDO") {
          let update = {
            folio : d.folio, descripcion : result.mensaje,
            returncode : "ASN45", id_estatus : 4, linea : d.linea,
            idpeticion : null
          };
          BajaGrupo.actualizaBajaGrupo(update)
          .then((result)=>{
            resolve()
          })
        }else if (result.estatus === "EXITO") {
          let update = {
            folio : d.folio, descripcion : "OPERACION EXITOSA",
            returncode : "PG010", id_estatus : 3, linea : d.linea,
            idpeticion : result.idpeticion, montoPagar : result.MontoPagar,
            ciclo : result.ciclo, estatus :result.estatusNumero
          }
          BajaGrupo.actualizaBajaGrupo(update)
          .then((result)=>{
            d.action = "A"
            d.function = "I*U8"
            d.p01accion = "BAJAGPOS"
            d.montoPagar = update.MontoPagar;
            d.estatus = update.estatusNumero;
            d.ciclo = update.ciclo;
            // ws.bajaGroup(d)
            ws.bajaGroupDommy(d)
            .then((result)=>{
              // helpers.returnData(result,linea)
              // .then((result)=>{
                if (result.estatus == "FALLIDO") {
                  let updateBaja = {
                    linea : result.linea, descripcion : result.descripcion,
                    returncode : result.returncode,  id_estatus : 4,
                    idpeticion : result.idpeticion ,folio :d.folio
                  }
                  BajaGrupo.actualizaBajaGrupo(updateBaja)
                  .then((result)=>{
                    resolve()
                  })
                }else if(result.estatus == "EXITO"){
                  let updateBaja = {
                    linea : result.linea, descripcion : "EXITOSA",
                    returncode : "PG010",  id_estatus : 5,
                    idpeticion : result.idpeticion, folio :d.folio
                  }
                  BajaGrupo.actualizaBajaGrupo(updateBaja)
                  .then((result)=>{
                    resolve()
                  })
                }
              // }) return data baja grupo
            })
          })
        }
      // }) return data consulta retus
    })
  })
}

module.exports = {
  consultaRetusBja
};
