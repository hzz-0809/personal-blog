import UserDaoImpl from "../../dao/impl/UserDaoImpl";
import UserDao from "../../dao/UserDao";
import UserService from "../UserService";
import User from "../../model/User";
import LoginEnum from "../../enum/LoginEnum";
import ConstantUtil from "../../utils/ConstantUtil";
import AccountUtil from "../../utils/AccountUtil";
import RegisterEnum from "../../enum/RegisterEnum";
import GenderEnum from "../../enum/GenderEnum";
import JWT from "../../utils/JWT";
import InfoEnum from "../../enum/InfoEnum";


class UserServiceImpl implements UserService {
    private userDao: UserDao;

    constructor() {
        this.userDao = new UserDaoImpl()
    }

    public async updateUserInfo(user: User): Promise<number> {
        try {
            let result: User = null;
            if (user.alias) result = await this.userDao.findByAlias(user.alias);//如果提交的alias为空就跳过查询
            if (result && result.username !== user.username) {
                return InfoEnum.aliasExisted;
            } else {
                await this.userDao.updateInfo(user);
                return InfoEnum.success;
            }
        } catch (e) {
            return InfoEnum.severErr;
        }
    }

    public async getUserInfo(username: string): Promise<User> {
        try {
            return await this.userDao.findByUsername(username)
        } catch (e) {
            return null;
        }
    }

    public async validatePass(username: string, password: string): Promise<boolean> {
        try {
            let user: User = await this.userDao.findByUsername(username);
            return user.password === password;
        } catch (e) {
            console.error("mysql is error --->", e);
            return false;
        }

    }

    public async updatePass(username: string, password: string): Promise<boolean> {
        try {
            await this.userDao.updatePassByUsername(username, password);
            return true;
        } catch (e) {
            console.error("mysql error --->", e);
            return false;
        }

    }

    public async userLogin(email: string, password: string): Promise<any> {
        let user: User;
        try {
            user = await this.userDao.findByEmail(email);
        } catch (e) {
            return LoginEnum.serverErr;
        }

        if (user === null) {
            return LoginEnum.accountErr;
        } else if (user.password !== password) {
            return LoginEnum.passErr;
        } else {
            return JWT.generate({username: user.username}, 60 * 60 * 24)
        }
    }

    public async userRegister(email: string, password: string): Promise<number> {
        try {
            if (await this.userDao.findByEmail(email)) {
                return RegisterEnum.emailExisted;
            } else {
                let user: User = new User();
                user.account_create_time = new Date().getTime();
                user.gender = GenderEnum.secrecy;
                user.avatar = `${ConstantUtil.staticDir}/profile/default.png`;
                user.email = email;
                user.password = password;
                user.username = AccountUtil.accountName(await this.userDao.queryByIdDesc());
                await this.userDao.insertEmail(user)
                return RegisterEnum.success;
            }
        } catch (e) {
            console.log(e);
            return RegisterEnum.serverErr;
        }
    }

    public async updateAvatar(username: string, avatarPath: string): Promise<boolean> {
        try {
            return await this.userDao.updateAvatar(username, avatarPath)
        } catch (e) {
            console.log("mysql error --->", e);
            return false;
        }

    }

    public async getLoginAvatar(email: string): Promise<string> {
        let defaultAvatar: string = `${ConstantUtil.staticDir}/profile/default.png`;
        if (!email) return defaultAvatar;
        try {
            let avatar: string = await this.userDao.findAvatarByEmail(email);
            if (avatar) return avatar;
            else return defaultAvatar;
        } catch (e) {
            return defaultAvatar;
        }

    }

    public async getUserAvatar(username: string): Promise<string> {
        let defaultAvatar: string = `${ConstantUtil.staticDir}/profile/default.png`;
        try {
            let user: User = await this.userDao.findByUsername(username);
            if (user) return user.avatar;
            else return defaultAvatar;
        } catch (e) {
            return defaultAvatar;
        }
    }

    public async findPass(email: string, password: string): Promise<boolean> {
        try {
            await this.userDao.updatePassByEmail(email, password);
            return true;
        } catch (e) {
            return false;
        }
    }
}

export default UserServiceImpl;