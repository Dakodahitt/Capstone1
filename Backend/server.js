const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const routes = require('./src/routes/index');
const prisma = require('./src/services/prisma');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', routes);

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  try {
    await prisma.$connect();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();
