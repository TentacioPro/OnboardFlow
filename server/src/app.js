const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/cases', require('./routes/caseRoutes'));

app.get('/', (req, res) => {
  res.send('HR Onboarding Assistant API');
});

module.exports = app;
