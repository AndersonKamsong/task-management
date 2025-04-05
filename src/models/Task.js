
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        validate: {
            validator: function (value) {
                return value > this.startDate;
            },
            message: 'End date must be after start date.'
        }
    },
    status: {
        type: String,
        enum: ['created', 'doing', 'done', 'cancel'],
        default: 'created'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Tracks user who created it
    }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

export default Task;