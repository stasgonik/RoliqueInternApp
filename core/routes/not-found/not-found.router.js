const router = require('express').Router();

router.use('*', (req, res) => res.json('Router not found!'));

module.exports = router;
