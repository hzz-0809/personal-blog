import User from "../model/User";

interface UserService {
    userLogin(username: string, password: string): Promise<any>;

    userRegister(email: string, password: string): Promise<number>;

    updatePass(username: string, password: string): Promise<boolean>;

    validatePass(username: string, password: string): Promise<boolean>;

    getUserInfo(username: string): Promise<User>;

    updateUserInfo(user: User): Promise<number>;

    updateAvatar(username: string, avatarPath: string): Promise<boolean>;

    getLoginAvatar(email: string): Promise<string>;

    getUserAvatar(username: string): Promise<string>;

    findPass(email: string, password: string): Promise<boolean>;
}

export default UserService;