import express from 'express';
import { createUser, deleteUser, getUser, getUsers, login, updateUser } from '../controllers/userController.js';
import { verifyToken } from '../middelwares/verifyToken.js';
import { createTodo, deleteTodo, getTodo, getTodos, updateTodo } from '../controllers/todoController.js';

const router = express.Router();


//User paths
router.post('/login', login);
router.post('/register', createUser);
router.get('/users', getUsers);
router.get('/user', verifyToken, getUser);
router.put('/update-user', updateUser);
router.delete('/delete/:id', deleteUser);

//Todo paths
router.post('/todo', verifyToken, createTodo);
router.get('/todos', getTodos);
router.get('/todo/:id', getTodo);
router.delete('/todo/:id', deleteTodo);
router.put('/todo/:id', updateTodo);

export default router;