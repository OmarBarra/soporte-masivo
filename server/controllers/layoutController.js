const upload = require('../config/upload')
const xlstojson  = require('xls-to-json-lc');
const xlsxtojson = require('xlsx-to-json-lc');
const multer = require('multer')
const helpers = require('../modules/helpers')
const json2xls = require('json2xls');
const fs  = require('fs');
const path = require ('path');


function layoutBajaGrupo(req,res) {
  let data = []
  var exceltojson;
  upload(req,res,function(err){
    if(err){
      res.json({error_code:1,err_desc:err});
      return;
    }
    if(!req.file){
      res.json({error_code:1,err_desc:"No file passed"});
      return;
    }
    if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
      exceltojson = xlsxtojson;
    } else {
      exceltojson = xlstojson;
    }
    try {
      let doc = req.file.originalname.split('',1)
      exceltojson({
        input: req.file.path,
        output: null,
        lowerCaseHeaders:true
      }, function(err,result){
        if(err) {
          return res.json({error_code:1,err_desc:err, data: null});
        }
        data = result
        helpers.documentVlid(data,doc)
        .then((result)=>{
          res.json(result)
        })
      });
    } catch (e){
      res.json({error_code:1,err_desc:"Corupted excel file"});
    }
  })
}


function exportXls(req,res) {
    let data = []
    let datos = req.body
    datos.registros.forEach((item)=>{
      data.push(item)
    })
    let date_serv = Date.now();
    let excel = (path.join(__dirname,'..','..','dist/'+date_serv+'.xlsx'));
    var xls = json2xls(data);
    fs.writeFileSync(excel, xls, 'binary');
    res.json(date_serv);
}

function exportXlsAutorizacion(req,res) {
    let data = []
    let datos = req.body
    datos.registros.forEach((item)=>{
      data.push(item)
    })
    let date_serv = Date.now();
    let excel = (path.join(__dirname,'..','..','dist/'+date_serv+'.xlsx'));
    var xls = json2xls(data);
    fs.writeFileSync(excel, xls, 'binary');
    res.json(date_serv);
}

module.exports = {
  layoutBajaGrupo,
  exportXls,
  exportXlsAutorizacion
};
