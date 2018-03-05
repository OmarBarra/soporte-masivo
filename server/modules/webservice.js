const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const config = require('../config/conf')


function consultaRetus(d) {
  let xml = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://servicios.web.m2k.sds.telcel.com">'+
  '<soapenv:Header/>'+
  '<soapenv:Body>'+
  '<ser:ejecutaServicio>'+
  '<xml><![CDATA[<?xml version="1.0" encoding="ISO-8859-1"?>'+
  '<Request>'+
  '<user>'+d.user+'</user>'+
  '<region>'+d.region+'</region>'+
  '<function>'+d.function+'</function>'+
  '<action>'+d.action+'</action>'+
  '<inputParameters>'+
  '<servicio>'+
  '<p01telefono longitud="10">'+d.linea+'</p01telefono>'+
  '</servicio>'+
  '</inputParameters>'+
  '</Request>'+
  ']]></xml>'+
  '</ser:ejecutaServicio>'+
  '</soapenv:Body>'+
  '</soapenv:Envelope>';
  return new Promise((resolve,reject)=>{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', config.urlWsTelcel, true);
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState==4 && xmlhttp.status == 200) {
        xmlhttp.onload =  function () {
          var res = xmlhttp.responseText;
          if (res) {
            console.log("webservice retus consulta :: exito")
            resolve(res)
          }else {
            console.log("webservice retus consulta :: fallido");
            resolve(res)
          }
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.setRequestHeader('SOAPAction', 'ejecutaServicio');
    xmlhttp.send(xml)
  })
}

function bajaGroup(d) {
  // console.log("servicio baja de grupo",d);
  let xml = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://servicios.web.m2k.sds.telcel.com">'+
  '<soapenv:Header/>'+
  '<soapenv:Body>'+
  '<ser:ejecutaServicio>'+
  '<xml><![CDATA[<?xml version="1.0" encoding="ISO-8859-1"?>'+
  '<Request>'+
  '<user>'+d.user+'</user>'+
  '<region>'+d.region+'</region>'+
  '<function>'+d.function+'</function>'+
  '<action>'+d.action+'</action>'+
  '<inputParameters>'+
  '<actualiza>'+
  '<p01accion longitud="15">'+d.p01accion+'</p01accion>'+
  '<p02parametros longitud="138">'+d.parametros+'</p02parametros>'+
  '</actualiza>'+
  '</inputParameters>'+
  '</Request>'+
  ']]></xml>'+
  '</ser:ejecutaServicio>'+
  '</soapenv:Body>'+
  '</soapenv:Envelope>';
  return new Promise((resolve,reject)=>{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', config.urlWsTelcel, true);
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState==4 && xmlhttp.status == 200) {
        xmlhttp.onload =  function () {
          var res = xmlhttp.responseText;
          if (res) {
            console.log("webservice baja grupo:: exito")
            resolve(res)
          }else {
            console.log("webservice baja grupo :: fallido");
            resolve(res)
          }
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.setRequestHeader('SOAPAction', 'ejecutaServicio');
    xmlhttp.send(xml)
  })
}

function consultaPlan(d) {
  let xml = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://servicios.web.m2k.sds.telcel.com">'+
  '<soapenv:Header/>'+
  '<soapenv:Body>'+
  '<ser:ejecutaServicio>'+
  '<xml><![CDATA[<?xml version="1.0" encoding="ISO-8859-1"?>'+
  '<Request>'+
  '<user>'+d.user+'</user>'+
  '<region>'+d.region+'</region>'+
  '<function>'+d.function+'</function>'+
  '<action>'+d.action+'</action>'+
  '<inputParameters>'+
  '<servicio>'+
  '<p01telefono longitud="10">'+d.linea+'</p01telefono>'+
  '<p02planTarifario longitud="05">'+d['plan actual']+'</p02planTarifario>'+
  '<p03fechaEfectivaPlan longitud="8">'+d.fecha+'</p03fechaEfectivaPlan>'+
  '<p06distribuidorAdenum longitud="09">'+d.dist+'</p06distribuidorAdenum>'+
  '<p07motivo longitud="05">'+d.mtv+'</p07motivo>'+
  '<p08bonificacionSN longitud="01">'+d.bn+'</p08bonificacionSN>'+
  '<p09bonificacionPje longitud="03">'+d['bonificación']+'</p09bonificacionPje>'+
  '</servicio>'+
  '</inputParameters>'+
  '</Request>'+
  ']]></xml>'+
  '</ser:ejecutaServicio>'+
  '</soapenv:Body>'+
  '</soapenv:Envelope>';
  return new Promise((resolve, reject)=> {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', config.urlWsTelcel, true);
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState==4 && xmlhttp.status == 200) {
        xmlhttp.onload =  function () {
          var res = xmlhttp.responseText;
          if (res) {
            console.log("webservice Consulta Plan :: exito")
            resolve(res)
          }else {
            console.log("webservice Consulta Plan :: fallido");
            resolve(res)
          }
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.setRequestHeader('SOAPAction', 'ejecutaServicio');
    xmlhttp.send(xml)
  })

}

function consultaRetusDommy(d) {
return new Promise(function(resolve, reject) {
  // d.estatus = "FALLIDO";
  let result = {
    estatus : "EXITO",idpeticion:"hjdsadks-76876-uihydshg",
    montoPagar : 0, ciclo : 9, estatusNumero : "AC"
  }
  resolve(result)
})
}

function bajaGroupDommy(d) {
  return new Promise(function(resolve, reject) {
    let result = {
      estatus:"EXITO",linea:d.linea,idpeticion:"AAAAaklklklkl-hjkhkjh98"
    }
    resolve(result)
  })
}


module.exports = {
  consultaRetus,
  bajaGroup,
  consultaPlan,
  consultaRetusDommy,
  bajaGroupDommy

};
