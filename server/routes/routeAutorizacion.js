const autorizacionCrtl = require('../controllers/autorizacionController')
const express = require('express')
const router = express.Router();

router.route('/').post(autorizacionCrtl.autorizacion)

module.exports = router;
