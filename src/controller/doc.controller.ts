import DocModel from '../models/doc.model'
import * as dateFormat from 'date-fns'
import { Buffer } from 'buffer';
import * as fs from 'fs';
// const fs = require('fs');
import * as mongoose from 'mongoose'
import * as Grid from 'gridfs-stream'
// import db from '../mongodb/database'

class DocController {

    constructor() {
    }

    // 添加文档
    async addDoc(req, res, next) {
        const conn = mongoose.connection;
        const gfs = Grid(conn.db, mongoose.mongo);
        const fileName = Date.now() + req.file.filename;
        var writestream = gfs.createWriteStream({
            'filename': fileName
        });
        fs.createReadStream(req.file.path).pipe(writestream);
        new DocModel(Object.assign({}, req.body, {
            'file': fileName
        })).save().then(() => {
            res.send({ code: 0, msg: '添加成功' })
        }).catch((err) => {
            res.send({ code: -1, msg: err.message })
        })
    }

    async download(req, res, next) {
        console.log(req.params);
        const conn = mongoose.connection;
        const gfs = Grid(conn.db, mongoose.mongo);
        try {
            var readstream = gfs.createReadStream({
                filename: req.params[0]
            });
            // filename=MyFileName.ext
            res.set({
                // 'Content-Type': 'application/octet-stream',
                'Content-Disposition': 'attachment; filename=' + req.params[0],
                // 'Content-Length': stats.size
            });
            readstream.pipe(res);
        } catch (error) {
            res.send({ code: -1, msg: error })
        }

    }

    // 修改文档
    async updateDoc(req, res, next) {
        DocModel.findById(req.body._id).update(req.body).then(() => {
            res.send({ code: 0, msg: '修改成功' })
        }).catch((err) => {
            res.send({ code: -1, msg: err.message })
        })
    }

    // 删除文档
    async deleteDoc(req, res, next) {
        DocModel.remove({ 'name': req.query.name }).exec().then(() => {
            res.send({ code: 0, msg: '删除成功' })
        }).catch((err) => {
            res.send({ code: -1, msg: err.message })
        })
    }

    //  文档列表
    async docList(req, res, next) {
        DocModel.find({}, (err, docs) => {
            if (err) {
                res.send({ code: -1, msg: err.message })
            }
            res.send({
                code: 0, data: {
                    list: docs
                }, msg: ''
            })
        })
    }

}


export default new DocController();