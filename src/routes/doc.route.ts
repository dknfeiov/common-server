'use strict';

import * as express from 'express'
import doc from '../controller/doc.controller'
// import Router from 'express'
import * as multer from 'multer';   // parse form-data

const upload = multer({ dest: 'uploads/' })
const router = express.Router()
router.post('/list', doc.docList);
router.post('/add', upload.single('file'), function (req, res, next) {
    next();
})
router.post('/add', doc.addDoc);

router.get('/download/*', doc.download);
router.put('/update', doc.updateDoc);
router.delete('/delete', doc.deleteDoc);


export default router