
const { check } = require('express-validator');
const user = require('../controllers/userController');
const router = require('express').Router();
const { ensureLoggedIn } = require('../middlewares/auth');

router.get('/', user.list);

router.post('/signup', [check('email', 'Invalid email').isEmail(), check('password').isLength({ min: 8 })], user.signup);
router.post('/login', [check('email', 'Invalid email').isEmail()], user.login);

router.get('/profie', ensureLoggedIn, user.profile);
router.post('/profie', ensureLoggedIn, user.update);
router.post('/avatar', ensureLoggedIn, user.avatar);

module.exports = router;
