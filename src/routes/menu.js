import { Router } from 'express';
import { countMenus, createMenu, deleteMenu, getMenu, getMenus, updateMenu } from '../controllers/menu.js'

const router = Router()

router.post('/menu', getMenus)

router.get('/menu/count', countMenus)

router.get('/menu/:id', getMenu)

router.post('/menu/create', createMenu)

router.put('/menu/:id', updateMenu)

router.delete('/menu/:id', deleteMenu)

export default router