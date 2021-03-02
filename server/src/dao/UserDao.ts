import User from "../model/User";

interface UserDao {
    queryByIdDesc(): Promise<number>

    findByEmail(email: string): Promise<User>;

    insertEmail(user: User): Promise<boolean>;

    updatePassByUsername(pass: string, username: string): Promise<boolean>;

    findByUsername(username: string): Promise<User>//token

    updateInfo(user): Promise<boolean>

    updateAvatar(username: string, avatarPath: string): Promise<boolean>

    findAvatarByEmail(email: string): Promise<string>;

    updatePassByEmail(email: string, password: string): Promise<boolean>

    findByAlias(alias: string): Promise<User>;

}

export default UserDao