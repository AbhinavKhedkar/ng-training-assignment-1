import express from 'express';
import { Task } from '../models/taskModel.js';

const router = express.Router();

//1. Route for Save a new Task
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.assignedTo ||
            !request.body.status ||
            !request.body.dueDate||
            !request.body.priority||
            !request.body.description
        ) {
            return response.status(400).send({
                message: 'Send all required fields : assignedTo,status,dueDate,priority,description',
            });
        }
        const newTask = {
            assignedTo: request.body.assignedTo,
            status: request.body.status,
            dueDate: request.body.dueDate,
            priority: request.body.priority,
            description: request.body.description,
        };

        const task = await Task.create(newTask);

        return response.status(201).send(task);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//2. Route for get all Tasks from Database
router.get('/', async (request, response) => {
    try {
        const tasks = await Task.find({});

        return response.status(201).json({
            count: tasks.length,
            data: tasks
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//3. Route for get all tasks from Database by Id
router.get('/:id', async (request, response) => {
    try {

        const { id } = request.params;
        const task = await Task.findById(id);

        return response.status(201).json(task);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//4. Route for update a Task
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.assignedTo ||
            !request.body.status ||
            !request.body.dueDate||
            !request.body.priority||
            !request.body.description
        ) {
            return response.status(400).send({
                message: 'Send all required fields title : assignedTo,status,dueDate,priority,description',

            });
        }
        const { id } = request.params;
        const result = await Task.findByIdAndUpdate(id, request.body);
        if (!result) {
            return response.status(404).json({ message: 'Task not found' });
        }
        return response.status(200).send({ message: 'Task updated succesfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//5. Route for Delete a task
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Task.findByIdAndDelete(id);
        if (!result) {
            return response.status(404).json({ message: 'Task not found' });
        }
        return response.status(200).send({ message: 'Task deleted successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;