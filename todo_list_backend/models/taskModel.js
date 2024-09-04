import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
    {
        assignedTo: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        dueDate: {
            type: Date,
            required: true,
        },
        priority: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);


export const Task = mongoose.model('Task', taskSchema);