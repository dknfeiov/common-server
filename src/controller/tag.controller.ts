import TagModel from '../models/tag.model'
import * as dateFormat from 'date-fns'

class TagController {

    constructor() {

    }

    // 添加标签
    async addTag(req, res, next) {
        const param = Object.assign({ 'create_time': dateFormat.format(Date.now(), 'YYYY-MM-DD') }, req.body)
        new TagModel(param).save().then(() => {
            res.send({ code: 0, msg: '添加成功' })
        }).catch((err) => {
            res.send({ code: -1, msg: err.message })
        })
    }

    // 修改标签
    async updateTag(req, res, next) {
        TagModel.findById(req.body._id).update(req.body).then(() => {
            res.send({ code: 0, msg: '修改成功' })
        }).catch((err) => {
            res.send({ code: -1, msg: err.message })
        })
    }

    // 删除标签
    async deleteTag(req, res, next) {
        TagModel.remove({ 'name': req.query.name }).exec().then(() => {
            res.send({ code: 0, msg: '删除成功' })
        }).catch((err) => {
            res.send({ code: -1, msg: err.message })
        })
    }

    //  标签列表
    async tagList(req, res, next) {
        TagModel.find({}, (err, docs) => {
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


export default new TagController();