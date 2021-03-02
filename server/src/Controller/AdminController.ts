import BlogService from "../service/BlogService";
import BlogServiceImpl from "../service/impl/BlogServiceImpl";
import CommonUtil from "../utils/CommonUtil";
import ConstantUtil from "../utils/ConstantUtil";
import AdminServiceImpl from "../service/impl/AdminServiceImpl";
import AdminService from "../service/AdminService";
import LoginEnum from "../enum/LoginEnum";

class AdminController {
    public static async addBlog(req: any, res: any): Promise<void> {
        let {content, tags, title} = req.body;
        let blog: BlogService = new BlogServiceImpl();

        let result: string = await blog.dealImgBase64(content).catch(reason => {
            console.error(reason);
            res.send(CommonUtil.com(false, null, "博文图片上传发生错误，请稍后再试。"))
        });

        if (await blog.saveBlog(result, title, tags)) {
            res.send(CommonUtil.com(true, null, "博文上传成功！"));
        } else {
            res.send(CommonUtil.com(false, null, ConstantUtil.serverErrMsg));
        }
    }

    public static async login(req: any, res: any): Promise<void> {
        let username: string = req.body.username;
        let password: string = req.body.password;
        let adminService: AdminService = new AdminServiceImpl();
        let result: any = await adminService.adminLogin(username, password);

        switch (result) {
            case LoginEnum.serverErr:
                res.send(CommonUtil.com(false, null, ConstantUtil.serverErrMsg));
                break;
            case LoginEnum.accountErr:
                res.send(CommonUtil.com(false, null, "未找到该博主"));
                break;
            case LoginEnum.passErr:
                res.send(CommonUtil.com(false, null, "密码不正确！"));
                break;
            default:
                res.send(CommonUtil.com(true, {token: result}, "登录成功！"));
                break;
        }
    }
}

export default AdminController;