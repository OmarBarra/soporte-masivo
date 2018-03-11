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

function regiones(req,res) {
  let id = req.query.id;
 console.log('query: ' + JSON.stringify(req.query));
  Catalogo.getRegiones(id)
  .then((result)=>{
    console.log(JSON.stringify(result));
    let response = {success:1, msg:'Catalogo de regiones Activas', data: aux.fetchArray( result )};
    res.json(response)
  });
}

function setRegiones(req,res) {
  let idCrud = req.body.idCrud;
  let id = req.body.id;
  let region = req.body.region;
  let activo = req.body.activo;

  console.log(JSON.stringify(req.body));

  Catalogo.setRegiones(idCrud, id, region, activo)
  .then((result)=>{
    console.log(JSON.stringify(result));
    let response = {success:1, msg:'Catalogo de regiones Activas', data: JSON.stringify(result)};
    res.json(response);
  });
}

function ciclos(req,res) {
  let id = req.query.id;
 console.log('query: ' + JSON.stringify(req.query));
  Catalogo.getCiclos(id)
  .then((result)=>{
    console.log(JSON.stringify(result));
    let response = {success:1, msg:'Catalogo de ciclos Activos', data: aux.fetchArray( result )};
    res.json(response)
  });
}

function setCiclos(req,res) {
  let idCrud = req.body.idCrud;
  let id = req.body.id;
  let ciclo = req.body.ciclo;
  let activo = req.body.activo;
  let descripcion = req.body.descripcion;

  console.log(JSON.stringify(req.body));

  Catalogo.setCiclos(idCrud, id, ciclo, activo, descripcion)
  .then((result)=>{
    console.log(JSON.stringify(result));
    let response = {success:1, msg:'Catalogo de ciclos Activos', data: JSON.stringify(result)};
    res.json(response);
  });
}

function estatusTelefono(req,res) {
  let id = req.query.id;
 console.log('query: ' + JSON.stringify(req.query));
  Catalogo.getEstatusTelefono(id)
  .then((result)=>{
    console.log(JSON.stringify(result));
    let response = {success:1, msg:'Catalogo de estatus telefono Activos', data: aux.fetchArray( result )};
    res.json(response)
  });
}

function setEstatusTelefono(req,res) {
  let idCrud = req.body.idCrud;
  let id = req.body.id;
  let estatus = req.body.estatus;
  let activo = req.body.activo;
  let descripcion = req.body.descripcion;

  console.log(JSON.stringify(req.body));

  Catalogo.setEstatusTelefono(idCrud, id, estatus, activo, descripcion)
  .then((result)=>{
    console.log(JSON.stringify(result));
    let response = {success:1, msg:'Catalogo de estatuss Activos', data: JSON.stringify(result)};
    res.json(response);
  });
}

function tipoGrupo(req,res) {
  let id = req.query.id;
 console.log('query: ' + JSON.stringify(req.query));
  Catalogo.getTipoGrupo(id)
  .then((result)=>{
    console.log(JSON.stringify(result));
    let response = {success:1, msg:'Catalogo de tipo grupo Activos', data: aux.fetchArray( result )};
    res.json(response)
  });
}

function setTipoGrupo(req,res) {
  let idCrud = req.body.idCrud;
  let id = req.body.id;
  let grupo = req.body.grupo;
  let activo = req.body.activo;
  let descripcion = req.body.descripcion;

  console.log(JSON.stringify(req.body));

  Catalogo.setTipoGrupo(idCrud, id, grupo, activo, descripcion)
  .then((result)=>{
    console.log(JSON.stringify(result));
    let response = {success:1, msg:'Catalogo de grupos Activos', data: JSON.stringify(result)};
    res.json(response);
  });
}

function proceso(req,res) {
  let id = req.query.id;
 console.log('query: ' + JSON.stringify(req.query));
  Catalogo.getProceso(id)
  .then((result)=>{
    console.log(JSON.stringify(result));
    let response = {success:1, msg:'Catalogo de procesos Activos', data: aux.fetchArray( result )};
    res.json(response)
  });
}

function setProceso(req,res) {
  let idCrud = req.body.idCrud;
  let id = req.body.id;
  let proceso = req.body.proceso;
  let code = req.body.code;
  let comentario = req.body.comentario;

  console.log(JSON.stringify(req.body));

  Catalogo.setProceso(idCrud, id, proceso, code, comentario)
  .then((result)=>{
    console.log(JSON.stringify(result));
    let response = {success:1, msg:'Catalogo de procesos Activos', data: JSON.stringify(result)};
    res.json(response);
  });
}

module.exports = {
    region,
    ciclo,
    producto,
    setProducto,
    regiones,
    setRegiones,
    ciclos,
    setCiclos,
    estatusTelefono,
    setEstatusTelefono,
    tipoGrupo,
    setTipoGrupo,
    proceso,
    setProceso
};
