const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('index.html');
});

router.get('/*.html', (req, res) => {
  const { path: url } = req;
  const file = /[/]?(.+)\.html/.exec(url)

  res.render(file[1]);
});

module.exports = router;