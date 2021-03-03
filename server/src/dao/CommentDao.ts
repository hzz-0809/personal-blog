import Comment from "../model/Comment";

interface CommentDao {
    insertComment(username: string, blog_id: string, comment: Comment): Promise<boolean>;

    findHotByBlogIdAll(blog_id: string): Promise<Array<any>>;

    findHotByBlogIdLimit(blog_id: string, limit: number): Promise<Array<any>>;

    findByCommentId(comment_id: string): Promise<Comment>;

    updateCommentFavor(comment_id: string, favor: number): Promise<boolean>;

    updateCommentOpposition(comment_id: string, opposition: number): Promise<boolean>;

    queryAll(): Promise<Array<any>>;

    queryAllByBlogId(blog_id: string): Promise<Array<any>>

    queryLatestLimit(limit: number): Promise<any>
}

export default CommentDao;