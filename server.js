const express = require('express');
const db = require('./config/connection')
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json())
// app.use(require('./routes'));
app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));
app.use(require('./routes'));



// Use this to log mongo queries being executed!
// mongoose.set('debug', true);

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
