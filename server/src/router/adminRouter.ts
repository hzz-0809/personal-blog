import * as express from 'express';
import AdminController from "../Controller/AdminController";
import Auth from "../filter/Auth";

const router = express.Router();

router.post('/hzz/add', Auth, AdminController.addBlog);

router.post('/hzz/login', AdminController.login);

export default router;