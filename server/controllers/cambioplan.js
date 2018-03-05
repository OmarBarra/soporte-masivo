const upload = require('../config/upload')
const helpers = require('../modules/helpers')
const aux = require('../helpers/functions')
const cambioPlan = require('./consultaPlanController')
const path = require ('path');

const xlstojson  = require('xls-to-json-lc');
const xlsxtojson = require('xlsx-to-json-lc');

const moment  = require('moment')


const pathSave = path.join(__dirname,'..','..','\\server\\files\\CP\\');

var verificaLayoutCambio = function(req, res) {
    var fs = require('fs');

    var File   = req.body.fileInput;
    var newName  = "CP_" + numero(req.body.idUsuario) + "_" + getFecha() + "." + File.filename.split('.').pop();
    var region   = req.body.lblRegion;

    var dir = pathSave + region;
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    var pathname = dir + "\\" + newName;
    fs.writeFile( pathname , File.value, 'base64', function(err) {
        if( err ){
            console.log('Ha ocurrido un error: ' + err);
        }
        else{
            try{
                var exceltojson;
                if( File.filename.split('.').pop() === 'xlsx'){
                    exceltojson = xlsxtojson;
                } else {
                    exceltojson = xlstojson;
                }

                exceltojson({
                    input: pathname,
                    output: null,
                    lowerCaseHeaders:true
                }, function(err,result){
                    if(err) {
                        return res.json({error_code:1,err_desc:err, data: null});
                    }
                    data = result
                    helpers.documentVlid(data,"C")
                    .then((result)=>{
                        res.json(result)
                    })
                })
            }
            catch (e){
                res.json({error_code:1,err_desc:"Corupted excel file"});
            }
        }
    });
}

var insertRowSuccess = function(req, res) {
    let fechaEjecucion = moment(req.body.regionCicloFecha.fecha).format("DD/MM/YY")
    let lineasErr = req.body.registrosNot.length;
    let countLineas = req.body.registrosOk.length + req.body.registrosNot.length;
    let queryString = 'INSERT INTO FOLIO( ID_REGION_PROCESO, ID_USUARIO, ID_CICLO, FOLIO, CANTIDAD_LINEAS, FECHA_ALTA, FECHA_EXE,LINEAS_ERR,ESTATUS) '+
                      'VALUES (:0, :1, :2, :3, :4, :5, :6, :7, :8)';
    conn.execute(   queryString,
                    [2,1,req.body.regionCicloFecha.ciclo,helpers.makeSaveFolio(),countLineas,new Date(),fechaEjecucion,lineasErr,0],
                    { autoCommit: true },
                    function(err, result){
        if (err) { console.error(err); return; }

        conn.execute("SELECT MAX(ID_FOLIO) LAST_ID FROM FOLIO", function(err1, result1){
            if (err1) { console.error(err1); return; }
            resFolio = aux.fetchArray( result1 );

            var queryStringProcedimiento =
            "INSERT INTO PROCEDIMIENTO(ID_PRODUCTO,  ID_TIPO_GRUPO,  ID_FOLIO,  LINEA,  COMENTARIO, PLAN_ACTUAL, PLAN_NUEVO,  ACTIVO,   CICLOS_REINTENTABLES, FECHA_EXE,ID_ESTATUS_TELEFONO)"+
            "VALUES( :0, :1, :2, :3, :4, :5, :6, :7, :8 ,:9, :10)";

            // req.body.registros.forEach( function( item, key){
            //     conn.execute(   queryStringProcedimiento,
            //             [1,1, resFolio[0].LAST_ID , item.linea,item.comentarios,item['plan actual'],item['plan nuevo'],1 ,'03','19/02/18 13:18:10.600000000',],
            //             { autoCommit: true },
            //             function(err, result){
            //         if (err) {
            //           console.error(err);
            //         }else {
            //           item.folio = resFolio[0].LAST_ID;
            //           cambioPlan.consultaPlan(item)
            //         }
            //         if( key == (req.body.registros.length - 1) ){
            //               res.json({ success:1, folio: resFolio[0].LAST_ID });
            //         }
            //     });
            // });

            // Peticion a Web Servide
            let registros = req.body.registros;
            let objeto = []
            let registrosOk = req.body.registrosOk;
            let registrosErr = req.body.registrosNot;

            return new Promise(function(resolve, reject) {

              let ok = new Promise((resolve,reject)=>{
                Promise.each(registrosOk,(item)=>{
                  return new Promise(function(resolve, reject) {
                    conn.execute(   queryStringProcedimiento,
                      [1,1, resFolio[0].LAST_ID , item.linea,item.comentarios,item['plan actual'],item['plan nuevo'],1 ,'03',new Date(),2],
                      { autoCommit: true },
                      function(err, result){
                        if (err) {
                          console.error("ERROR ok",err);
                          resolve()
                        }else {
                          item.folio = resFolio[0].LAST_ID;
                          cambioPlan.consultaPlan(item)
                          .then((result)=>{
                            resolve()
                          })
                        }
                      });
                    })
                  })
                  .then((result)=>{
                    resolve()
                  })
                })

                let err = new Promise((resolve,reject)=>{
                  Promise.each(registrosErr,(item)=>{
                    return new Promise(function(resolve, reject) {
                      conn.execute(   queryStringProcedimiento,
                        [1,1, resFolio[0].LAST_ID , item.linea,item.comentarios,item['plan actual'],item['plan nuevo'],1 ,'03',new Date(),1],
                        { autoCommit: true },
                        function(err, result){
                          if (err) {
                            console.error("ERROR ok",err);
                            resolve()
                          }else {
                            resolve()
                          }
                        });
                      })
                    })
                    .then((result)=>{
                      resolve()
                    })
                  })

                  Promise.settle([ok,err])
                  .then(function(results){
                    if(results[0]._settledValueField==undefined && results[1]._settledValueField==undefined){
                      res.json({ success:1, folio: resFolio[0].LAST_ID });
                    }else{
                      res.json({ success:0});
                    }
                  });
                })
    //
        });
    });
}

var getFolio = function(req, res) {
    let = id_region = req.body.id_region
    conn.execute(`SELECT ID_FOLIO,R.REGION,C.CICLO,FOLIO,CANTIDAD_LINEAS AS LINEAS,FECHA_ALTA,FECHA_EXE,LINEAS_ERR
                  FROM FOLIO F
                  LEFT JOIN CAT_CICLO C
                  ON
                  F.ID_CICLO = C.ID_CICLO
                  LEFT JOIN REGION_PROCESO P
                  ON F.ID_REGION_PROCESO = P.ID_REGION_PROCESO
                  LEFT JOIN CAT_REGION R
                  ON P.ID_REGION = R.ID_REGION
                  WHERE
                  F.ID_REGION_PROCESO = 2
                  AND
                  F.ESTATUS = 0`,
    function(err, result){
        if (err) { console.error("errrors",err); return; }
        let data =aux.fetchArray( result )
        data.forEach((item)=>{
          item.LINEASOK = parseInt(item.LINEAS) - parseInt(item.LINEAS_ERR)
        })
        var response = {
            success:1,
            msg:'Lista de Folios',
            data: data
        };
        res.json( response )
    });
}

var getLines = function(req, res) {
  let = idFolio = req.body.idFolio;
  conn.execute(`SELECT
              ID_PROCEDIMIENTO,
              LINEA,
              BONIFICACION,
              PLAN_ACTUAL,
              PLAN_NUEVO,
              CUOTA,
              E.ESTATUS,
              E.DESCRIPCION
              FROM PROCEDIMIENTO P
              LEFT JOIN CAT_ESTATUS_TELEFONO E
              ON P.ID_ESTATUS_TELEFONO = E.ID_ESTATUS_TELEFONO
              WHERE P.ID_FOLIO = :0 AND P.ID_ESTATUS_TELEFONO = 2`,[ idFolio ],
    function(err, result){
      if (err) { console.error("errrors",err); return; }
      var response = {
        success:1,
        msg:'Lista de Lineas',
        data: aux.fetchArray( result )
      };
      res.json( response )
    });
  }

function getFecha(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();

    var horaActual = today.getTime();

    if(dd<10) {
        dd = '0'+dd
    }

    if(mm<10) {
        mm = '0'+mm
    }

    return yyyy + '' + mm + '' + dd + '' + horaActual;
}

function numero(num){
    numtmp='"'+num+'"';
    largo=numtmp.length-2;
    numtmp=numtmp.split('"').join('');
    if(largo==5)return numtmp;
    ceros='';
    pendientes=5-largo;
    for(i=0;i<pendientes;i++)ceros+='0';
    return ceros+numtmp;
}

module.exports = {
    verificaLayoutCambio,
    insertRowSuccess,
    getFolio,
    getLines
};
