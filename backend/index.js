// index.js
const express = require('express');
const cors = require('cors');
const db = require('./db');
const cafeteriaRoutes = require('./routes/cafeterias');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Route setup
app.use('/api/cafeterias', cafeteriaRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
