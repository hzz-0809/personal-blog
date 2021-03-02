import FileUtil from "../../utils/FileUtil";
import ConstantUtil from "../../utils/ConstantUtil";
import BlogService from "../BlogService";
import * as fs from "fs";
import Blog from "../../model/Blog";
import * as uuid from "uuid";
import BlogDao from "../../dao/BlogDao";
import BlogDaoImpl from "../../dao/impl/BlogDaoImpl";
import BlogResolutionDao from "../../dao/BlogResolutionDao";
import BlogResolutionDaoImpl from "../../dao/impl/BlogResolutionDaoImpl";
import BlogResolution from "../../model/BlogResolution";
import ResolutionEnum from "../../enum/ResolutionEnum";
import ChangeEnum from "../../enum/ChangeEnum";
import CommentService from "../CommentService";
import CommentServiceImpl from "./CommentServiceImpl";
import CommentDao from "../../dao/CommentDao";
import CommentDaoImpl from "../../dao/impl/CommentDaoImpl";

class BlogServiceImpl implements BlogService {

    private blogDao: BlogDao;

    constructor() {
        this.blogDao = new BlogDaoImpl();
    }

    public async saveBlog(content: string, title: string, tags: Array<object>): Promise<boolean> {

        let blog: Blog = new Blog();
        blog.blog_id = uuid.v1();
        blog.create_time = new Date().getTime();
        blog.content = content;
        blog.title = title;

        try {
            await this.blogDao.addBlog(blog)
            for (let tag of tags) {
                blog.tag_type = tag["tag_type"];
                blog.tag_name = tag["tag_name"];
                await this.blogDao.addBlogTags(blog);
            }
        } catch (e) {
            console.log(e)
            return false;
        }
        return true;
    }

    public dealImgBase64(str: string): Promise<string> {
        let base64Data: string | undefined;
        let dataBuffer: Buffer | undefined;
        let fileName: string | undefined;
        let folderName: string | undefined;
        let newStr: string = str;
        let catchValue: string;//保存每次正则捕获的值
        let imgRegExp: RegExp = /<img[^>]*src="([^>"]*)"[^>]*>/g;//匹配img标签
        let httpRegExp: RegExp = /^(http(s:|:)\/\/)/;
        let dataUrlRegExp: RegExp = /(^data:image\/\w+;base64,)/;

        return new Promise(async (resolve, reject) => {

            //获取目信息
            folderName = FileUtil.folderName();
            let folderPath: string = `${ConstantUtil.upBlogPath}${folderName}`;
            let isExists: any = await FileUtil.getStat(folderPath);

            //存入图片
            do {
                if (imgRegExp.exec(str)) {
                    catchValue = RegExp.$1;
                    fileName = FileUtil.fileName();

                    //过滤网络图片
                    if (httpRegExp.test(RegExp.$1)) continue;

                    //去除data:URL
                    base64Data = RegExp.$1.replace(dataUrlRegExp, "");

                    //解决http传输是base64中“+”变成空格的问题
                    base64Data = base64Data.replace(/\s/g, "+");
                    dataBuffer = Buffer.from(base64Data, 'base64');

                    //写入文件
                    if (isExists) {
                        fs.writeFile(`${folderPath}/${fileName}`, dataBuffer, (err) => {
                            if (err) reject(err)
                        })
                    } else {
                        isExists = await FileUtil.mkDir(folderPath);
                        fs.writeFile(`${folderPath}/${fileName}`, dataBuffer, (err) => {
                            if (err) reject(err)
                        })
                    }

                    //修改str中的url
                    newStr = newStr.replace(catchValue, `${ConstantUtil.staticDir}/blog/${folderName}/${fileName}`);
                } else {
                    resolve(newStr);
                }
            } while (imgRegExp.lastIndex !== 0)
        })
    }

    public async getBlog(blog_id: string): Promise<Blog> {
        try {
            return await this.blogDao.findBlogById(blog_id);
        } catch (e) {
            return null;
        }
    }

    public async getBlogTag(blog_id: string): Promise<Array<any>> {
        try {
            return await this.blogDao.findTagById(blog_id);
        } catch (e) {
            return undefined;
        }
    }

    public async updateBlogFavor(blog_id: string, username: string): Promise<number> {
        try {
            let blog: Blog = await this.blogDao.findBlogById(blog_id);
            let blogResolutionDao: BlogResolutionDao = new BlogResolutionDaoImpl();
            let blogResolution: BlogResolution = await blogResolutionDao.findByBlogIdAndUsername(blog_id, username);

            //判断该用户是否评价过该博文
            if (!blogResolution) {//resolution不存在,favor+1,插入一条resolution记录
                blog.favor += 1;
                this.blogDao.updateBlogFavor(blog_id, blog.favor);
                blogResolutionDao.insertBlogResolution(blog_id, username, ResolutionEnum.favor);
                return ChangeEnum.increase;
            } else if (!blogResolution.status) {//resolution status为0，favor+1，修改status=1
                blog.favor += 1;
                this.blogDao.updateBlogFavor(blog_id, blog.favor);
                blogResolutionDao.updateBlogResolution(blog_id, username, ResolutionEnum.favor);
                return ChangeEnum.increase;
            } else if (blogResolution.status === ResolutionEnum.opposition) {//resolution status为2，favor+1，修改status=1
                blog.favor += 1;
                blog.opposition -= 1;
                this.blogDao.updateBlogFavor(blog_id, blog.favor);
                this.blogDao.updateBlogOpposition(blog_id, blog.opposition);
                blogResolutionDao.updateBlogResolution(blog_id, username, ResolutionEnum.favor);
                return ChangeEnum.increase;
            } else if (blogResolution.status === ResolutionEnum.favor) {//resolution status为1，favor-1，status=0，
                blog.favor -= 1;
                this.blogDao.updateBlogFavor(blog_id, blog.favor);
                blogResolutionDao.updateBlogResolution(blog_id, username, ResolutionEnum.none);
                return ChangeEnum.reduce;
            }
        } catch (e) {
            return ChangeEnum.none;
        }
    }

    public async updateBlogOpposition(blog_id: string, username: string): Promise<number> {
        try {
            let blog: Blog = await this.blogDao.findBlogById(blog_id);
            let blogResolutionDao: BlogResolutionDao = new BlogResolutionDaoImpl();
            let blogResolution: BlogResolution = await blogResolutionDao.findByBlogIdAndUsername(blog_id, username);

            if (!blogResolution) {
                blog.opposition += 1;
                this.blogDao.updateBlogOpposition(blog_id, blog.opposition);
                blogResolutionDao.insertBlogResolution(blog_id, username, ResolutionEnum.opposition);
                return ChangeEnum.increase;
            } else if (!blogResolution.status) {
                blog.opposition += 1;
                this.blogDao.updateBlogOpposition(blog_id, blog.opposition);
                blogResolutionDao.updateBlogResolution(blog_id, username, ResolutionEnum.opposition);
                return ChangeEnum.increase;
            } else if (blogResolution.status === ResolutionEnum.opposition) {
                blog.opposition -= 1;
                this.blogDao.updateBlogOpposition(blog_id, blog.opposition);
                blogResolutionDao.updateBlogResolution(blog_id, username, ResolutionEnum.none);
                return ChangeEnum.reduce;
            } else if (blogResolution.status === ResolutionEnum.favor) {//resolution status为1，favor-1，status=0，
                blog.opposition += 1;
                blog.favor -= 1;
                this.blogDao.updateBlogFavor(blog_id, blog.favor);
                this.blogDao.updateBlogOpposition(blog_id, blog.opposition)
                blogResolutionDao.updateBlogResolution(blog_id, username, ResolutionEnum.opposition);
                return ChangeEnum.increase;
            }
        } catch (e) {
            return ChangeEnum.none;
        }
    }

    public async getAllBlogFavor(): Promise<number> {
        let favorNum: number = 0;
        try {
            let blogs: Array<any> = await this.blogDao.queryAll();
            if (blogs) blogs.forEach(i => favorNum += i.favor);
            return favorNum;
        } catch (e) {
            return undefined;
        }
    }

    public async getBlogNum(): Promise<number> {
        try {
            let result: Array<any> = await this.blogDao.queryAll();
            if (result) return result.length;
            else return 0;
        } catch (e) {
            return undefined;
        }
    }

    public async getLatestBlogs(limit: number): Promise<Array<any>> {
        try {
            let blogs: Array<any> = await this.blogDao.queryLatestLimit(0, limit);
            if (blogs) {
                for (let blog of blogs) blog.tags = await this.blogDao.findTagById(blog.blog_id);
                return blogs;
            } else return [];
        } catch (e) {
            return undefined;
        }
    }

    public async getBlogByPage(filter: number, currentPage: number, pageSize: number): Promise<Array<any>> {
        let start: number = (currentPage - 1) * pageSize;
        let end: number = pageSize;
        let blogs: Array<any>;
        try {
            if (filter === 0) blogs = await this.blogDao.queryHotLimit(start, end);
            else blogs = await this.blogDao.queryLatestLimit(start, end);
            let commentDao: CommentDao = new CommentDaoImpl();

            if (blogs) {
                for (let index in blogs) {
                    let blog_id: string = blogs[index].blog_id
                    //查标签
                    let tags: Array<any> = await this.blogDao.findTagById(blog_id);
                    if (tags.length > 2) tags = tags.splice(2);//前端只需要两个标签
                    blogs[index].tags = tags;
                    //找评论数
                    let comment: Array<any> = await commentDao.queryAllBayBlogId(blog_id);
                    if (comment) blogs[index].commentNum = comment.length;
                    else blogs[index].commentNum = 0;
                }
                return blogs;
            } else return [];
        } catch (e) {
            return undefined;
        }


    }

}

export default BlogServiceImpl;