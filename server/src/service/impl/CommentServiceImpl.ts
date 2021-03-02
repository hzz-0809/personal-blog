import CommentService from "../CommentService";
import CommentDao from "../../dao/CommentDao";
import CommentDaoImpl from "../../dao/impl/CommentDaoImpl";
import Comment from "../../model/Comment";
import * as uuid from "uuid";
import UserDao from "../../dao/UserDao";
import UserDaoImpl from "../../dao/impl/UserDaoImpl";
import ResolutionEnum from "../../enum/ResolutionEnum";
import ChangeEnum from "../../enum/ChangeEnum";
import CommentResolutionDao from "../../dao/CommentResolutionDao";
import CommentResolutionDaoImpl from "../../dao/impl/CommentResolutionDaoImpl";
import CommentResolution from "../../model/CommentResolution";
import BlogDao from "../../dao/BlogDao";
import BlogDaoImpl from "../../dao/impl/BlogDaoImpl";

class CommentServiceImpl implements CommentService {
    private commentDao: CommentDao;

    constructor() {
        this.commentDao = new CommentDaoImpl();
    }

    public async addComment(blog_id: string, username: string, content: string): Promise<boolean> {
        let comment: Comment = new Comment();
        comment.comment_id = uuid.v1();
        comment.create_time = new Date().getTime();
        comment.content = content;
        try {
            return this.commentDao.insertComment(blog_id, username, comment);
        } catch (e) {
            return false;
        }
    }

    public async updateCommentFavor(comment_id: string, username: string): Promise<number> {
        try {
            let comment: Comment = await this.commentDao.findByCommentId(comment_id);
            let commentResolutionDao: CommentResolutionDao = new CommentResolutionDaoImpl();
            let commentResolution: CommentResolution = await commentResolutionDao.findByCommentIdAndUsername(comment_id, username);

            //判断该用户是否评价过该评论
            if (!commentResolution) {//resolution不存在,favor+1,插入一条resolution记录
                comment.favor += 1;
                this.commentDao.updateCommentFavor(comment_id, comment.favor);
                commentResolutionDao.insertCommentResolution(comment_id, username, ResolutionEnum.favor)
                return ChangeEnum.increase;
            } else if (!commentResolution.status) {//resolution status为0，favor+1，修改status=1
                comment.favor += 1;
                this.commentDao.updateCommentFavor(comment_id, comment.favor);
                commentResolutionDao.updateCommentResolution(comment_id, username, ResolutionEnum.favor)
                return ChangeEnum.increase;
            } else if (commentResolution.status === ResolutionEnum.opposition) {//resolution status为2，favor+1，修改status=1
                comment.favor += 1;
                comment.opposition -= 1;
                this.commentDao.updateCommentFavor(comment_id, comment.favor);
                this.commentDao.updateCommentOpposition(comment_id, comment.opposition);
                commentResolutionDao.updateCommentResolution(comment_id, username, ResolutionEnum.favor);
                return ChangeEnum.increase;
            } else if (commentResolution.status === ResolutionEnum.favor) {//resolution status为1，favor-1，status=0，
                comment.favor -= 1;
                this.commentDao.updateCommentFavor(comment_id, comment.favor)
                commentResolutionDao.updateCommentResolution(comment_id, username, ResolutionEnum.none);
                return ChangeEnum.reduce;
            }
        } catch (e) {
            return ChangeEnum.none;
        }
    }

    public async updateCommentOpposition(comment_id: string, username: string): Promise<number> {

        try {
            let comment: Comment = await this.commentDao.findByCommentId(comment_id);
            let commentResolutionDao: CommentResolutionDao = new CommentResolutionDaoImpl();
            let commentResolution: CommentResolution = await commentResolutionDao.findByCommentIdAndUsername(comment_id, username);

            if (!commentResolution) {
                comment.opposition += 1;
                this.commentDao.updateCommentOpposition(comment_id, comment.opposition);
                commentResolutionDao.insertCommentResolution(comment_id, username, ResolutionEnum.opposition);
                return ChangeEnum.increase;
            } else if (!commentResolution.status) {
                comment.opposition += 1;
                this.commentDao.updateCommentOpposition(comment_id, comment.opposition);
                commentResolutionDao.updateCommentResolution(comment_id, username, ResolutionEnum.opposition);
                return ChangeEnum.increase;
            } else if (commentResolution.status === ResolutionEnum.favor) {
                comment.opposition += 1;
                comment.favor -= 1;
                this.commentDao.updateCommentOpposition(comment_id, comment.opposition);
                this.commentDao.updateCommentFavor(comment_id, comment.favor);
                commentResolutionDao.updateCommentResolution(comment_id, username, ResolutionEnum.opposition);
                return ChangeEnum.increase;
            } else if (commentResolution.status === ResolutionEnum.opposition) {
                comment.opposition -= 1;
                this.commentDao.updateCommentOpposition(comment_id, comment.opposition);
                commentResolutionDao.updateCommentResolution(comment_id, username, ResolutionEnum.none);
                return ChangeEnum.reduce;
            }
        } catch (e) {
            return ChangeEnum.none;
        }
    }

    public async getBlogComments(blog_id: string, limit: number): Promise<Array<any>> {
        let comments: Array<any>;
        let usernames: Array<string> = [];
        let usersTemp: Array<any> = [];
        let users: Array<any> = [];

        try {
            if (limit) comments = await this.commentDao.findHotByBlogIdLimit(blog_id, limit);
            else comments = await this.commentDao.findHotByBlogIdAll(blog_id);

            if (comments) {
                comments.forEach(item => usernames.push(item.username));//收集每条评论的用户名，以便查找用户信息
                usernames = [...new Set(usernames)];//去重，减少查询user表的次数
                let userDao: UserDao = new UserDaoImpl();
                for (let item of usernames) usersTemp.push(await userDao.findByUsername(item));//获取每一条用户信息
                //过滤usersTemp中的内容
                usersTemp.forEach((item, i) => users[i] = {
                    username: item.username,
                    alias: item.alias,
                    avatar: item.avatar
                })

                comments.forEach((itemC, i, arr) => {
                    arr[i].user = users.filter(itemU => itemC.username === itemU.username).pop();
                })
                return comments;
            } else return [];

        } catch (e) {
            return undefined;
        }
    }

    public async getLatestComments(limit: number): Promise<Array<any>> {
        let comments: Array<any>;
        let usernames: Array<string> = [];
        let blog_ids: Array<string> = [];
        let blogsTemp: Array<any> = [];
        let blogs: Array<any> = [];
        let usersTemp: Array<any> = [];
        let users: Array<any> = [];
        try {
            comments = await this.commentDao.queryLatestLimit(limit);
            if (comments) {
                comments.forEach(item => usernames.push(item.username));
                comments.forEach(item => blog_ids.push(item.blog_id));
                usernames = [...new Set(usernames)];
                blog_ids = [...new Set(blog_ids)];
                let userDao: UserDao = new UserDaoImpl();
                let blogDao: BlogDao = new BlogDaoImpl();
                for (let item of usernames) usersTemp.push(await userDao.findByUsername(item));
                for (let item of blog_ids) blogsTemp.push(await blogDao.findBlogById(item));
                usersTemp.forEach((item, i) => users[i] = {
                    username: item.username,
                    alias: item.alias,
                    avatar: item.avatar
                });
                blogsTemp.forEach((item, i) => blogs[i] = {
                    blog_id: item.blog_id,
                    title: item.title
                })
                comments.forEach((itemC, i, arr) => {
                    arr[i].user = users.filter(itemU => itemC.username === itemU.username).pop();
                    arr[i].blog = blogs.filter(itemB => itemC.blog_id === itemB.blog_id).pop();
                })
                return comments;
            } else return [];
        } catch (e) {
            return undefined
        }
    }

    public async getCommentNum(): Promise<number> {
        try {
            let result: Array<any> = await this.commentDao.queryAll();
            if (result) return result.length;
            else return 0;
        } catch (e) {
            return undefined;
        }
    }

}

export default CommentServiceImpl;