'use strict';

import * as mongoose from 'mongoose'

const Schema = mongoose.Schema;

const tagSchema = new Schema({
	name: String,
	type: String,
	create_time: String,
})

// tagSchema.index({id: 1});

const TagModel = mongoose.model('TagModel', tagSchema);

export default TagModel;