const express = require('express');
const routes = require('./routes/user.routes');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.use((err, req, res, next) => {
  logger.error('Unhandled error', { error: err.message, stack: err.stack });
  res.status(500).json({ message: 'An unexpected error occurred' });
});

module.exports = app;
