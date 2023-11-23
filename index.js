const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send('Hello World! I am Action Demo.');
});

module.exports = app.listen(8080, () => {
});
