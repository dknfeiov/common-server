import { CODES } from './../common/CODE';
import * as Md5 from 'js-md5'

export class Token {

    static token;
    constructor() {

    }

    public static check(req, res, next) {
        if (req.path.indexOf('user/login') !== -1) {
            console.log(req.path);
            next();
        }
        if (Token.checkToken(req.cookies.token)) {
            next()
        } else {
            // Token已过期
            res.send({ code: 100001, msg: CODES['100001'] })
        }
    }

    public static checkToken(token): boolean {
        return Token.token == token
    }

    public static newToken(): string {
        Token.token = Md5(Date.now());
        return Token.token;
    }

}

// export default new Token();