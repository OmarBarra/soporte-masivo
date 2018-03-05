const Catalogo = require('../models/catalogo')
const aux = require('../helpers/functions')

function region(req,res) {
  return new Promise(function(resolve, reject) {
    Catalogo.getRegion()
    .then((result)=>{
      let response = { success : 1, msg: 'Catalogo de Regiones Activas', data:aux.fetchArray(result) };
        res.json(response)
    })
  })
}

function ciclo(req,res) {
  let id_region = req.body.id_region;
  Catalogo.getCiclo(id_region)
  .then((result)=>{
    let response = {success:1, msg:'Catalogo de ciclos Activos', data: aux.fetchArray( result )};
    res.json(response)
  })
}

function producto(req,res) {
  let id = req.query.id;
 console.log('query: ' + JSON.stringify(req.query));
  Catalogo.getProducto(id)
  .then((result)=>{
    console.log(JSON.stringify(result));
    let response = {success:1, msg:'Catalogo de productos Activos', data: aux.fetchArray( result )};
    res.json(response)
  });
}

function setProducto(req,res) {
  let idCrud = req.body.idCrud;
  let id = req.body.id;
  let producto = req.body.producto;
  let activo = req.body.activo;
  let descripcion = req.body.descripcion;

  console.log(JSON.stringify(req.body));

  Catalogo.setProducto(idCrud, id, producto, activo, descripcion)
  .then((result)=>{
    console.log(JSON.stringify(result));
    let response = {success:1, msg:'Catalogo de productos Activos', data: JSON.stringify(result)};
    res.json(response);
  });
}

module.exports = {
    region,
    ciclo,
    producto,
    setProducto
};
