'use strict';

import * as mongoose from 'mongoose'
import * as dateFormat from 'date-fns'

const Schema = mongoose.Schema;

const userSchema = new Schema({
    loginName: {
        type: String,
        required: true,
        match: /^[0-9A-Za-z]{6,32}$/
    },
    password: {
        type: String,
        required: true,
        match: /^[0-9A-Za-z]{6,32}$/
    },
    username: {
        type: String,
        required: true
    },
    email: String,
    phone: Number,
    create_time: {
        type: String,
        default: dateFormat.format(Date.now(), 'YYYY-MM-DD')
    },
});

const UserModel = mongoose.model('UserModel', userSchema);

export default UserModel;