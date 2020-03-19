
const { check } = require('express-validator');
const question = require('../controllers/questionController');
const router = require('express').Router();
const { ensureLoggedIn } = require('../middlewares/auth');

router.get('/', question.list);

router.post('/ask', [check('title', 'Invalid title').not().isEmpty(), check('body').not().isEmpty()], ensureLoggedIn, question.ask);
router.get('/user/:user', ensureLoggedIn, question.userQuestions);
router.get('/:question', ensureLoggedIn, question.single);

module.exports = router;
