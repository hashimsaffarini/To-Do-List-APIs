const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const taskRoutes = require('./routes/taskRoutes');//importing the taskRoutes file

dotenv.config();

const app = express();
const port = 3000;

//middlewares
app.use(express.json());

//database connection
mongoose.connect(process.env.MONGO_DB_CONNECT);

const db = mongoose.connection;
db.on('error', () => console.log(
  'Error connecting to database'
));


//print message when connected to database one time
db.once('open', () => console.log('Connected to database'));

//routes
app.use(taskRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});