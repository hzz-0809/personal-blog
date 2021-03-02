import UserDao from "../UserDao";
import DBUtil from "../../utils/DBUtil";
import User from "../../model/User";

class UserDaoImpl implements UserDao {
    connection = null;

    public updateInfo(user): Promise<boolean> {
        let sql: string = "update user set alias = ?, birthday = ?,  gender = ?, slogan = ? where username = ?";
        let sqlParams: Array<any> = [user.alias, user.birthday, user.gender, user.slogan, user.username];
        this.connection = DBUtil.createConnection();
        this.connection.connect();
        return new Promise((resolve, reject) => {
            this.connection.query(sql, sqlParams, err => {
                if (err) reject(err);
                else resolve(true)
            })
            this.connection.end();
        })
    }

    public insertEmail(user: User): Promise<boolean> {
        let sql: string = "insert into user(email,username,password,gender,account_create_time) values (?,?,?,?,?)";
        let sqlParams: Array<number | string> = [user.email, user.username, user.password, user.gender, user.account_create_time];
        this.connection = DBUtil.createConnection();
        this.connection.connect();
        return new Promise((resolve, reject) => {
            this.connection.query(sql, sqlParams, err => {
                if (err) reject(err);
                else resolve(true)
            })
            this.connection.end();
        })
    }

    public findByEmail(email: string,): Promise<User> {
        let sql: string = "select * from user where email = ?";
        let sqlParams: Array<string> = [email];

        this.connection = DBUtil.createConnection();
        this.connection.connect();
        return new Promise((resolve, reject) => {
            this.connection.query(sql, sqlParams, (err, result: Array<any>) => {
                if (err) reject(err);
                if (result.length !== 0) {
                    let user = new User();
                    user.username = result[0].username;
                    user.password = result[0].password;
                    resolve(user);
                } else resolve(null)
                this.connection.end()
            })
        })
    }

    public queryByIdDesc(): Promise<number> {
        let sql: string = "select * from user order by id desc";
        this.connection = DBUtil.createConnection();
        this.connection.connect();
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (err, result: Array<any>) => {
                if (err) reject(err);
                if (result.length !== 0) {
                    resolve(result[0].id)
                } else {
                    resolve(0);
                }
            })
            this.connection.end();
        })
    }

    public findByUsername(username: string): Promise<User> {
        let sql: string = "select * from user where username = ?";
        let sqlParams: Array<string> = [username];
        this.connection = DBUtil.createConnection();
        this.connection.connect();
        return new Promise((resolve, reject) => {
            this.connection.query(sql, sqlParams, (err, result: Array<any>) => {
                if (err) reject(err);
                if (result.length !== 0) {
                    let user: User = new User();
                    user.username = result[0].username;
                    user.password = result[0].password;
                    user.email = result[0].email;
                    user.alias = result[0].alias;
                    user.slogan = result[0].slogan;
                    user.birthday = result[0].birthday;
                    user.gender = result[0].gender;
                    user.account_create_time = result[0].account_create_time;
                    user.avatar = result[0].avatar;
                    resolve(user);
                } else resolve(null)
            })
            this.connection.end();
        })
    }

    public updatePassByUsername(username: string, password: string): Promise<boolean> {
        let sql: string = "update user set password = ? where username = ?";
        let sqlParams: Array<string> = [password, username];
        this.connection = DBUtil.createConnection();
        this.connection.connect();
        return new Promise((resolve, reject) => {
            this.connection.query(sql, sqlParams, err => {
                if (err) reject(err);
                else resolve(true)
            })
            this.connection.end();
        })
    }

    public updateAvatar(username: string, avatarPath: string): Promise<boolean> {
        let sql: string = "update user set avatar = ? where username = ?";
        let sqlParams: string[] = [avatarPath, username];
        this.connection = DBUtil.createConnection();
        this.connection.connect();
        return new Promise((resolve, reject) => {
            this.connection.query(sql, sqlParams, err => {
                if (err) reject(err);
                else resolve(true)
            })
            this.connection.end();
        })
    }

    public findAvatarByEmail(email: string): Promise<string> {
        let sql: string = "select * from user where email = ?";
        let sqlParams: Array<string> = [email];

        this.connection = DBUtil.createConnection();
        this.connection.connect();

        return new Promise((resolve, reject) => {
            this.connection.query(sql, sqlParams, (err, result: Array<any>) => {
                if (err) reject(err);
                if (result.length !== 0) resolve(result[0].avatar);
                else resolve("")
            })
        })
    }

    public updatePassByEmail(email: string, password: string): Promise<boolean> {
        let sql: string = "update user set password = ? where email = ?";
        let sqlParams: Array<string> = [password, email];
        this.connection = DBUtil.createConnection();
        this.connection.connect();
        return new Promise((resolve, reject) => {
            this.connection.query(sql, sqlParams, err => {
                if (err) reject(err);
                else resolve(true)
            })
            this.connection.end();
        });
    }

    public findByAlias(alias: string): Promise<User> {
        let sql: string = "select * from user where alias = ?";
        let sqlParams: Array<string> = [alias];
        this.connection = DBUtil.createConnection();
        this.connection.connect();
        return new Promise((resolve, reject) => {
            this.connection.query(sql, sqlParams, (err, result: Array<any>) => {
                if (err) reject(err);
                if (result.length !== 0) {
                    let user: User = new User();
                    user.alias = result[0].alias;
                    user.username = result[0].username;
                    resolve(user);
                } else resolve(null);
            })
            this.connection.end();
        })
    }
}

export default UserDaoImpl;
