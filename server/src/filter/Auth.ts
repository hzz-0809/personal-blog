import JWT from "../utils/JWT";
import CommonUtil from "../utils/CommonUtil";

const Auth = (req: any, res: any, next): void => {
    if (!req.headers.authorization) {
        res.status(401).send(CommonUtil.com(false, null, "未授权，请先登录!"));
    } else {
        const token: string = req.headers.authorization.split(" ").pop();
        let result: any = JWT.verify(token);
        if (result) {
            req.currentUseranme = result.username;//将信息存放到 state 中
            next();
        } else {
            res.status(401).send(CommonUtil.com(false, null, "登录信息已过期，请重新登录"));
        }
    }

}
export default Auth;