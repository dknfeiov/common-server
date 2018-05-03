'use strict';

import * as express from 'express'
import user from '../controller/user.controller'

const router = express.Router()
router.post('/login', user.login);
router.get('/logout', user.logout);
router.post('/list', user.list);
router.post('/add', user.add);
router.put('/update', user.update);
router.delete('/delete', user.delete);


export default router