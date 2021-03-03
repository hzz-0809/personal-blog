import UserService from "../service/UserService";
import UserServiceImpl from "../service/impl/UserServiceImpl";
import LoginEnum from "../enum/LoginEnum";
import CommonUtil from "../utils/CommonUtil";
import EmailService from "../service/EmailService";
import EmailServiceImpl from "../service/impl/EmailServiceImpl";
import ValidateEnum from "../enum/ValidateEnum";
import RegisterEnum from "../enum/RegisterEnum";
import User from "../model/User";
import * as fs from "fs";
import ConstantUtil from "../utils/ConstantUtil";
import JWT from "../utils/JWT";
import InfoEnum from "../enum/InfoEnum";
import BlogService from "../service/BlogService";
import BlogServiceImpl from "../service/impl/BlogServiceImpl";
import Blog from "../model/Blog";
import CommentService from "../service/CommentService";
import CommentServiceImpl from "../service/impl/CommentServiceImpl";
import BlogResolutionService from "../service/BlogResolutionService";
import BlogResolutionServiceImpl from "../service/impl/BlogResolutionServiceImpl";
import BlogResolution from "../model/BlogResolution";
import CommentResolutionService from "../service/CommentResolutionService";
import CommentResolutionServiceImpl from "../service/impl/CommentResolutionServiceImpl";


class UserController {

    public static async getIndexData(req: any, res: any): Promise<void> {
        let blogLimit: number = Number(req.query.blogLimit);
        let commentLimit: number = Number(req.query.commentLimit);

        let blogService: BlogService = new BlogServiceImpl();
        let commentService: CommentService = new CommentServiceImpl();

        let articleNum: number = await blogService.getBlogNum();
        let commentNum: number = await commentService.getCommentNum();
        let favorNum: number = await blogService.getAllBlogFavor();
        let about: object = {
            articleNum,
            commentNum,
            favorNum
        }
        let articles: Array<any> = await blogService.getLatestBlogs(blogLimit);
        let comments: Array<any> = await commentService.getLatestComments(commentLimit);
        res.send(CommonUtil.com(true, {articles, comments, about}, "success"));
    }

    public static async login(req: any, res: any): Promise<void> {
        let userService: UserService = new UserServiceImpl();
        let result = await userService.userLogin(req.body.email, req.body.password);
        switch (result) {
            case LoginEnum.serverErr:
                res.send(CommonUtil.com(false, null, ConstantUtil.serverErrMsg));
                break;
            case LoginEnum.accountErr:
                res.send(CommonUtil.com(false, null, "该邮箱尚未注册！"));
                break;
            case LoginEnum.passErr:
                res.send(CommonUtil.com(false, null, "密码不正确！"));
                break;
            default:
                res.send(CommonUtil.com(true, {token: result}, "登录成功！"));
                break;
        }
    }

    public static async register(req: any, res: any): Promise<void> {
        let email: string = req.body.email;
        let password: string = req.body.password;
        let code: string = req.body.code;
        let emailService: EmailService = new EmailServiceImpl();
        let validateResult: number = await emailService.emailValidate(email, code);

        switch (validateResult) {
            case ValidateEnum.serverErr:
                res.send(CommonUtil.com(false, null, ConstantUtil.serverErrMsg));
                break;
            case ValidateEnum.timout:
                res.send(CommonUtil.com(false, null, "验证码已过期，请重新发送。"));
                break;
            case ValidateEnum.codeErr:
                res.send(CommonUtil.com(false, null, "验证码输入错误！"));
                break;
            case ValidateEnum.success:
                let userService: UserService = new UserServiceImpl();
                let registerResult: number = await userService.userRegister(email, password);
                switch (registerResult) {
                    case RegisterEnum.serverErr:
                        res.send(CommonUtil.com(false, null, ConstantUtil.serverErrMsg));
                        break;
                    case RegisterEnum.emailExisted:
                        res.send(CommonUtil.com(false, null, "该邮箱已注册。"));
                        break;
                    case RegisterEnum.success:
                        res.send(CommonUtil.com(true, null, "注册成功！"));
                        break;
                }
                break;
        }
    }

    public static async sendEmail(req: any, res: any): Promise<void> {
        let emailService: EmailService = new EmailServiceImpl();
        let result = await emailService.sendEmail(req.body.email);
        if (result) res.send(CommonUtil.com(true, null, "验证码已发送！"));
        else res.send(CommonUtil.com(false, null, ConstantUtil.serverErrMsg))
    }

    public static async updatePass(req: any, res: any): Promise<void> {
        let password: string = req.body.password;
        let username: string = req.currentUseranme;

        let userService: UserService = new UserServiceImpl();
        let result: boolean = await userService.updatePass(username, password);

        if (result) res.send(CommonUtil.com(true, null, "密码修改成功！"))
        else res.send(CommonUtil.com(false, null, ConstantUtil.serverErrMsg))
    }

    public static async validatePass(req: any, res: any): Promise<void> {
        let username: string = req.currentUseranme;
        let password: string = req.body.password;

        let userService: UserService = new UserServiceImpl();
        let result: boolean = await userService.validatePass(username, password);
        if (result) res.send(CommonUtil.com(true, null, "success"));
        else res.send(CommonUtil.com(false, null, "密码不正确！"))
    }

    public static async getUserInfo(req: any, res: any): Promise<void> {
        let username: string = req.currentUseranme;
        let userService: UserService = new UserServiceImpl();
        let user: User = await userService.getUserInfo(username);

        if (user) {
            let data: Object = {
                account_create_time: user.account_create_time,
                alias: user.alias,
                birthday: user.birthday,
                email: user.email,
                gender: user.gender,
                slogan: user.slogan,
                username: user.username,
                avatar: user.avatar,
            }
            res.send(CommonUtil.com(true, data, "success"));
        } else res.send(CommonUtil.com(false, null, ConstantUtil.serverErrMsg))
    }

    public static async getBlogBehavior(req: any, res: any): Promise<void> {
        let blog_id: string = req.query.blog_id;
        let username: string = req.currentUseranme;

        let blogResolutionService: BlogResolutionService = new BlogResolutionServiceImpl();
        let result: BlogResolution = await blogResolutionService.getBlogBehavior(blog_id, username);
        if (result) res.send(CommonUtil.com(true, {blogBehavior: result.status}, "success"));
        else res.send(CommonUtil.com(false, null, ConstantUtil.serverErrMsg));
    }

    public static async updateUserInfo(req: any, res: any): Promise<void> {
        let user: User = new User();
        user.alias = req.body.alias;
        user.birthday = req.body.birthday;
        user.gender = req.body.gender;
        user.slogan = req.body.slogan;
        user.username = req.currentUseranme;

        let userService: UserService = new UserServiceImpl();
        let result: number = await userService.updateUserInfo(user);
        switch (result) {
            case InfoEnum.success:
                res.send(CommonUtil.com(true, null, "信息修改成功！"));
                break;
            case InfoEnum.aliasExisted:
                res.send(CommonUtil.com(false, null, "昵称已存在！"));
                break;
            case InfoEnum.severErr:
                res.send(CommonUtil.com(false, null, ConstantUtil.serverErrMsg));
                break;
        }
    }

    public static async updateAvatar(req: any, res: any): Promise<void> {
        let oldPath: string = req.files[0].path;
        let newPath: string = `${req.files[0].destination}${req.files[0].originalname}`
        let username: string = req.currentUseranme;

        if (fs.existsSync(oldPath)) {
            fs.renameSync(oldPath, newPath);
            let avatarPath: string = `${ConstantUtil.staticDir}/profile/${req.files[0].originalname}`;
            let userService: UserService = new UserServiceImpl();
            let result: boolean = await userService.updateAvatar(username, avatarPath);
            if (result) res.send(CommonUtil.com(true, null, 'success'));
            else res.status(500).send(CommonUtil.com(false, null, "fail"));
        } else {
            res.status(500).send(CommonUtil.com(false, null, "fail"));
        }

    }

    public static async getAvatar(req: any, res: any): Promise<void> {
        let userService: UserService = new UserServiceImpl();
        if (req.query.email) {
            let avatar: string = await userService.getLoginAvatar(req.query.email);
            res.send(CommonUtil.com(true, {avatar}, "success"));
        } else if (req.currentUseranme) {
            let avatar: string = await userService.getUserAvatar(req.currentUseranme);
            res.send(CommonUtil.com(true, {avatar}, "success"))
        } else res.status(500).send(CommonUtil.com(false, null, ConstantUtil.serverErrMsg))
    }

    public static async validateCode(req: any, res: any): Promise<void> {
        let code: string = req.body.code;
        let email: string = req.body.email;

        let emailService: EmailService = new EmailServiceImpl();
        let validateResult: number = await emailService.emailValidate(email, code);

        switch (validateResult) {
            case ValidateEnum.serverErr:
                res.send(CommonUtil.com(false, null, ConstantUtil.serverErrMsg));
                break;
            case ValidateEnum.timout:
                res.send(CommonUtil.com(false, null, "验证码已过期，请重新发送。"));
                break;
            case ValidateEnum.codeErr:
                res.send(CommonUtil.com(false, null, "验证码输入错误！"));
                break;
            case ValidateEnum.success:
                let PIN: string = JWT.generate({email}, 60 * 3);
                res.send(CommonUtil.com(true, {PIN}, "验证成功，转到下一步！"))
                break;
        }
    }

    public static async findPass(req: any, res: any): Promise<void> {
        let email: string = req.body.email;
        let password: string = req.body.password;

        let userService: UserService = new UserServiceImpl();
        let result: boolean = await userService.findPass(email, password);
        if (result) res.send(CommonUtil.com(true, null, "密码修改成功！"));
        else res.send(CommonUtil.com(false, null, ConstantUtil.serverErrMsg));
    }

    public static async getBlog(req: any, res: any): Promise<void> {
        let blog_id: string = req.query.blog_id;
        let blogService: BlogService = new BlogServiceImpl();
        let blog: Blog = await blogService.getBlog(blog_id);
        let tags: Array<any> = await blogService.getBlogTag(blog_id);
        let commentService: CommentService = new CommentServiceImpl();
        let comment_num: number = await commentService.getCommentNumByBlogId(blog_id);
        if (blog && tags) {
            let data: Object = {
                blog_id: blog.blog_id,
                title: blog.title,
                create_time: blog.create_time,
                content: blog.content,
                favor: blog.favor,
                opposition: blog.opposition,
                tags, comment_num
            }
            res.send(CommonUtil.com(true, data, "成功拉取博文！"));
        } else res.send(CommonUtil.com(false, null, ConstantUtil.serverErrMsg))
    }

    public static async putBlogFavor(req: any, res: any): Promise<void> {
        let blog_id: string = req.body.blog_id;
        let username: string = req.currentUseranme;
        let blogService: BlogService = new BlogServiceImpl();

        let flag: number = await blogService.updateBlogFavor(blog_id, username);
        if (flag) res.send(CommonUtil.com(true, {flag}, "success"));
        else res.send(CommonUtil.com(false, {flag}, ConstantUtil.serverErrMsg))
    }

    public static async putBlogOpposition(req: any, res: any): Promise<void> {
        let blog_id: string = req.body.blog_id;
        let username: string = req.currentUseranme;
        let blogService: BlogService = new BlogServiceImpl();

        let flag: number = await blogService.updateBlogOpposition(blog_id, username);
        if (flag) res.send(CommonUtil.com(true, {flag}, "success"));
        else res.send(CommonUtil.com(false, {flag}, ConstantUtil.serverErrMsg))
    }

    public static async addComment(req: any, res: any): Promise<void> {
        let content: string = req.body.content;
        let username: string = req.currentUseranme;
        let blog_id: string = req.body.blog_id;

        let commentService: CommentService = new CommentServiceImpl();
        let result: boolean = await commentService.addComment(blog_id, username, content);
        if (result) res.send(CommonUtil.com(true, null, "评论发布成功！"));
        else res.send(CommonUtil.com(false, null, ConstantUtil.serverErrMsg))
    }

    public static async getBlogComments(req: any, res: any) {
        let blog_id: string = req.query.blog_id;
        let limit: number = Number(req.query.limit);
        let commentService: CommentService = new CommentServiceImpl();

        let comments: Array<any> = await commentService.getBlogComments(blog_id, limit);
        if (comments) res.send(CommonUtil.com(true, {comments}, "success"))
        else res.send(CommonUtil.com(false, null, ConstantUtil.serverErrMsg))
    }

    public static async putCommentFavor(req: any, res: any): Promise<void> {
        let comment_id: string = req.body.comment_id;
        let username: string = req.currentUseranme;
        let commentService: CommentService = new CommentServiceImpl();

        let flag: number = await commentService.updateCommentFavor(comment_id, username);
        if (flag) res.send(CommonUtil.com(true, {flag}, "success"));
        else res.send(CommonUtil.com(false, {flag}, ConstantUtil.serverErrMsg));
    };

    public static async putCommentOpposition(req: any, res: any): Promise<void> {
        let comment_id: string = req.body.comment_id;
        let username: string = req.currentUseranme;
        let commentService: CommentService = new CommentServiceImpl();

        let flag: number = await commentService.updateCommentOpposition(comment_id, username);
        if (flag) res.send(CommonUtil.com(true, {flag}, "success"));
        else res.send(CommonUtil.com(false, {flag}, ConstantUtil.serverErrMsg));
    };

    public static async getCommentBehavior(req: any, res: any): Promise<void> {
        let comment_id_arr: Array<string> = req.body.comment_id_arr;
        let username: string = req.currentUseranme;
        let commentResolutionService: CommentResolutionService = new CommentResolutionServiceImpl();

        let result: Array<any> = await commentResolutionService.getCommentBehavior(comment_id_arr, username);
        if (result) res.send(CommonUtil.com(true, {commentsBehavior: result}, "success"));
        else res.send(CommonUtil.com(false, null, ConstantUtil.serverErrMsg));
    }

    public static async getBlogByPage(req: any, res: any): Promise<void> {
        let filter: number = Number(req.query.filter);
        let currentPage: number = Number(req.query.currentPage);
        let pageSize: number = Number(req.query.pageSize);

        let blogService: BlogService = new BlogServiceImpl();
        let blogs: Array<any> = await blogService.getBlogByPage(filter, currentPage, pageSize);
        let total: number = await blogService.getBlogNum();
        if (!blogs || total === undefined) res.send(CommonUtil.com(false, null, ConstantUtil.serverErrMsg));
        else res.send(CommonUtil.com(true, {blogs, total}, "success"));
    }
}

export default UserController;