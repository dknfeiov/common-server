import { CODES } from './../common/CODE';
import * as Md5 from 'js-md5'

// Class 内部只有静态方法， 没有静态属性
export class Token {

    static token;
    constructor() {

    }

    public static check(req, res, next) {
        // 登录，文件下载不校验权限
        if (req.originalUrl.indexOf('user/login') !== -1 || req.originalUrl.indexOf('download') !== -1) {
            next();
            return;
        }
        if (Token.checkToken(req.headers.authorization)) {
            next()
        } else {
            // Token已过期
            res.send({ code: 100001, msg: CODES['100001'] })
        }
    }

    public static checkToken(token): boolean {
        return token && Token.token == token
    }

    public static newToken(): string {
        Token.token = Md5(Date.now()+'');
        return Token.token;
    }

}

// export default new Token();