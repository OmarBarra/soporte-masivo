const upload = require('../config/upload')
const helpers = require('../modules/helpers')
const aux = require('../helpers/functions')

var Conciliacion = function (conf) {
    console.log( "conf", conf );
    console.log('Hola cosa!');
};

Conciliacion.prototype.region = function( req, res, next) {
    conn.execute("SELECT * FROM CAT_REGION", function(err, result){
        if (err) { console.error(err); return; }

        var response = {
            error_code:1,
            err_desc:'Este es una prueba',
            data: aux.fetchArray( result )
        };
        res.json( response )
    });
}

Conciliacion.prototype.producto = function(req, res, next) {
    conn.execute("SELECT * FROM CAT_PRODUCTO", function(err, result){
        if (err) { console.error(err); return; }

        var response = {
            error_code:1,
            err_desc:'Este es una prueba',
            data: aux.fetchArray( result )
        };
        res.json( response )
    });
}


// var region = function( req, res, next) {
//     conn.execute("SELECT * FROM CAT_REGION", function(err, result){
//         if (err) { console.error(err); return; }

//         var response = {
//             error_code:1,
//             err_desc:'Este es una prueba',
//             data: aux.fetchArray( result )
//         };
//         res.json( response )
//     });
// }

// var producto = function(req, res, next) {
//     conn.execute("SELECT * FROM CAT_PRODUCTO", function(err, result){
//         if (err) { console.error(err); return; }

//         var response = {
//             error_code:1,
//             err_desc:'Este es una prueba',
//             data: aux.fetchArray( result )
//         };
//         res.json( response )
//     });
// }

module.exports = Conciliacion;
// console.log( "Conciliacion", Conciliacion );
// module.exports = {
//     region,
//     producto
// };
