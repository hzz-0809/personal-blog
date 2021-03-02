import BlogDao from "../BlogDao";
import Blog from "../../model/Blog";
import DBUtil from "../../utils/DBUtil";

class BlogDaoImpl implements BlogDao {
    connection = null;

    public addBlog(blog: Blog): Promise<boolean> {
        let sql: string = "insert into blog(blog_id,content,title,create_time,favor,opposition) values (?,?,?,?,?,?)";
        let sqlParams: any[] = [blog.blog_id, blog.content, blog.title, blog.create_time, 0, 0];
        this.connection = DBUtil.createConnection();
        this.connection.connect();
        return new Promise((resolve, reject) => {
            this.connection.query(sql, sqlParams, err => {
                if (err) reject(err)
                else resolve(true);
            })
            this.connection.end();
        })
    }

    public addBlogTags(blog: Blog): Promise<boolean> {
        let sql: string = "insert into tag(blog_id,tag_name,tag_type) values (?,?,?)";
        let sqlParams: any[] = [blog.blog_id, blog.tag_name, blog.tag_type];
        this.connection = DBUtil.createConnection();
        this.connection.connect();
        return new Promise((resolve, reject) => {
            this.connection.query(sql, sqlParams, err => {
                if (err) reject(err)
                else resolve(true);
            })
            this.connection.end();
        })
    }

    public findBlogById(blog_id: string): Promise<Blog> {
        let sql: string = "select * from blog where blog_id = ?";
        let sqlParams: Array<string> = [blog_id];
        this.connection = DBUtil.createConnection();
        this.connection.connect();
        return new Promise((resolve, reject) => {
            this.connection.query(sql, sqlParams, (err, result: Array<any>) => {
                if (err) reject(err);
                if (result.length !== 0) {
                    let blog: Blog = new Blog();
                    blog.opposition = result[0].opposition;
                    blog.favor = result[0].favor;
                    blog.content = result[0].content;
                    blog.create_time = result[0].create_time;
                    blog.title = result[0].title;
                    blog.blog_id = result[0].blog_id;
                    resolve(blog);
                } else resolve(null)
            })
            this.connection.end();
        })
    }

    public findTagById(blog_id: string): Promise<Array<any>> {
        let sql: string = "select * from tag where blog_id = ? order by tag_type";
        let sqlParams: Array<string> = [blog_id];
        this.connection = DBUtil.createConnection();
        this.connection.connect();
        return new Promise((resolve, reject) => {
            this.connection.query(sql, sqlParams, (err, result: Array<any>) => {
                if (err) reject(err);
                if (result.length !== 0) {
                    resolve(result);
                } else resolve(undefined)
            })
            this.connection.end();
        })
    }

    public updateBlogFavor(blog_id: string, favor: number): Promise<boolean> {
        let sql: string = "update blog set favor = ? where blog_id = ?";
        let sqlParams: Array<any> = [favor, blog_id];
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

    public updateBlogOpposition(blog_id: string, opposition: number): Promise<boolean> {
        let sql: string = "update blog set opposition = ? where blog_id = ?";
        let sqlParams: Array<any> = [opposition, blog_id];
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

    public queryAll(): Promise<Array<any>> {
        let sql: string = "select * from blog";
        this.connection = DBUtil.createConnection();
        this.connection.connect();
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (err, result: Array<any>) => {
                if (err) reject(err);
                if (result.length !== 0) resolve(result)
                else resolve(null)
            })
            this.connection.end();
        })
    }

    public queryLatestLimit(start: number, limit: number): Promise<Array<any>> {
        let sql: string = "select * from blog order by create_time desc limit ?,?";
        let sqlParams: Array<number> = [start, limit];
        this.connection = DBUtil.createConnection();
        this.connection.connect();
        return new Promise((resolve, reject) => {
            this.connection.query(sql, sqlParams, (err, result: Array<any>) => {
                if (err) reject(err);
                if (result.length !== 0) resolve(result)
                else resolve(null)
            })
            this.connection.end();
        })
    }

    public queryHotLimit(start: number, limit: number): Promise<Array<any>> {
        let sql: string = "select * from blog order by favor desc, create_time desc limit ?,?";
        let sqlParams: Array<number> = [start, limit];
        this.connection = DBUtil.createConnection();
        this.connection.connect();
        return new Promise((resolve, reject) => {
            this.connection.query(sql, sqlParams, (err, result: Array<any>) => {
                if (err) reject(err);
                if (result.length !== 0) resolve(result)
                else resolve(null)
            })
            this.connection.end();
        })
    }
}

export default BlogDaoImpl;