'use strict';

import * as express from 'express'
import analysis from '../controller/analysis.controller'

const router = express.Router()
router.post('/screenPrint', analysis.screenPrint);


export default router