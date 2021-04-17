const router = require('express').Router();
const usuarioCtrl = require('../controllers/usuarioCtrl');
const auth = require('../middleware/auth');

router.post('/register',usuarioCtrl.register);
router.post("/login", usuarioCtrl.login);
router.get("/logout", usuarioCtrl.logout);


router.get("/refresh_token", usuarioCtrl.refreshToken);
router.get('/infor', auth, usuarioCtrl.getUser);

module.exports = router;