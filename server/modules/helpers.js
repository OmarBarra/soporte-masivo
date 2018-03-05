const xml2js = require('xml2js');

function returnData(data, linea) {
    return new Promise(function(resolve, reject) {
        xmlJson(data)
            .then((result) => {
                cleanResultConsulta(result)
                    .then((result) => {
                        xmlJson(result)
                            .then((result) => {
                                result.linea = linea
                                verificarEstatus(result)
                                    .then((result) => {
                                        resolve(result)
                                    })
                            })
                    })
            })
    })
}

function jsonXml(body) {
    let builder = new xml2js.Builder();
    return builder.buildObject(body);
}


function xmlJson(body) {
    let parser = new xml2js.Parser();
    return new Promise((resolve, reject) => {
        parser.parseString(body, function(err, result) {
            if (!err) {
                // console.log("transformacion xml to json :: Correcta");
                resolve(result)
            } else {
                // console.log("transformacion xml to json :: Fallida");
                resolve(err)
            }
        })
    })
}

function cleanResultConsulta(data) {
    return new Promise((resolve, reject) => {
        let s = "soapenv:Envelope"
        let b = "soapenv:Body"
        let r = "p875:ejecutaServicioResponse"
        let servRtn = "ejecutaServicioReturn"
        let nuevo = data[s][b][0][r][0][servRtn][0];
        resolve(nuevo)
    })
}

function verificarEstatus(data) {
    let rtn = {}
    return new Promise((resolve, reject) => {
        if (data.RespuestaOK != undefined) {
            rtn.estatus = data.RespuestaOK.ESTATUS[0]._;
            rtn.idpeticion = data.RespuestaOK.ESTATUS[0].$.IDPETICION;
            rtn.mensaje = data.RespuestaOK.MENSAJE[0];
            data.RespuestaOK.Errores != undefined ? rtn.errores = data.RespuestaOK.Errores[0] : false;
            data.RespuestaOK.CicloFact != undefined ? rtn.ciclo = data.RespuestaOK.CicloFact[0] : false;
            data.RespuestaOK.EstatusNumero != undefined ? rtn.estatusNumero = data.RespuestaOK.EstatusNumero[0] : false;
            data.RespuestaOK.MontoPagar != undefined ? rtn.MontoPagar = data.RespuestaOK.MontoPagar[0] : false;
            data.RespuestaOK.CuotaCambioPlan != undefined ? rtn.CuotaCambioPlan = data.RespuestaOK.CuotaCambioPlan[0] : false;
            // data.RespuestaOK.RETURNCODE != undefined ? rtn.returncode = data.RespuestaOK.RETURNCODE[0] : false
            rtn.linea = data.linea
            resolve(rtn)

        } else {
            if (data.RespuestaError.ESTATUS[0]._ == "FALLIDO") {
                rtn.estatus = data.RespuestaError.ESTATUS[0]._;
                rtn.idpeticion = data.RespuestaError.ESTATUS[0].$.IDPETICION;
                data.RespuestaError.MENSAJE != undefined ? rtn.mensaje = data.RespuestaError.MENSAJE[0] : false
                data.RespuestaError.DESCRIPCIONERROR != undefined ? rtn.descripcion = data.RespuestaError.DESCRIPCIONERROR[0] : false
                data.RespuestaError.RETURNCODE != undefined ? rtn.returncode = data.RespuestaError.RETURNCODE[0] : false
                rtn.linea = data.linea
                resolve(rtn)
            }
        }
    })
}

function documentVlid(data, doc) {
    let correctos = []
    let fallidos = []
    return new Promise(function(resolve, reject) {
        try{
            if (doc[0] === "B") {
                let tipo = "tipo de grupo"
                let prod = "producto agenda"
                let linea = "linea"
                data.forEach((data)=>{
                    isNaN(data.linea) == true ? data.detalle = "Línea solo debe contener nuemeros": false
                    data.linea.length < 10 ? data.detalle = "Línea con menos de 10 digitos": false;
                    data.linea.length > 10 ? data.detalle = "Línea con mas de 10 digitos" : false;
                    data[tipo].length < 2 ? data.detalle = "Tipo de producto incompleto" : false;
                    data[tipo].length > 2 ? data.detalle = "Tipo de producto con más de 2 caracteres" : false;
                    data[tipo] == "" || data[tipo] == undefined ? data.detalle = "Registro no contiene tipo de producto" : false;
                    data[prod].length < 5 ? data.detalle = "Producto agenda incompleto" : false;
                    data[prod].length > 5 ? data.detalle = "Producto agenda con más de 5 caracteres" : false;
                    data[prod] == "" || data[prod] == undefined ? data.detalle = "Registro no contiene producto agenda" : false;

                    data.linea == "" || data.linea == undefined  || data.linea.length < 10 || data.linea.length > 10 || isNaN(data.linea) == true
                    || data[tipo] == "" || data[tipo] == undefined ||  data[tipo].length < 2  || data[tipo].length > 2
                    ||data[prod] == "" ||data[prod] == undefined ||data[prod].length < 5 ||data[prod].length > 5 ?
                    fallidos.push(data) : correctos.push(data);
                })
                fallidos.forEach((item)=>{
                  item.err = 1
                })
                correctos.forEach((item)=>{
                  item.err = 0
                })
                resolve({
                    success: 1,
                    proceso: "Baja de Grupo",
                    correcto: correctos,
                    fallido: fallidos
                })
            }
            if (doc[0] === "C") {
                let plnAct = "plan actual";
                let plnNw = "plan nuevo";
                let linea = "linea"
                let bonificacion = "bonificación";

                data.forEach((data) => {
                  isNaN(data.linea) == true ? data.detalle = "Línea solo debe contener nuemeros": false
                  data.linea.length < 10 ? data.detalle = "Línea con menos de 10 digitos": false;
                  data.linea.length > 10 ? data.detalle = "Línea con mas de 10 digitos" : false;
                  data[plnAct].length < 5 ? data.detalle = "Plan actual incompleto" : false;
                  data[plnAct].length > 5 ? data.detalle = "Plan actual demaciado grande" : false;
                  data[plnAct] == "" || data[plnAct] == undefined ? data.detalle = "Registro no contiene plan actual" : false;
                  data[plnNw].length < 5 ? data.detalle = "Plan nuevo incompleto" : false;
                  data[plnNw].length > 5 ? data.detalle = "Plan nuevo demaciado grande" : false;
                  data[plnNw] == "" || data[plnNw] == undefined ? data.detalle = "Registro no contiene plan nuevo" : false;
                  data[bonificacion].length < 3 ? data.detalle = "Bonificacion incompleto" : false;
                  data[bonificacion].length > 3 ? data.detalle = "Bonificaion demaciado grande" : false;
                  data[bonificacion] == "" || data[bonificacion] == undefined ? data.detalle = "Registro no contiene Bonificaion" : false;

                  data.linea == "" || data.linea == undefined  || data.linea.length < 10 || data.linea.length > 10 || isNaN(data.linea) == true
                  || data[plnAct] == "" || data[plnAct] == undefined ||  data[plnAct].length < 5  || data[plnAct].length > 5
                  || data[plnNw] == "" || data[plnNw] == undefined ||  data[plnNw].length < 5  || data[plnNw].length > 5 ?
                  fallidos.push(data) : correctos.push(data);
                })
                fallidos.forEach((item)=>{
                  item.err = 1
                })
                correctos.forEach((item)=>{
                  item.err = 0
                })
                resolve({
                    success: 1,
                    proceso: "Cambio de Plan",
                    correcto: correctos,
                    fallido: fallidos
                })
            } else {
                resolve({
                    success: 0,
                    proceso: "Proceso No Identificado"
                })
            }
        }
        catch( e ){
            resolve({
                    success: 0,
                    proceso: "Proceso No Identificado"
                })
        }
    })
}

function makeSaveFolio() {
  let p1 =  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let p2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let p3 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let pf1 = ""
  let pf2 = ""
  let pf3 = ""

  for( var i=0; i < 6; i++ )
  pf1 += p1.charAt(Math.floor(Math.random() * p1.length));

  for( var i=0; i < 6; i++ )
  pf2 += p2.charAt(Math.floor(Math.random() * p2.length));

  for( var i=0; i < 6; i++ )
  pf3 += p3.charAt(Math.floor(Math.random() * p3.length));

  let folio = pf1 + '-' + pf2 + '-' + pf3;

  return folio
}


module.exports = {
    jsonXml,
    xmlJson,
    cleanResultConsulta,
    verificarEstatus,
    returnData,
    documentVlid,
    makeSaveFolio
};
