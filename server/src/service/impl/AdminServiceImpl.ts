import AdminService from "../AdminService";
import AdminDao from "../../dao/AdminDao";
import AdminDaOImpl from "../../dao/impl/AdminDaOImpl";
import LoginEnum from "../../enum/LoginEnum";
import JWT from "../../utils/JWT";
import Admin from "../../model/Admin";

class AdminServiceImpl implements AdminService {
    private adminDao: AdminDao;

    constructor() {
        this.adminDao = new AdminDaOImpl();
    }

    public async adminLogin(username: string, password: string): Promise<any> {
        let admin: Admin;
        try {
            admin = await this.adminDao.findByUsername(username);
        } catch (e) {
            return LoginEnum.serverErr;
        }

        if (admin === null) {
            return LoginEnum.accountErr;
        } else if (admin.password !== password) {
            return LoginEnum.passErr;
        } else {
            return JWT.generate({username: admin.username}, 60 * 60 * 24)
        }
    }

}

export default AdminServiceImpl;