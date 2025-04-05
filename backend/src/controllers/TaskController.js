import Task from '../models/Task.js';
import jwt from 'jsonwebtoken';
import createError from 'http-errors';

class TaskController {
    constructor() {
        // this.register = this.register.bind(this);
        // this.login = this.login.bind(this);
    }

    async getAllTask(req, res) {
        const tasks = await Task.find();
        return res.status(201).json({ message: 'Tasks List.', tasks: tasks });
    }
    async getAllUserTask(req, res) {

        const tasks = await Task.find({ createdBy: req.user._id });
        return res.status(201).json({ message: 'Tasks List.', tasks: tasks });
    }
    async createTask(req, res) {
        try {

            const { name, startDate, userId } = req.body;
            const newTask = new Task({
                name,
                startDate,
                createdBy: userId
            });

            await newTask.save();
            return res.status(201).json({ message: 'Task registered successfully.' });
        } catch (error) {
            console.error('Error in registerTask:', error);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    }
    async updateTask(req, res) {
        try {

            const { taskId } = req.params;
            const { name, startDate } = req.body;
            const updateTask = await Task.findOne({ _id: taskId });
            updateTask.name = name
            updateTask.startDate = startDate
            await updateTask.save();
            return res.status(201).json({ message: 'Task updated successfully.' });
        } catch (error) {
            console.error('Error in registerTask:', error);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    }
    async updateStatusTask(req, res) {
        try {

            const { taskId } = req.params;
            const { status } = req.body;
            if (!['created', 'doing', 'done', 'cancel'].includes(status)) {
                return res.status(401).json({ message: 'Invalid enter status.' });
            }
            const updateTask = await Task.findOne({ _id: taskId });
            updateTask.status = status
            await updateTask.save();
            return res.status(201).json({ message: 'Task updated successfully.' });
        } catch (error) {
            console.error('Error in registerTask:', error);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    }
    async deleteTask(req, res) {
        try {

            const { taskId } = req.params;
            console.log(taskId)
            await Task.findByIdAndDelete(taskId);
            return res.status(201).json({ message: 'Task deleted successfully.' });
        } catch (error) {
            console.error('Error in registerTask:', error);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    }
}

export default new TaskController(); 