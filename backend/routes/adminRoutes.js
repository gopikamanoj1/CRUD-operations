import express from 'express';
const adminRoute = express.Router();
import { adminView, adminLogin, registerUser, userDelete,editUserData } from '../controllers/adminController.js';

adminRoute.get('/usersTable', adminView);
adminRoute.post('/adminlogin', adminLogin);
adminRoute.post('/user_create', registerUser);
adminRoute.delete('/delete_user/:id', userDelete);
adminRoute.get('/edit_user/:id',editUserData)
adminRoute.put('/edit_user/:id', editUserData);



export default adminRoute;