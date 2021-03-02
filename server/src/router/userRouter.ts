import * as express from 'express'
import UserController from "../Controller/UserController";
import Auth from "../filter/Auth";
import ConstantUtil from "../utils/ConstantUtil";
import * as multer from "multer";
import PIN from "../filter/PIN";

const router = express.Router();

router.get('/user/index', UserController.getIndexData);

router.post('/user/login', UserController.login);

router.post('/user/sendEmail', UserController.sendEmail);

router.post("/user/register", UserController.register);

router.get("/user/login/avatar", UserController.getAvatar);

router.post("/user/validate/code", UserController.validateCode);

router.put("/user/findPass", PIN, UserController.findPass)

router.get("/user/info", Auth, UserController.getUserInfo);

router.put("/user/update/info", Auth, UserController.updateUserInfo);

router.put("/user/update/pass", Auth, UserController.updatePass);

router.put("/user/update/avatar", Auth, multer({dest: ConstantUtil.upProfilePath}).any(), UserController.updateAvatar);

router.post("/user/validate/pass", Auth, UserController.validatePass);

router.get("/user/avatar", Auth, UserController.getAvatar);

router.get("/user/blog", UserController.getBlog);

router.get("/user/blog/behavior", Auth, UserController.getBlogBehavior);

router.put("/user/put/blog/favor", Auth, UserController.putBlogFavor);

router.put("/user/put/blog/opposition", Auth, UserController.putBlogOpposition);

router.post("/user/add/comment", Auth, UserController.addComment);

router.get("/user/blog/comments", Auth, UserController.getBlogComments);

router.put("/user/put/comment/favor", Auth, UserController.putCommentFavor);

router.put("/user/put/comment/opposition", Auth, UserController.putCommentOpposition);

router.post("/user/comment/behavior", Auth, UserController.getCommentBehavior);

router.get("/user/blog/page", UserController.getBlogByPage);

export default router;