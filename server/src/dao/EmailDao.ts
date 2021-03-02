import Email from "../model/Email";

interface EmailDao {
    findEmail(email: string): Promise<Email | null>;

    insertEmail(emailModel: Email): Promise<boolean>;//返回值为数据数据插入成功时间

    deleteEmail(email: string): Promise<boolean>;
}

export default EmailDao;