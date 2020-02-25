const bcrypt = require('bcryptjs');
const router = require('express').Router();
const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const restrictedRouter = require('../restricted/restricted-router.js');
const restricted = require('../auth/restricted-middleware.js');

router.use('/auth', authRouter);
router.use('/users', restricted, usersRouter);
router.use('/restricted', restricted, restrictedRouter);

router.get('/hash', (req, res) => {
  // read the Authentication header
  const authentication = req.headers.authentication;
  // hash the value from that header
  const hash = bcrypt.hashSync(authentication, 8);

  res.json({ originalValue: authentication, hashedValue: hash });
});

router.get('/', (req, res) => {
  res.json({ api: 'Its alive' });
});

module.exports = router;
