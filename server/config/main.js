conn = null;
oracledb = require('oracledb');

Promise = require('bluebird');

const fs = require('fs');

const orcl_cred = JSON.parse(fs.readFileSync(__dirname + '/oracle_cred'));


function start() {
  return new Promise((resolve, reject) => {
      oracledb.getConnection(orcl_cred,(err,connection)=>{
        if (err) {
          console.log("Ocurrio un error con la Base de Datos",err);
          reject()
        }else {
          console.log(" :: Conectados con Oracle :: ");
          conn = connection;
          resolve()
        }
      })

  })
}

module.exports = {
  start
};
