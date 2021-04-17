const router = require('express').Router();
const ciudadesCtrl = require('../controllers/ciudadesCtrl');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

router.route('/ciudad')
    .get(ciudadesCtrl.getCiudades)
    .post(ciudadesCtrl.getCiudad)
    .post(ciudadesCtrl.createCiudad)
router.route('/ciudad/:id')
    .delete(auth,authAdmin,ciudadesCtrl.deleteCiudad)
    .put(auth,authAdmin,ciudadesCtrl.updateCiudad)
    

module.exports = router;
