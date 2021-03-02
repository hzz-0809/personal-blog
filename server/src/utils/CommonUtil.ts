class CommonUtil {
    public static com(status: boolean, data: object, msg: string): object {
        return {
            status,
            msg,
            data,
        }
    }
}

export default CommonUtil;