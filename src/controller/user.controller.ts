import { Token } from './../middleware/token';
import UserModel from '../models/user.model'
import * as fs from 'fs';
import * as mongoose from 'mongoose'
import * as Grid from 'gridfs-stream'
// import * as Md5 from 'js-md5'

class UserController {

    constructor() {
        this.login = this.login.bind(this)
    }

    add(req, res, next) {
        new UserModel(req.body).save().then(() => {
            res.send({ code: 0, msg: '添加成功' })
        }).catch((err) => {
            res.send({ code: -1, msg: err.message })
        })
    }

    // 权限点
    roles(): string[] {
        return ['tag', 'doc', 'user', 'analysis'];
    }

    login(req, res, next) {
        UserModel.findOne({
            'loginName': req.body.loginName
        }).then((resolve) => {
            console.log('resolve', resolve);
            // || resolve.password !== req.body.password
            if (!resolve) {
                res.send({ code: -1, msg: '不存在该用户' });
            } else {
                res.append(`Set-Cookie`, `token=${Token.newToken()};`);
                res.send({ code: 0, msg: '登录成功', data: this.roles() })
            }
        }).catch((err) => {
            console.error(err);
            res.send({ code: -1, msg: err.message })
        })
    }

    logout(req, res, next) {
        Token.newToken();
        res.send({ code: 0, msg: '已退出登录' })
    }

    // 修改用户
    update(req, res, next) {
        UserModel.findById(req.body._id).update(req.body).then(() => {
            res.send({ code: 0, msg: '修改成功' })
        }).catch((err) => {
            res.send({ code: -1, msg: err.message })
        })
    }

    // 删除用户
    delete(req, res, next) {
        UserModel.remove({ '_id': req.query._id }).exec().then(() => {
            res.send({ code: 0, msg: '删除成功' })
        }).catch((err) => {
            res.send({ code: -1, msg: err.message })
        })
    }

    //  用户列表
    list(req, res, next) {
        UserModel.find({}, (err, list) => {
            if (err) {
                res.send({ code: -1, msg: err.message })
            }
            res.send({
                code: 0,
                data: {
                    'list': list
                },
                msg: ''
            })
        })
    }

}


export default new UserController();