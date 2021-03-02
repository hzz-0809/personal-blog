import DBUtil from "../../utils/DBUtil";
import EmailDao from "../EmailDao";
import Email from "../../model/Email";

class EmailDaoImpl implements EmailDao {

    connection = null;

    public deleteEmail(email: string): Promise<boolean> {
        let sql: string = "delete from email where email = ?";
        let sqlParams: any[] = [email]
        this.connection = DBUtil.createConnection();
        this.connection.connect();
        return new Promise(resolve => {
            this.connection.query(sql, sqlParams, (err) => {
                if (err) resolve(false);
                else resolve(true);
            })
            this.connection.end();
        })


    }

    public insertEmail(emailModel: Email): Promise<boolean> {
        let sql: string = "insert into email(email,email_code) values (?,?)";
        let sqlParams: Array<string | number> = [emailModel.email, emailModel.email_code]
        this.connection = DBUtil.createConnection();
        this.connection.connect();
        return new Promise((resolve, reject) => {
            this.connection.query(sql, sqlParams, err => {
                if (err) reject(err)
                else resolve(true);
            })
            this.connection.end();
        })
    }

    public findEmail(email: string): Promise<Email> {
        let sql: string = "select * from email where email = ?";
        let sqlParams: string[] = [email]
        this.connection = DBUtil.createConnection();
        this.connection.connect();

        return new Promise((resolve, reject) => {
            this.connection.query(sql, sqlParams, (err, result: Array<any>) => {
                if (err) reject(err);
                if (result.length !== 0) {
                    let emailModel: Email = new Email();
                    emailModel.email = result[0].email;
                    emailModel.email_code = result[0].email_code;
                    resolve(emailModel);
                } else {
                    resolve(null);
                }
            })
            this.connection.end();
        })
    }
}

export default EmailDaoImpl;