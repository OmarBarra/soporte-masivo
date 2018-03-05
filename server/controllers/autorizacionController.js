const Autorizacion = require('../models/autorizacion')

function autorizacion(req,res) {
  let folio = req.body.folio;
  let data = req.body.lineas.data
  Autorizacion.updateProceso(folio)
  .then((result)=>{
    Autorizacion.changeProcess(folio,data)
    .then((result)=>{
      res.json({success:1})
    })
  })

}


module.exports = {
  autorizacion
};
