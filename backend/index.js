const express = require('express');
const cors = require('cors');
const db = require('./db');
const cafeteriaRoutes = require('./routes/cafeterias');
const vendorRoutes = require('./routes/vendors');
const signupRoutes = require('./routes/signup');
const loginRoutes = require('./routes/login');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Route setup
app.use('/api/cafeterias', cafeteriaRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/users', signupRoutes);
app.use('/api/users', loginRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
