'use strict';

import * as mongoose from 'mongoose'
import * as dateFormat from 'date-fns'

const Schema = mongoose.Schema;

const docSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    describe: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    create_time: {
        type: String,
        default: dateFormat.format(Date.now(), 'YYYY-MM-DD')
    },
});

// docSchema.index({id: 1});

const DocModel = mongoose.model('DocModel', docSchema);

export default DocModel;