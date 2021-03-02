import BlogResolution from "../../model/BlogResolution";
import BlogResolutionDao from "../../dao/BlogResolutionDao";
import BlogResolutionDaoImpl from "../../dao/impl/BlogResolutionDaoImpl";

class BlogResolutionServiceImpl {
    private blogResolutionDao: BlogResolutionDao;

    constructor() {
        this.blogResolutionDao = new BlogResolutionDaoImpl();
    }

    public async getBlogBehavior(blog_id: string, username: string): Promise<BlogResolution> {
        try {
            let result: BlogResolution = await this.blogResolutionDao.findByBlogIdAndUsername(blog_id, username);
            if (result) return result;
            else {
                let blogResolution: BlogResolution = new BlogResolution();
                blogResolution.status = 0;
                return blogResolution;
            }
        } catch (e) {
            return null;
        }
    }
}

export default BlogResolutionServiceImpl;