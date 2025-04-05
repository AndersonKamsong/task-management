
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100
    },
    date: {
        type: Date,
        required: true
    },
    // Account status and activity tracking.
    status: {
        type: String,
        enum: ['created', 'doing', 'done', 'cancel'],
        default: 'created'
    }
});

const Task = mongoose.model('Task',taskSchema);

export default Task;