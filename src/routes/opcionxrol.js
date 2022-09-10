/**
 * Importar Dependencias
 */
import { Router } from 'express';
/**
 * Importar Controlador
 */
import { countOpcionxrols, createOpcionxrol, deleteOpcionxrol, getOpcionxrol, getOpcionxrols, updateOpcionxrol } from '../controllers/Opcionxrol.js'

const router = Router()

/**
 * Establecer Rutas
 */
router.post('/Opcionxrol', getOpcionxrols)

router.get('/Opcionxrol/count', countOpcionxrols)

router.get('/Opcionxrol/:id', getOpcionxrol)

router.post('/Opcionxrol/create', createOpcionxrol)

router.put('/Opcionxrol/:id', updateOpcionxrol)

router.delete('/Opcionxrol/:id', deleteOpcionxrol)

export default router