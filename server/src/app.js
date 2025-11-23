const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const caseRoutes = require('./routes/caseRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/cases', caseRoutes);

app.get('/', (req, res) => {
  res.send('HR Onboarding Assistant API');
});

module.exports = app;
