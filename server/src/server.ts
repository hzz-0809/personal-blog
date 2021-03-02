import * as express from 'express';
import * as path from "path";
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import userRouter from './router/userRouter';
import adminRouter from './router/adminRouter';
import ConstantUtil from "./utils/ConstantUtil";

const app = express();

// 解决跨域问题
app.use(cors());
//开放静态资源
app.use('/static/', express.static(path.join(__dirname, '../', './upload/')));//__dirname 总是指向被执行 js 文件的绝对路径

app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}))
app.use(bodyParser.json({limit: '50mb'}));

app.use(userRouter).use(adminRouter)

app.listen(ConstantUtil.port, () => console.log("http://127.0.0.1:3344"));