import BlogResolution from "../model/BlogResolution";

interface BlogResolutionDao {

    findByBlogIdAndUsername(blog_id: string, username: string): Promise<BlogResolution>;

    insertBlogResolution(blog_id: string, username: string, status: number): Promise<boolean>;

    updateBlogResolution(blog_id: string, username: string, status: number): Promise<boolean>;
}

export default BlogResolutionDao;