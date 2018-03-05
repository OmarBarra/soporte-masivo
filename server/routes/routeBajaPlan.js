const controller 	= require('../controllers/bajaplan');
const express 	= require('express');
const router 	= express.Router();

router.route('/verifica').post(controller.verificaLayoutBaja);
router.route('/insertRowSuccess').post(controller.insertRowSuccess);

module.exports 	= router;
