/**
 * Importar Dependencias
 */
import { Router } from 'express';
/**
 * Importar Controlador
 */
import { countMovimientos, createMovimiento, deleteMovimiento, getMovimiento, getMovimientos, updateMovimiento } from '../controllers/Movimiento.js'

const router = Router()

/**
 * Establecer Rutas
 */
router.post('/Movimiento', getMovimientos)

router.get('/Movimiento/count', countMovimientos)

router.get('/Movimiento/:id', getMovimiento)

router.post('/Movimiento/create', createMovimiento)

router.put('/Movimiento/:id', updateMovimiento)

router.delete('/Movimiento/:id', deleteMovimiento)

export default router