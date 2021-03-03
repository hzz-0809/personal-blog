interface CommentService {
    addComment(blog_id: string, username: string, content: string): Promise<boolean>

    getBlogComments(blog_id: string, limit: number): Promise<Array<any>>

    updateCommentFavor(comment_id: string, username: string): Promise<number>;

    updateCommentOpposition(comment_id: string, username: string): Promise<number>;

    getCommentNum(): Promise<number>;

    getCommentNumByBlogId(blog_id:string):Promise<number>;

    getLatestComments(limit: number): Promise<Array<any>>;

}

export default CommentService;