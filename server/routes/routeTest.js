const controller 	= require('../controllers/test');
const express 	= require('express');
const router 	= express.Router();

console.log( "cntrl", controller );

for ( var funcionalidad in controller.prototype ){
	var api = '/api/test/' + funcionalidad + '/';

	// var routeController = new router();
	// console.log( "routeController", routeController )
    // Controller.response();
	// var api = '/api/'console.log( funcionalidad );
	// router.route( '/' + funcionalidad).get( funcionalidad );
}

// router.route('/region').get(testCtrl.region);
// router.route('/producto').get(testCtrl.producto);
module.exports 	= router;