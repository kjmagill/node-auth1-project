const router = require('express').Router();

router.get('/', (req, res) => {
  res.json({ caution: '* You are now entering the Restricted Zone *' });
});

module.exports = router;
