import * as fs from "fs";

class FileUtil {

    public static folderName(): string {
        let date: Date = new Date();
        let year: number = date.getFullYear();
        let month: number = date.getMonth() + 1;
        let day: number = date.getDate()

        return `${year}-${month}-${day}`;
    }

    public static fileName(): string {
        return new Date().getTime() + ".png";
    }

    /**
     * @param path 路径
     */
    public static getStat(path: string): Promise<any> {
        return new Promise(resolve => {
            fs.stat(path, (err) => {
                if (err) resolve(false);
                else resolve(true);
            })
        })
    }

    /**
     * @param dir 目录
     */
    public static mkDir(dir: string): Promise<boolean> {
        return new Promise(resolve => {
            fs.mkdir(dir, err => {
                if (err) resolve(false);
                else resolve(true);
            })
        })
    }
}

export default FileUtil;