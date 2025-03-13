import { Todo } from "../models/todoModel.js";

//crear tarea
export const createTodo = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title) return res.status(400).json({ message: "El título es obligatorio" });
        
        const newTodo = new Todo({ title, description });
        await newTodo.save();
        res.status(201).json({ message: "Tarea creada exitosamente", task: newTodo });
    
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
}

//obtener tareas
export const getTodos = async (req, res) => {
    try {
        const todo = await Todo.find();
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
}

//obtener una tarea
export const getTodo = async (req, res) => {
    try {
        const { id } = req.params;

        const todo = await Todo.findById(id);
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
}

//eliminar tarea
export const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;

        const todo = await Todo.findByIdAndDelete(id);
        res.status(200).json({ message: "Tarea eliminada con éxito"});
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
}

//actualizar una tarea
export const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, completed } = req.body

        const updatedTodo = await Todo.findByIdAndUpdate(
            id, 
            { title, description, completed }, // Campos a actualizar
            { new: true } // Para devolver el documento actualizado
        );

        if (!updatedTodo) {
            return res.status(400).json( {message: "Usuario no encontrado" } );
        }
        res.status(200).json({ message: "Tarea actualizada con éxito", updatedTodo});
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
}