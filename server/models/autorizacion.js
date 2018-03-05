function updateProceso(d) {
  return new Promise(function(resolve, reject) {
    let query = `UPDATE FOLIO SET ESTATUS = 1 WHERE ID_FOLIO = :0`;
    conn.execute(query, [d], {autoCommit : true},
    function (err,result) {
      if (!err) {
        resolve()
      }else {
        console.log("ERROR LOG",err);
        reject()
      }
    })
  })
}

function changeProcess(folio,data) {
  return new Promise(function(resolve, reject) {
    let exe = [];
    data.forEach((data)=>{
      data.folio = folio;
      data.selected == true ? exe.push(data):false;
    })
    Promise.each(exe,(item)=>{
      return new Promise(function(resolve, reject) {
        let query = `UPDATE PROCEDIMIENTO SET ID_ESTATUS_TELEFONO = 3 WHERE ID_FOLIO = :0 AND ID_PROCEDIMIENTO = :1 AND ID_ESTATUS_TELEFONO = 2`;
        conn.execute(query,[item.folio,item.ID_PROCEDIMIENTO],{autoCommit : true},
        function (err,result) {
          if (!err) {
            resolve()
          }else {
            resolve()
          }
        })
      })
    })
    .then((result)=>{
      resolve()
    })

  })
}

module.exports = {
  updateProceso,
  changeProcess
};
