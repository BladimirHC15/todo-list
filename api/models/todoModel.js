import mongoose from 'mongoose';

const todoScheme = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, require: true},
  completed: { type: Boolean, default: false },
}, { timestamps: true });

export const Todo = mongoose.model('Todo', todoScheme);
