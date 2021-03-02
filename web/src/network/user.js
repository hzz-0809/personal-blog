import { userRequest } from './request';

//用户登录
export function userLogin(data) {
    return userRequest({
        url: '/login',
        method: 'POST',
        data
    })
}

//用户注册
export function userRegister(data) {
    return userRequest({
        url: "/register",
        method: "POST",
        data
    })
}

//发送验证码
export function sendEmail(data) {
    return userRequest({
        url: "/sendEmail",
        method: "POST",
        data
    })
}

//验证验证码
export function validateCode(data) {
    return userRequest({
        url: "/validate/code",
        method: "POST",
        data
    })
}

//找回密码
export function findPass(data) {
    return userRequest({
        url: "/findPass",
        method: "PUT",
        data
    })
}

//获取首页内容
export function getIndexData(params) {
    return userRequest({
        url: '/index',
        method: "GET",
        params
    }, true, { lock: true })
}

//获取首页评论
export function getIndexComment() {
    return userRequest({
        url: '/index/comment',
        method: "GET",
    })
}

//获取用户全部信息
export function getUserInfo(target) {
    return userRequest({
        url: "/info",
        method: "GET",
    }, true, { lock: true, target })

}

//修改用户信息
export function updateUserInfo(data) {
    return userRequest({
        url: "/update/info",
        method: "PUT",
        data
    })
}

//修改用户密码
export function updatePass(data) {
    return userRequest({
        url: "/update/pass",
        method: "PUT",
        data
    })
}

//修改用户头像
export function updateAvatar(data) {
    return userRequest({
        url: "/update/avatar",
        method: "PUT",
        data
    })
}

//验证用户密码
export function validatePass(data) {
    return userRequest({
        url: "/validate/pass",
        method: "POST",
        data
    })
}

//登录期间获取用户头像
export function getLoginAvatar(params) {
    return userRequest({
        url: "/login/avatar",
        method: "GET",
        params
    })
}

//获取用户头像
export function getUserAvatar() {
    return userRequest({
        url: "/avatar",
        method: "GET"
    })
}

//获取博文内容
export function getBlog(params) {
    return userRequest({
        url: "/blog",
        method: "GET",
        params
    }, true, { lock: true })
}

//获取用户对于博文的行为
export function getBlogBehavior(params) {
    return userRequest({
        url: "/blog/behavior",
        method: "GET",
        params
    })
}

//点赞博文
export function putBlogFavor(data) {
    return userRequest({
        url: "/put/blog/favor",
        method: "PUT",
        data
    })
}
//踩博文
export function putBlogOpposition(data) {
    return userRequest({
        url: "/put/blog/opposition",
        method: "PUT",
        data
    })
}

//点赞评论
export function putCommentFavor(data) {
    return userRequest({
        url: "/put/comment/favor",
        method: "PUT",
        data
    })
}
//踩评论
export function putCommentOpposition(data) {
    return userRequest({
        url: "/put/comment/opposition",
        method: "PUT",
        data
    })
}

//发表评论
export function addComment(data) {
    return userRequest({
        url: "/add/comment",
        method: "POST",
        data
    })
}

//获取博文评论内容
export function getBlogComments(params) {
    return userRequest({
        url: "/blog/comments",
        method: "GET",
        params
    })
}

//获取用户对于博文评论的行为,上传数据可能较多，所以用了POST...
export function getCommentsBehavior(data) {
    return userRequest({
        url: "/comment/behavior",
        method: "POST",
        data
    })
}

//获取分页下的博文
export function getBlogByPage(params) {
    return userRequest({
        url: "/blog/page",
        method: "GET",
        params
    })
};
