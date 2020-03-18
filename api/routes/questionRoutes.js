
const { check } = require('express-validator');
const question = require('../controllers/questionController');
const router = require('express').Router();
const { ensureLoggedIn } = require('../middlewares/auth');

router.get('/', question.list);

router.post('/ask', [check('title', 'Invalid title').not().isEmpty(), check('body').not().isEmpty()], question.ask);
router.post('/:user', question.userQuestions);

module.exports = router;
