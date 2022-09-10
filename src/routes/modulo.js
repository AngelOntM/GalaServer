/**
 * Importar Dependencias
 */
import { Router } from 'express';
/**
 * Importar Controlador
 */
import { countModulos, createModulo, deleteModulo, getModulo, getModulos, updateModulo } from '../controllers/modulo.js'

const router = Router()

/**
 * Establecer Rutas
 */
router.post('/modulo', getModulos)

router.get('/modulo/count', countModulos)

router.get('/modulo/:id', getModulo)

router.post('/modulo/create', createModulo)

router.put('/modulo/:id', updateModulo)

router.delete('/modulo/:id', deleteModulo)

export default router