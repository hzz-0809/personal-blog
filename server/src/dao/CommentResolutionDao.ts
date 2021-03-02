import CommentResolution from "../model/CommentResolution";

interface CommentResolutionDao {

    insertCommentResolution(comment_id: string, username: string, status: number): Promise<boolean>;

    findByCommentIdAndUsername(comment_id: string, username: string): Promise<CommentResolution>;

    updateCommentResolution(comment_id: string, username: string, status: number): Promise<boolean>;
}

export default CommentResolutionDao;