'use strict';

import * as express from 'express'
import tag from '../controller/tag.controller'
// import Router from 'express'

const router = express.Router()
router.post('/list', tag.tagList);
router.post('/add', tag.addTag);
router.put('/update', tag.updateTag);
router.delete('/delete', tag.deleteTag);


export default router