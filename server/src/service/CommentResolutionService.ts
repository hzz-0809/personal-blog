interface CommentResolutionService {
    getCommentBehavior(comment_id_arr: Array<string>, username: string): Promise<Array<any>>
}

export default CommentResolutionService;