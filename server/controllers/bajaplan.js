const helpers = require('../modules/helpers')
const aux = require('../helpers/functions')
const retusConulta = require('./retusConsultaController')
const path = require ('path');

const BajaGrupo = require('../models/bajaGrupo')

const xlstojson  = require('xls-to-json-lc');
const xlsxtojson = require('xlsx-to-json-lc');


const pathSave = path.join(__dirname,'..','..','\\server\\files\\BA\\');

var verificaLayoutBaja = function(req, res) {
		var fs = require('fs');
		var File   = req.body.fileInput;
		var newName  = "BA_" + aux.numero(req.body.idUsuario) + "_" + aux.getFecha() + "." + File.filename.split('.').pop();
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
										helpers.documentVlid(data,"B")
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

function insertRowSuccess(req, res) {
	return new Promise((resolve, reject) =>{
		let data = {
			ciclo:req.body.region_ciclo.ciclo,
			lineasErr:req.body.registrosNot.length,
			countLineas:req.body.registrosOk.length + req.body.registrosNot.length
		};
		BajaGrupo.saveFolio(data)
		.then((result)=>{
			BajaGrupo.getFolio()
			.then((result)=>{
				resFolio = aux.fetchArray( result )
				// Peticion a Web Servide
				let registrosOk = req.body.registrosOk;
				let registrosErr = req.body.registrosNot;

				let ok = new Promise((resolve,reject)=>{
					Promise.each(registrosOk,(item)=>{
						return new Promise((resolve, reject)=> {
							item.id_producto = 1;
							item.id_tipo_grupo = 1;
							item.id_estatus_telefono = 2;
							BajaGrupo.insterRegisters(item,resFolio)
							.then((result)=>{
								item.folio = resFolio[0].LAST_ID;
								retusConulta.consultaRetusBja(item)
								.then((result)=>{
									resolve()

								})
							})
						})
					})
					.then((result)=>{
						resolve()
					})
				})

				let err = new Promise((resolve,reject)=>{
					Promise.each(registrosErr,(item)=>{
						return new Promise((resolve, reject)=>{
							item.id_producto = null;
							item.id_tipo_grupo = null;
							item.id_estatus_telefono = 1;
							BajaGrupo.insterRegisters(item,resFolio)
							.then((result)=>{
								resolve()
							});
						})
					})
					.then((result)=>{
						resolve()
					})
				})

				Promise.settle([ok,err])
				.then((results)=>{
					if(results[0]._settledValueField==undefined && results[1]._settledValueField==undefined){
						res.json({ success:1, folio: resFolio[0].LAST_ID });
					}else{
						res.json({ success:0});
					}
				})

			})

		})
	})
}

module.exports = {
		verificaLayoutBaja,
		insertRowSuccess
};
