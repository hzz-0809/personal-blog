import OSUtil from "./OSUtil";
import * as path from "path";

class ConstantUtil {
    public static port: number = 3344;//端口号
    public static staticDir: string = `http://${OSUtil.getLocalIP()}:${ConstantUtil.port}/static`;//客户端访问静态资源访问路径
    public static upBlogPath: string = path.join(__dirname, '../../upload/blog/');//blog路径
    public static upProfilePath: string = path.join(__dirname, '../../upload/profile/');//profile路径
    public static emailSender: string = "3286958203@qq.com";//邮件发送人
    public static emailPass: string = "xtyqafjzuopichba";//开启POP3/SMTP的密码
    public static privateKey: string = "EvanZhao";//jwt私钥
    public static serverErrMsg: string = "500：服务器出现了意料之外的问题，请稍后再试。"
}

export default ConstantUtil;