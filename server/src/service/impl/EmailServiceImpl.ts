import EmailService from "../EmailService";
import Email from "../../model/Email";
import EmailDao from "../../dao/EmailDao";
import EmailDaoImpl from "../../dao/impl/EmailDaoImpl";
import * as NodeEmail from "nodemailer";
import ConstantUtil from "../../utils/ConstantUtil";
import ValidateEnum from "../../enum/ValidateEnum";
import {setTimeout} from "timers";

class EmailServiceImpl implements EmailService {
    private emailDao: EmailDao;
    private transporter: NodeEmail;

    constructor() {
        this.emailDao = new EmailDaoImpl();
        this.transporter = NodeEmail.createTransport({
            host: "smtp.qq.com",
            port: 465,
            secureConnection: true,
            auth: {
                user: ConstantUtil.emailSender,
                pass: ConstantUtil.emailPass
            }
        })
    }

    async sendEmail(email: string): Promise<boolean> {

        let emailMode: Email = new Email();
        emailMode.email = email;
        emailMode.email_code = "";
        for (let i: number = 0; i < 6; i++) {
            emailMode.email_code += Math.floor(Math.random() * 10);//随机生成0~9的整数
        }

        try {
            await this.emailDao.insertEmail(emailMode)
            await this.transporter.sendMail({
                from: ConstantUtil.emailSender,
                to: email,
                subject: "来自《EvanZhao》的邮箱验证",
                html: `<div><span>验证码：</span><b>${emailMode.email_code}</b></div>`,
                text: "welcome to my blog!"
            })
            //60s后删除验证码
            setTimeout(() => {
                this.emailDao.deleteEmail(email);
            }, 1000 * 60);
            return true;
        } catch (e) {
            console.log(e)
            return false;
        }
    }

    async emailValidate(email: string, code: string): Promise<number> {
        let emailModel: Email;
        try {
            emailModel = await this.emailDao.findEmail(email);
        } catch (e) {
            return ValidateEnum.serverErr
        }

        if (!emailModel) {
            return ValidateEnum.timout;
        } else if (emailModel.email_code !== code) {
            return ValidateEnum.codeErr;
        } else {
            return ValidateEnum.success;
        }
    }

}

export default EmailServiceImpl;