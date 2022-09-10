/**
 * Importar Dependencias
 */
import { Router } from 'express';
/**
 * Importar Controlador
 */
import { countRolxusus, createRolxusu, deleteRolxusu, getRolxusu, getRolxusus, updateRolxusu } from '../controllers/Rolxusu.js'

const router = Router()

/**
 * Establecer Rutas
 */
router.post('/Rolxusu', getRolxusus)

router.get('/Rolxusu/count', countRolxusus)

router.get('/Rolxusu/:id', getRolxusu)

router.post('/Rolxusu/create', createRolxusu)

router.put('/Rolxusu/:id', updateRolxusu)

router.delete('/Rolxusu/:id', deleteRolxusu)

export default router