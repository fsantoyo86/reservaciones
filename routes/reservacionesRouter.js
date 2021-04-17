const router = require('express').Router();
const reservacionCtrl = require('../controllers/reservacionCtrl');


router.route('/reservacion')
    .get(reservacionCtrl.getReservacion)
    .post(reservacionCtrl.createReservacion)

router.route('/reservacion/:id')
    .delete(reservacionCtrl.deleteReservacion)
    .put(reservacionCtrl.updateReservacion)



module.exports = router