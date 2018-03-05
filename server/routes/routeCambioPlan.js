const controller 	= require('../controllers/cambioplan');
const express 	= require('express');
const router 	= express.Router();

router.route('/verifica').post(controller.verificaLayoutCambio);
router.route('/insertRowSuccess').post(controller.insertRowSuccess);
router.route('/getFolio').post(controller.getFolio);
router.route('/getLines').post(controller.getLines);

module.exports 	= router;
