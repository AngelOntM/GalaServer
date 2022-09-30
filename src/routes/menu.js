import { Router } from 'express';
import { getMenus, getSubLvl } from '../controllers/menu.js'

const router = Router()

router.post('/menu', getMenus)

router.post('/getsub', getSubLvl)

export default router