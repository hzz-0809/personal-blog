import CommentResolutionDao from "../CommentResolutionDao";
import DBUtil from "../../utils/DBUtil";
import CommentResolution from "../../model/CommentResolution";

class CommentResolutionDaoImpl implements CommentResolutionDao {
    connection = null;

    public insertCommentResolution(comment_id: string, username: string, status: number): Promise<boolean> {
        let sql: string = "insert into comment_resolution(comment_id, username, status) values (?,?,?)";
        let sqlParams: Array<string | number> = [comment_id, username, status];
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

    public findByCommentIdAndUsername(comment_id: string, username: string): Promise<CommentResolution> {
        let sql: string = "select * from comment_resolution where comment_id = ? and username = ?";
        let sqlParams: Array<string> = [comment_id, username];
        this.connection = DBUtil.createConnection();
        this.connection.connect();
        return new Promise((resolve, reject) => {
            this.connection.query(sql, sqlParams, (err, result: Array<any>) => {
                if (err) reject(err);
                if (result.length !== 0) {
                    let commentResolution: CommentResolution = new CommentResolution();
                    commentResolution.status = result[0].status;
                    resolve(commentResolution)
                } else resolve(null)
            })
            this.connection.end();
        })
    }

    public updateCommentResolution(comment_id: string, username: string, status: number): Promise<boolean> {
        let sql: string = "update comment_resolution set status = ? where comment_id = ? and username = ?";
        let sqlParams: Array<string | number> = [status, comment_id, username];
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

export default CommentResolutionDaoImpl;