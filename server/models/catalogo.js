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

module.exports = {
  getRegion,
  getCiclo,
  getProducto,
  setProducto
};
