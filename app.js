const express = require('express');
const mongoose = require('mongoose');

const taskRoutes = require('./routes/taskRoutes');//importing the taskRoutes file

const app = express();
const port = 3000;

//middlewares
app.use(express.json());

//database connection
mongoose.connect('mongodb+srv://hashimsaffarini044:UgYryjva9KqSX7g6@todo.s8z2mmd.mongodb.net/?retryWrites=true&w=majority&appName=todo');

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