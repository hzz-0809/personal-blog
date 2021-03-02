import AdminDao from "../AdminDao";
import Admin from "../../model/Admin";
import DBUtil from "../../utils/DBUtil";

class AdminDaOImpl implements AdminDao {
    connection = null;

    public findByUsername(username: string): Promise<Admin> {
        let sql: string = "select * from admin where username = ?";
        let sqlParams: Array<string> = [username];

        this.connection = DBUtil.createConnection();
        this.connection.connect();
        return new Promise((resolve, reject) => {
            this.connection.query(sql, sqlParams, (err, result: Array<any>) => {
                if (err) reject(err);
                if (result.length !== 0) {
                    let admin = new Admin();
                    admin.username = result[0].username;
                    admin.password = result[0].password;
                    resolve(admin);
                } else resolve(null)
                this.connection.end()
            })
        })
    }

}

export default AdminDaOImpl;