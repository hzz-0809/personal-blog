import * as mysql from "mysql"

class DBUtil {
    public static createConnection() {
        return mysql.createConnection({
            // host: '115.29.177.15',
            host:'127.0.0.1',
            user: 'root',
            password: '123456',//mysql密码
            database: 'blog',
            charset: 'utf8mb4'
        });
    }
}

export default DBUtil;
