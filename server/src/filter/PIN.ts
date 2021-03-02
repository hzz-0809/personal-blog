import JWT from "../utils/JWT";
import CommonUtil from "../utils/CommonUtil";

const PIN = (req: any, res: any, next): void => {
    let PIN: string = req.body.PIN;
    if (!PIN) {
        res.status(401).send(CommonUtil.com(false, null, "无PIN，请先验证!"));
    } else {
        let result: any = JWT.verify(PIN);
        if (result) {
            req.PIN = result.PIN;//将信息存放到 state 中
            next();
        } else {
            res.status(401).send(CommonUtil.com(false, null, "无效PIN，请重新验证"));
        }
    }

}
export default PIN;