const express = require('express');
const userController = require('../../controller/userController');

const userRouter = express.Router();

userRouter.get('/users', userController.getUsers);

userRouter.get('/users/:id', userController.getUser);

userRouter.post('/users', userController.createUser);

userRouter.put('/users/:id', userController.updateUser);

userRouter.delete('/users/:id', userController.deleteUser);

userRouter.post('/users/auth', userController.authenticateUser);

module.exports = userRouter;