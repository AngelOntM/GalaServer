/**
 * Importar Dependencias
 */
import { Router } from 'express';
/**
 * Importar Controlador
 */
import { countMotivos, createMotivo, deleteMotivo, getMotivo, getMotivos, updateMotivo } from '../controllers/Motivo.js'

const router = Router()

/**
 * Establecer Rutas
 */
router.post('/Motivo', getMotivos)

router.get('/Motivo/count', countMotivos)

router.get('/Motivo/:id', getMotivo)

router.post('/Motivo/create', createMotivo)

router.put('/Motivo/:id', updateMotivo)

router.delete('/Motivo/:id', deleteMotivo)

export default router