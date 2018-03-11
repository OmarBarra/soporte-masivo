function getRegion() {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM CAT_REGION`;
    conn.execute( query , (err,result) => {
      if (!err) {
        resolve(result)
      }
      else {
        console.error("errrors",err);
        reject()
      }
    })
  })
}

function getCiclo(d) {
  return new Promise((resolve, reject)=> {
    let query = `SELECT R.REGION,C.CICLO,C.DESCRIPCION,X.ID_CICLO
                  FROM REGION_CICLO X
                  LEFT JOIN CAT_REGION R
                  ON R.ID_REGION = X.ID_REGION
                  LEFT JOIN CAT_CICLO C
                  ON C.ID_CICLO = X.ID_CICLO
                  WHERE X.ID_REGION = :0
                  ORDER BY ID_REGION_CICLO ASC`;
    conn.execute( query, [d], (err,result) =>{
      if (!err) {
        resolve(result)
      }else {
        console.log(err);
        reject()
      }
    })
  })
}

function getProducto(id) {
  return new Promise((resolve, reject) => {
    let query = '';
    console.log(id);
    if (!id) {
      query = 'SELECT * FROM CAT_PRODUCTO';
      conn.execute( query, (err,result) => {
        if (!err) {
          console.log(result);
          resolve(result);
        }else {
          console.log(err);
          reject();
        }
      });
    } else {
      query = 'SELECT * FROM CAT_PRODUCTO WHERE ID_PRODUCTO = :id';
      conn.execute( query, [id], (err,result) => {
        if (!err) {
          console.log(result);
          resolve(result);
        }else {
          console.log(err);
          reject();
        }
      });
    }
  });
}

function setProducto(idCrud, id, producto, activo, descripcion) {
  return new Promise((resolve, reject) => {
    let bindVars = '';
    let query = '';
    
    switch (+idCrud) {
      case 1: {
        query = `INSERT INTO CAT_PRODUCTO
                          (
                            PRODUCTO ,
                            ACTIVO ,
                            DESCRIPCION
                          )
                          VALUES
                          (
                            :producto ,
                            :activo ,
                            :descripcion
                          )`;

        bindVars = {
          producto: producto, // default direction is BIND_IN. Data type is inferred from the data
          activo: +activo,
          descripcion: descripcion
        }
        break;
      }
      case 2: {
        query = `UPDATE CAT_PRODUCTO
                  SET PRODUCTO      = :producto ,
                      ACTIVO          = :activo ,
                      DESCRIPCION     = :descripcion
                  WHERE ID_PRODUCTO = :id`;

        bindVars = {
          id: id,
          producto: producto, // default direction is BIND_IN. Data type is inferred from the data
          activo: activo,
          descripcion: descripcion,
        }
        break;
      }
      case 3: {
        query = `DELETE CAT_PRODUCTO
                  WHERE ID_PRODUCTO = :id`;

        bindVars = {
          id: id
        }
        break;
      }
    }

    

    conn.execute( query, bindVars, {autoCommit : true}, (err,result) => {
      if (!err) {
        console.log(result);
        resolve(result);
      }else {
        console.log(err);
        reject();
      }
    });
  });
}

function getRegiones(id) {
  return new Promise((resolve, reject) => {
    let query = '';
    console.log(id);
    if (!id) {
      query = 'SELECT * FROM CAT_REGION';
      conn.execute( query, (err,result) => {
        if (!err) {
          console.log(result);
          resolve(result);
        }else {
          console.log(err);
          reject();
        }
      });
    } else {
      query = 'SELECT * FROM CAT_REGION WHERE ID_REGION = :id';
      conn.execute( query, [id], (err,result) => {
        if (!err) {
          console.log(result);
          resolve(result);
        }else {
          console.log(err);
          reject();
        }
      });
    }
  });
}

function setRegiones(idCrud, id, region, activo) {
  return new Promise((resolve, reject) => {
    let bindVars = '';
    let query = '';
    
    switch (+idCrud) {
      case 1: {
        query = `INSERT INTO CAT_REGION
                          (
                            REGION ,
                            ACTIVO 
                          )
                          VALUES
                          (
                            :region ,
                            :activo
                          )`;

        bindVars = {
          region: region, // default direction is BIND_IN. Data type is inferred from the data
          activo: +activo
        }
        break;
      }
      case 2: {
        query = `UPDATE CAT_REGION
                  SET REGION      = :region ,
                      ACTIVO          = :activo 
                  WHERE ID_REGION = :id`;

        bindVars = {
          id: id,
          region: region, // default direction is BIND_IN. Data type is inferred from the data
          activo: activo
        }
        break;
      }
      case 3: {
        query = `DELETE CAT_REGION
                  WHERE ID_REGION = :id`;

        bindVars = {
          id: id
        }
        break;
      }
    }

    conn.execute( query, bindVars, {autoCommit : true}, (err,result) => {
      if (!err) {
        console.log(result);
        resolve(result);
      }else {
        console.log(err);
        reject();
      }
    });
  });
}

function getCiclos(id) {
  return new Promise((resolve, reject) => {
    let query = '';
    console.log(id);
    if (!id) {
      query = 'SELECT * FROM CAT_CICLO';
      conn.execute( query, (err,result) => {
        if (!err) {
          console.log(result);
          resolve(result);
        }else {
          console.log(err);
          reject();
        }
      });
    } else {
      query = 'SELECT * FROM CAT_CICLO WHERE ID_CICLO = :id';
      conn.execute( query, [id], (err,result) => {
        if (!err) {
          console.log(result);
          resolve(result);
        }else {
          console.log(err);
          reject();
        }
      });
    }
  });
}

function setCiclos(idCrud, id, ciclo, activo, descripcion) {
  return new Promise((resolve, reject) => {
    let bindVars = '';
    let query = '';
    
    switch (+idCrud) {
      case 1: {
        query = `INSERT INTO CAT_CICLO
                          (
                            CICLO ,
                            ACTIVO ,
                            DESCRIPCION
                          )
                          VALUES
                          (
                            :ciclo ,
                            :activo ,
                            :descripcion
                          )`;

        bindVars = {
          ciclo: ciclo, // default direction is BIND_IN. Data type is inferred from the data
          activo: +activo,
          descripcion: descripcion
        }
        break;
      }
      case 2: {
        query = `UPDATE CAT_CICLO
                  SET CICLO      = :ciclo ,
                      ACTIVO          = :activo ,
                      DESCRIPCION     = :descripcion
                  WHERE ID_CICLO = :id`;

        bindVars = {
          id: id,
          ciclo: ciclo, // default direction is BIND_IN. Data type is inferred from the data
          activo: activo,
          descripcion: descripcion,
        }
        break;
      }
      case 3: {
        query = `DELETE CAT_CICLO
                  WHERE ID_CICLO = :id`;

        bindVars = {
          id: id
        }
        break;
      }
    }

    conn.execute( query, bindVars, {autoCommit : true}, (err,result) => {
      if (!err) {
        console.log(result);
        resolve(result);
      }else {
        console.log(err);
        reject();
      }
    });
  });
}

function getEstatusTelefono(id) {
  return new Promise((resolve, reject) => {
    let query = '';
    console.log(id);
    if (!id) {
      query = 'SELECT * FROM CAT_ESTATUS_TELEFONO';
      conn.execute( query, (err,result) => {
        if (!err) {
          console.log(result);
          resolve(result);
        }else {
          console.log(err);
          reject();
        }
      });
    } else {
      query = 'SELECT * FROM CAT_ESTATUS_TELEFONO WHERE ID_ESTATUS_TELEFONO = :id';
      conn.execute( query, [id], (err,result) => {
        if (!err) {
          console.log(result);
          resolve(result);
        }else {
          console.log(err);
          reject();
        }
      });
    }
  });
}

function setEstatusTelefono(idCrud, id, estatus, activo, descripcion) {
  return new Promise((resolve, reject) => {
    let bindVars = '';
    let query = '';
    
    switch (+idCrud) {
      case 1: {
        query = `INSERT INTO CAT_ESTATUS_TELEFONO
                          (
                            ESTATUS ,
                            ACTIVO ,
                            DESCRIPCION
                          )
                          VALUES
                          (
                            :estatus ,
                            :activo ,
                            :descripcion
                          )`;

        bindVars = {
          estatus: estatus, // default direction is BIND_IN. Data type is inferred from the data
          activo: +activo,
          descripcion: descripcion
        }
        break;
      }
      case 2: {
        query = `UPDATE CAT_ESTATUS_TELEFONO
                  SET ESTATUS      = :estatus ,
                      ACTIVO          = :activo ,
                      DESCRIPCION     = :descripcion
                  WHERE ID_ESTATUS_TELEFONO = :id`;

        bindVars = {
          id: id,
          estatus: estatus, // default direction is BIND_IN. Data type is inferred from the data
          activo: activo,
          descripcion: descripcion,
        }
        break;
      }
      case 3: {
        query = `DELETE CAT_ESTATUS_TELEFONO
                  WHERE ID_ESTATUS_TELEFONO = :id`;

        bindVars = {
          id: id
        }
        break;
      }
    }

    conn.execute( query, bindVars, {autoCommit : true}, (err,result) => {
      if (!err) {
        console.log(result);
        resolve(result);
      }else {
        console.log(err);
        reject();
      }
    });
  });
}

function getTipoGrupo(id) {
  return new Promise((resolve, reject) => {
    let query = '';
    console.log(id);
    if (!id) {
      query = 'SELECT * FROM CAT_TIPO_GRUPO';
      conn.execute( query, (err,result) => {
        if (!err) {
          console.log(result);
          resolve(result);
        }else {
          console.log(err);
          reject();
        }
      });
    } else {
      query = 'SELECT * FROM CAT_TIPO_GRUPO WHERE ID_TIPO_GRUPO = :id';
      conn.execute( query, [id], (err,result) => {
        if (!err) {
          console.log(result);
          resolve(result);
        }else {
          console.log(err);
          reject();
        }
      });
    }
  });
}

function setTipoGrupo(idCrud, id, grupo, activo, descripcion) {
  return new Promise((resolve, reject) => {
    let bindVars = '';
    let query = '';
    
    switch (+idCrud) {
      case 1: {
        query = `INSERT INTO CAT_TIPO_GRUPO
                          (
                            GRUPO ,
                            ACTIVO ,
                            DESCRIPCION
                          )
                          VALUES
                          (
                            :grupo ,
                            :activo ,
                            :descripcion
                          )`;

        bindVars = {
          grupo: grupo, // default direction is BIND_IN. Data type is inferred from the data
          activo: +activo,
          descripcion: descripcion
        }
        break;
      }
      case 2: {
        query = `UPDATE CAT_TIPO_GRUPO
                  SET GRUPO      = :grupo ,
                      ACTIVO          = :activo ,
                      DESCRIPCION     = :descripcion
                  WHERE ID_TIPO_GRUPO = :id`;

        bindVars = {
          id: id,
          grupo: grupo, // default direction is BIND_IN. Data type is inferred from the data
          activo: activo,
          descripcion: descripcion,
        }
        break;
      }
      case 3: {
        query = `DELETE CAT_TIPO_GRUPO
                  WHERE ID_TIPO_GRUPO = :id`;

        bindVars = {
          id: id
        }
        break;
      }
    }

    conn.execute( query, bindVars, {autoCommit : true}, (err,result) => {
      if (!err) {
        console.log(result);
        resolve(result);
      }else {
        console.log(err);
        reject();
      }
    });
  });
}

function getProceso(id) {
  return new Promise((resolve, reject) => {
    let query = '';
    console.log(id);
    if (!id) {
      query = 'SELECT * FROM CAT_PROCESO';
      conn.execute( query, (err,result) => {
        if (!err) {
          console.log(result);
          resolve(result);
        }else {
          console.log(err);
          reject();
        }
      });
    } else {
      query = 'SELECT * FROM CAT_PROCESO WHERE ID_PROCESO = :id';
      conn.execute( query, [id], (err,result) => {
        if (!err) {
          console.log(result);
          resolve(result);
        }else {
          console.log(err);
          reject();
        }
      });
    }
  });
}

function setProceso(idCrud, id, proceso, code, comentario) {
  return new Promise((resolve, reject) => {
    let bindVars = '';
    let query = '';
    
    switch (+idCrud) {
      case 1: {
        query = `INSERT INTO CAT_PROCESO
                          (
                            PROCESO ,
                            CODE ,
                            COMENTARIO
                          )
                          VALUES
                          (
                            :proceso ,
                            :code ,
                            :comentario
                          )`;

        bindVars = {
          proceso: proceso, // default direction is BIND_IN. Data type is inferred from the data
          code: code,
          comentario: +comentario
        }
        break;
      }
      case 2: {
        query = `UPDATE CAT_PROCESO
                  SET PROCESO      = :proceso ,
                      CODE          = :code ,
                      COMENTARIO     = :comentario
                  WHERE ID_PROCESO = :id`;

        bindVars = {
          id: id,
          proceso: proceso, // default direction is BIND_IN. Data type is inferred from the data
          code: code,
          comentario: comentario,
        }
        break;
      }
      case 3: {
        query = `DELETE CAT_PROCESO
                  WHERE ID_PROCESO = :id`;

        bindVars = {
          id: id
        }
        break;
      }
    }

    conn.execute( query, bindVars, {autoCommit : true}, (err,result) => {
      if (!err) {
        console.log(result);
        resolve(result);
      }else {
        console.log(err);
        reject();
      }
    });
  });
}

function getRegionCiclo(id) {
  return new Promise((resolve, reject) => {
    let query = '';
    console.log(id);
    if (!id) {
      query = 'SELECT * FROM REGION_CICLO';
      conn.execute( query, (err,result) => {
        if (!err) {
          console.log(result);
          resolve(result);
        }else {
          console.log(err);
          reject();
        }
      });
    } else {
      query = 'SELECT * FROM REGION_CICLO WHERE ID_REGION_CICLO = :id';
      conn.execute( query, [id], (err,result) => {
        if (!err) {
          console.log(result);
          resolve(result);
        }else {
          console.log(err);
          reject();
        }
      });
    }
  });
}

function setRegionCiclo(idCrud, id, idRegion, idCiclo) {
  return new Promise((resolve, reject) => {
    let bindVars = '';
    let query = '';
    
    switch (+idCrud) {
      case 1: {
        query = `INSERT INTO REGION_CICLO
                          (
                            ID_REGION ,
                            ID_CICLO 
                          )
                          VALUES
                          (
                            :idRegion ,
                            :idCiclo
                          )`;

        bindVars = {
          idRegion: +idRegion, // default direction is BIND_IN. Data type is inferred from the data
          idCiclo: +idCiclo
        }
        break;
      }
      case 2: {
        query = `UPDATE REGION_CICLO
                  SET ID_REGION      = :idRegion ,
                      ID_CICLO          = :idCiclo 
                  WHERE ID_REGION_CICLO = :id`;

        bindVars = {
          id: id,
          idRegion: +idRegion, // default direction is BIND_IN. Data type is inferred from the data
          idCiclo: +idCiclo
        }
        break;
      }
      case 3: {
        query = `DELETE REGION_CICLO
                  WHERE ID_REGION_CICLO = :id`;

        bindVars = {
          id: id
        }
        break;
      }
    }

    conn.execute( query, bindVars, {autoCommit : true}, (err,result) => {
      if (!err) {
        console.log(result);
        resolve(result);
      }else {
        console.log(err);
        reject();
      }
    });
  });
}

module.exports = {
  getRegion,
  getCiclo,
  getProducto,
  setProducto,
  getRegiones,
  setRegiones,
  getCiclos,
  setCiclos,
  getEstatusTelefono,
  setEstatusTelefono,
  getTipoGrupo,
  setTipoGrupo,
  getProceso,
  setProceso,
  getRegionCiclo,
  setRegionCiclo
};
