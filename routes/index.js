const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
  //#swagger.tags=['Hello World']
  res.send('Welcome to the cosmere!');
});
router.use('/characters', require('./characters'));

module.exports = router;