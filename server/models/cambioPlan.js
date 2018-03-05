function insertErrorPlan(d) {
  return new Promise(function(resolve, reject) {
    d.linea = '%'+d.linea+'%';
    let query =
      `UPDATE PROCEDIMIENTO
      SET ID_ESTATUS_TELEFONO = :0, IDPETICION = :1, COMENTARIO = :2,  FECHA_EXE = :3
      WHERE LINEA LIKE :4 AND ID_FOLIO = :5`;
      conn.execute( query ,
      [2,d.idpeticion,d.mensaje,new Date(),d.linea,d.folio],
      {autoCommit : true},
      function (err,result){
        if (err) {
          console.log('error',err);
          resolve()
        }else {
          console.log('correcto');
          resolve()
        }
      })
  })
}

function insertExitoPlan(d) {
  return new Promise(function(resolve, reject) {
    d.linea = '%'+d.linea+'%';
    let query =
      `UPDATE PROCEDIMIENTO
      SET ID_ESTATUS_TELEFONO = :0, IDPETICION = :1, COMENTARIO = :2, BONIFICACION = :3, CUOTA = :4 , FECHA_EXE = :5, CODE = :6
      WHERE LINEA LIKE :7 AND ID_FOLIO = :8`;
      conn.execute( query ,
      [2,d.idpeticion,d.mensaje,d.bonificacion,d.cuota,new Date(),d.code, d.linea,d.folio],
      {autoCommit : true},
      function (err,result){
        if (err) {
          console.log('error insetr',err);
          resolve()
        }else {
          console.log('correcto');
          resolve()
        }
      })
  })
}


module.exports = {
  insertErrorPlan,
  insertExitoPlan
};
