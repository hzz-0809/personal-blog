import BlogResolution from "../model/BlogResolution";

interface BlogResolutionService {
    getBlogBehavior(blog_id: string, username: string): Promise<BlogResolution>;
}

export default BlogResolutionService;