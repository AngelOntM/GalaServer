/**
 * Importar Dependencias
 */
import { Router } from 'express';
/**
 * Importar Controlador
 */
import { countEstatuss, createEstatus, deleteEstatus, getEstatus, getEstatuss, updateEstatus } from '../controllers/Estatus.js'

const router = Router()

/**
 * Establecer Rutas
 */
router.post('/Estatus', getEstatuss)

router.get('/Estatus/count', countEstatuss)

router.get('/Estatus/:id', getEstatus)

router.post('/Estatus/create', createEstatus)

router.put('/Estatus/:id', updateEstatus)

router.delete('/Estatus/:id', deleteEstatus)

export default router