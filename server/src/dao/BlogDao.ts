import Blog from "../model/Blog";

interface BlogDao {
    addBlog(blog: Blog): Promise<boolean>;

    addBlogTags(blog: Blog): Promise<boolean>;

    findBlogById(blog_id: string): Promise<Blog>;

    findTagById(blog_id: string): Promise<Array<any>>;

    updateBlogFavor(blog_id: string, favor: number): Promise<boolean>;

    updateBlogOpposition(blog_id: string, opposition: number): Promise<boolean>;

    queryAll(): Promise<Array<any>>;

    queryLatestLimit(start: number, limit: number): Promise<Array<any>>

    queryHotLimit(start: number, limit: number): Promise<Array<any>>
}

export default BlogDao;