const controller 	= require('../controllers/catalogosController');
const express 	= require('express');
const router 	= express.Router();

router.route('/region').get(controller.region);
router.route('/ciclo').post(controller.ciclo);
router.route('/getProducto').get(controller.producto);
router.route('/setProducto').post(controller.setProducto);
router.route('/getRegiones').get(controller.regiones);
router.route('/setRegiones').post(controller.setRegiones);
router.route('/getCiclos').get(controller.ciclos);
router.route('/setCiclos').post(controller.setCiclos);
router.route('/getEstatusTelefono').get(controller.estatusTelefono);
router.route('/setEstatusTelefono').post(controller.setEstatusTelefono);
router.route('/getTipoGrupo').get(controller.tipoGrupo);
router.route('/setTipoGrupo').post(controller.setTipoGrupo);
router.route('/getProceso').get(controller.proceso);
router.route('/setProceso').post(controller.setProceso);

module.exports 	= router;
