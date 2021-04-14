const router = require('express').Router();

const { authRouter } = require('../auth');
const { emailRouter } = require('../email');
const userRouter = require('../user');

router.use('/auth', authRouter);
router.use('/email', emailRouter);
router.use('/users', userRouter);

module.exports = router;
