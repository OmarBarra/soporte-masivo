const controller 	= require('../controllers/catalogosController');
const express 	= require('express');
const router 	= express.Router();

router.route('/region').get(controller.region);
router.route('/ciclo').post(controller.ciclo);
router.route('/getProducto').get(controller.producto);
router.route('/setProducto').post(controller.setProducto);
router.route('/getRegiones').get(controller.regiones);
router.route('/setRegiones').post(controller.setRegiones);

module.exports 	= router;
