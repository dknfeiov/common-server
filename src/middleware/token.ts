import { CODES } from './../common/CODE';
import * as Md5 from 'js-md5'

// Class 内部只有静态方法， 没有静态属性
export class Token {

    static token;
    constructor() {

    }

    public static check(req, res, next) {
        if (req.originalUrl.indexOf('user/login') !== -1) {
            next();
            return;
        }
        if (Token.checkToken(req.cookies.token)) {
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