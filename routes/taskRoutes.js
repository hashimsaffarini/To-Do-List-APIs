const express = require('express');
const router = express.Router();//for creating endpoints in express
const Task = require('../models/task');//importing the Task model


router.get('/tasks', async (request, response) => {
  try {
    const tasks = await Task.find();
    response.status(200).json(tasks);
  }
  catch (error) {
    response.status(500).json({ error: error.message });
  }
});

router.post('/tasks', async (request, response) => {
  try {
    const task = new Task(request.body);
    await task.save();
    response.status(200).json({
      message: 'Task added successfully',
      task
    });
  }
  catch (error) {
    response.status(400).json({ error: error.message });
  }
});

router.put('/tasks/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const dataToUpdate = request.body;
    const task = await Task.findByIdAndUpdate(id, dataToUpdate, { new: true });
    response.status(200).json({
      message: 'Task updated successfully',
      task
    });
  }
  catch (error) {
    response.status(400).json({ error: error.message });
  }
});

router.delete('/tasks/:id', async (request, response) => {
  try {
    const { id } = request.params;
    await Task.findByIdAndDelete(id);
    response.status(200).json({
      message: 'Task deleted successfully'
    });
  }
  catch (error) {
    response.status(400).json({ error: error.message });
  }
});




module.exports = router;