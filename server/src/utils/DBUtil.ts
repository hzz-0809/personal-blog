import * as mysql from "mysql"

class DBUtil {
    public static createConnection() {
        return mysql.createConnection({
            // host: '115.29.177.15',
            host:'127.0.0.1',
            user: 'root',
            password: '187765',
            // password:'Huang..187765',
            database: 'blog',
            charset: 'utf8mb4'
        });
    }
}

export default DBUtil;