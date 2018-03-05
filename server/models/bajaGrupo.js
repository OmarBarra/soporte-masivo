const helpers = require('../modules/helpers')

function saveFolio(d) {
  return new Promise((resolve, reject)=> {
    let query = `INSERT INTO FOLIO
    ( ID_REGION_PROCESO, ID_USUARIO, ID_CICLO, FOLIO, CANTIDAD_LINEAS, FECHA_ALTA, FECHA_EXE,LINEAS_ERR,ESTATUS)
    VALUES
    (:0, :1, :2, :3, :4, :5, :6, :7, :8)`;
    conn.execute( query,
      [1,1,d.ciclo,helpers.makeSaveFolio(),d.countLineas,new Date(),new Date(),d.lineasErr,1],
      {autoCommit:true},
      (err,result) =>{
        if (!err) {
          resolve()
        }else {
          reject()
        }
      })
    })
  }

function getFolio() {
  return new Promise((resolve, reject) => {
    let query = `SELECT MAX(ID_FOLIO) LAST_ID FROM FOLIO`;
    conn.execute( query,(err,result)=> {
      if (!err) {
        resolve(result)
      }else {
        console.log(err);
        reject()
      }
    })
  })
}

function insterRegisters(d,resFolio) {
  return new Promise((resolve, reject)=> {
    let query = `INSERT INTO PROCEDIMIENTO
    (ID_PRODUCTO,  ID_TIPO_GRUPO,  ID_FOLIO,  LINEA,  COMENTARIO,  ACTIVO,   CICLOS_REINTENTABLES, FECHA_EXE,ID_ESTATUS_TELEFONO)
    VALUES( :0, :1, :2, :3, :4, :5, :6, :7,:8)`;
    conn.execute( query,
      [d.id_producto,d.id_tipo_grupo, resFolio[0].LAST_ID , d.linea,d.comentarios,1 ,'03',new Date(),d.id_estatus_telefono],
      {autoCommit:true},
      (err,result) =>{
        if (!err) {
          resolve()
        }else {
          console.log(err);
          reject()
        }
    })
  })
}

function actualizaBajaGrupo(d) {
  return new Promise((resolve, reject)=> {
  d.ln = '%'+d.linea+'%'
  let query = `UPDATE PROCEDIMIENTO SET ID_ESTATUS_TELEFONO = :0, CODE = :1 ,IDPETICION = :2 ,COMENTARIO = :3
               WHERE LINEA LIKE :4 AND ID_FOLIO = :5`;
    conn.execute( query ,
      [d.id_estatus,d.returncode,d.idpeticion,d.descripcion, d.ln,d.folio],
      { autoCommit : true},
      (err,result)=> {
        if(err){
          console.log("error",err);
          resolve()
        }else {
          resolve()
        }
      })
  })
}

module.exports = {
  saveFolio,
  getFolio,
  insterRegisters,
  actualizaBajaGrupo
};
