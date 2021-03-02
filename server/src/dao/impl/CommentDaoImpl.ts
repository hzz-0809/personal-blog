import CommentDao from "../CommentDao";
import DBUtil from "../../utils/DBUtil";
import Comment from "../../model/Comment";

class CommentDaoImpl implements CommentDao {
    connection = null;

    public insertComment(blog_id: string, username: string, comment: Comment): Promise<boolean> {
        let sql: string = "insert into comment(blog_id, username, comment_id, content, create_time, favor, opposition) values (?,?,?,?,?,?,?)";
        let sqlParams: any[] = [blog_id, username, comment.comment_id, comment.content, comment.create_time, 0, 0];
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

    public findHotByBlogIdAll(blog_id: string): Promise<Array<any>> {
        let sql: string = "select * from comment where blog_id = ? order by favor desc, create_time desc";
        let sqlParams: Array<string> = [blog_id];
        this.connection = DBUtil.createConnection();
        this.connection.connect();
        return new Promise((resolve, reject) => {
            this.connection.query(sql, sqlParams, (err, result: Array<any>) => {
                if (err) reject(err);
                if (result.length !== 0) resolve(result);
                else resolve(null)
            })
            this.connection.end();
        })
    }

    public findHotByBlogIdLimit(blog_id: string, limit: number): Promise<Array<any>> {
        let sql: string = "select * from comment where blog_id = ? order by favor desc, create_time desc limit ?";
        let sqlParams: Array<string | number> = [blog_id, limit];
        this.connection = DBUtil.createConnection();
        this.connection.connect();
        return new Promise((resolve, reject) => {
            this.connection.query(sql, sqlParams, (err, result: Array<any>) => {
                if (err) reject(err);
                if (result.length !== 0) resolve(result);
                else resolve(null)
            })
            this.connection.end();
        })
    }

    public findByCommentId(comment_id: string): Promise<Comment> {
        let sql: string = "select * from comment where comment_id = ?";
        let sqlParams: Array<string> = [comment_id];
        this.connection = DBUtil.createConnection();
        this.connection.connect();
        return new Promise((resolve, reject) => {
            this.connection.query(sql, sqlParams, (err, result: Array<any>) => {
                if (err) reject(err);
                if (result.length !== 0) {
                    let comment: Comment = new Comment();
                    comment.comment_id = result[0].comment_id;
                    comment.content = result[0].content;
                    comment.create_time = result[0].create_time;
                    comment.favor = result[0].favor;
                    comment.opposition = result[0].opposition;
                    resolve(comment);
                } else resolve(null)
            })
            this.connection.end();
        })
    }

    public updateCommentFavor(comment_id: string, favor: number): Promise<boolean> {
        let sql: string = "update comment set favor = ? where comment_id = ?";
        let sqlParams: Array<any> = [favor, comment_id];
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

    public updateCommentOpposition(comment_id: string, opposition: number): Promise<boolean> {
        let sql: string = "update comment set opposition = ? where comment_id = ?";
        let sqlParams: Array<any> = [opposition, comment_id];
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
        let sql: string = "select * from comment";
        this.connection = DBUtil.createConnection();
        this.connection.connect();
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (err, result: Array<any>) => {
                if (err) reject(err);
                if (result.length !== 0) resolve(result);
                else resolve(null)
            })
            this.connection.end();
        })
    }

    public queryLatestLimit(limit: number): Promise<any> {
        let sql: string = "select * from comment order by create_time desc limit ?";
        let sqlParams: Array<number> = [limit];
        this.connection = DBUtil.createConnection();
        this.connection.connect();
        return new Promise((resolve, reject) => {
            this.connection.query(sql, sqlParams, (err, result: Array<any>) => {
                if (err) reject(err);
                if (result.length !== 0) resolve(result);
                else resolve(null)
            })
            this.connection.end();
        })
    }

    public queryAllBayBlogId(blog_id: string): Promise<Array<any>> {
        let sql: string = "select * from comment where blog_id = ?";
        let sqlParams: Array<string> = [blog_id];
        this.connection = DBUtil.createConnection();
        this.connection.connect();
        return new Promise((resolve, reject) => {
            this.connection.query(sql, sqlParams, (err, result: Array<any>) => {
                if (err) reject(err);
                if (result.length !== 0) resolve(result);
                else resolve(null)
            })
            this.connection.end();
        })
    }

}

export default CommentDaoImpl;