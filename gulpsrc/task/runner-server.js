const express = require('express');
const { path_assets, path_html } = require('../config/directories.js');
const { STATIC_PORT } = require('../config/port');
const app = express();

const server = function () {
  // ROUTER
  app.get('/', (req, res) => {
    res.redirect('index.html');
  });
  app.get('/*.html', (req, res) => {
    const { path: url } = req;
    const file = /[/]?(.+)\.html/.exec(url)

    res.render(file[1]);
  });

  // SETTER
  app.set('views', path_html);
  app.set('view engine', 'pug');
  app.use(express.static(path_assets));


  // LISTEN
  app.listen(STATIC_PORT);
}

server.displayName = 'Runner: server'

module.exports = server; 