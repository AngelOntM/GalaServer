/**
 * Importar Dependencias
 */
import { Router } from 'express';
/**
 * Importar Controlador
 */
import { countRolxests, createRolxest, deleteRolxest, getRolxest, getRolxests, updateRolxest } from '../controllers/Rolxest.js'

const router = Router()

/**
 * Establecer Rutas
 */
router.post('/Rolxest', getRolxests)

router.get('/Rolxest/count', countRolxests)

router.get('/Rolxest/:id', getRolxest)

router.post('/Rolxest/create', createRolxest)

router.put('/Rolxest/:id', updateRolxest)

router.delete('/Rolxest/:id', deleteRolxest)

export default router