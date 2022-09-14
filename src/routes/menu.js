import { Router } from 'express';
import { getMenus } from '../controllers/menu.js'

const router = Router()

router.post('/menu', getMenus)

export default router