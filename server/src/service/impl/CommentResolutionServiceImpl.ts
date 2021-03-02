import CommentResolutionService from "../CommentResolutionService";
import CommentResolutionDao from "../../dao/CommentResolutionDao";
import CommentResolutionDaoImpl from "../../dao/impl/CommentResolutionDaoImpl";

class CommentResolutionServiceImpl implements CommentResolutionService {
    private commentResolutionDao: CommentResolutionDao;

    constructor() {
        this.commentResolutionDao = new CommentResolutionDaoImpl();
    }

    public async getCommentBehavior(comment_id_arr: Array<string>, username: string): Promise<Array<any>> {
        let result: Array<any> = [];
        try {
            for (let comment_id of comment_id_arr) {
                let commentResolution = await this.commentResolutionDao.findByCommentIdAndUsername(comment_id, username);
                if (commentResolution) result.push({comment_id, userBehavior: commentResolution.status});
                else result.push({comment_id, userBehavior: 0})//无行为；
            }
            return result;
        } catch
            (e) {
            return undefined;
        }

    }

}

export default CommentResolutionServiceImpl;