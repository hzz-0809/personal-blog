interface AdminService {
    adminLogin(username: string, password: string): Promise<any>
}

export default AdminService;