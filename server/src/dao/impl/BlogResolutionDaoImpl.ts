import BlogResolutionDao from "../BlogResolutionDao";
import DBUtil from "../../utils/DBUtil";
import BlogResolution from "../../model/BlogResolution";

class BlogResolutionDaoImpl implements BlogResolutionDao {
    connection = null;

    public findByBlogIdAndUsername(blog_id: string, username: string): Promise<BlogResolution> {
        let sql: string = "select * from blog_resolution where blog_id = ? and username = ?";
        let sqlParams: Array<string> = [blog_id, username];
        this.connection = DBUtil.createConnection();
        this.connection.connect();
        return new Promise((resolve, reject) => {
            this.connection.query(sql, sqlParams, (err, result: Array<any>) => {
                if (err) reject(err);
                if (result.length !== 0) {
                    let blogResolution: BlogResolution = new BlogResolution();
                    blogResolution.status = result[0].status;
                    resolve(blogResolution)
                } else resolve(null)
            })
            this.connection.end();
        })
    }

    public insertBlogResolution(blog_id: string, username: string, status: number): Promise<boolean> {
        let sql: string = "insert into blog_resolution(blog_id, username, status) values (?,?,?)";
        let sqlParams: Array<string | number> = [blog_id, username, status];
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

    public updateBlogResolution(blog_id: string, username: string, status: number): Promise<boolean> {
        let sql: string = "update blog_resolution set status = ? where blog_id = ? and username = ?";
        let sqlParams: Array<string | number> = [status, blog_id, username];
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

}

export default BlogResolutionDaoImpl;