const consultaPlanCtrl = require('../controllers/consultaPlanController')
const express = require('express')
const router = express.Router();

router.route('/').post( consultaPlanCtrl.consultaPlan)

module.exports = router;