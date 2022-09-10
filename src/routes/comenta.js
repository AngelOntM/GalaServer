/**
 * Importar Dependencias
 */
import { Router } from 'express';
/**
 * Importar Controlador
 */
import { countComentas, createComenta, deleteComenta, getComenta, getComentas, updateComenta } from '../controllers/Comenta.js'

const router = Router()

/**
 * Establecer Rutas
 */
router.post('/Comenta', getComentas)

router.get('/Comenta/count', countComentas)

router.get('/Comenta/:id', getComenta)

router.post('/Comenta/create', createComenta)

router.put('/Comenta/:id', updateComenta)

router.delete('/Comenta/:id', deleteComenta)

export default router