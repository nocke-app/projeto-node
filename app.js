const express = require('express');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database connected and tables synchronized');
  })
  .catch(err => console.error('Error connecting to the database', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
