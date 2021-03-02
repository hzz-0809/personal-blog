import Blog from "../model/Blog";

interface BlogService {
    /**
     * @param str 前端传过来的string
     * @param regExp 正则捕捉
     * @description 功能:将oldStr中的base64转换成图片且保存，并返回更改过url的newStr
     * @author: hzz
     */
    dealImgBase64(str: string): Promise<any>;

    saveBlog(content: string, title: string, tags: Array<object>): Promise<boolean>;

    getBlog(blog_id: string): Promise<Blog>;

    getBlogTag(blog_id: string): Promise<Array<any>>;

    updateBlogFavor(blog_id: string, username: string): Promise<number>;

    updateBlogOpposition(blog_id: string, username: string): Promise<number>;

    getAllBlogFavor(): Promise<number>;

    getBlogNum(): Promise<number>;

    getLatestBlogs(limit: number): Promise<Array<any>>;

    getBlogByPage(filter: number, currentPage: number, pageSize: number): Promise<Array<any>>;
}

export default BlogService;