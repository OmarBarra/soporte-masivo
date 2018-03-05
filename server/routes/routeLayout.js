const validaLayoutCtrl = require('../controllers/layoutController')
const express = require('express')
const router = express.Router();


router.route('/').post(validaLayoutCtrl.layoutBajaGrupo)
router.route('/export').post(validaLayoutCtrl.exportXls)
router.route('/exportAutorizacion').post(validaLayoutCtrl.exportXlsAutorizacion)




  module.exports = router;
