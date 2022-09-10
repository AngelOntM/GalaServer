/**
 * Importar Dependencias
 */
import { Router } from 'express';
/**
 * Importar Controlador
 */
import { countEstxmovs, createEstxmov, deleteEstxmov, getEstxmov, getEstxmovs, updateEstxmov } from '../controllers/Estxmov.js'

const router = Router()

/**
 * Establecer Rutas
 */
router.post('/Estxmov', getEstxmovs)

router.get('/Estxmov/count', countEstxmovs)

router.get('/Estxmov/:id', getEstxmov)

router.post('/Estxmov/create', createEstxmov)

router.put('/Estxmov/:id', updateEstxmov)

router.delete('/Estxmov/:id', deleteEstxmov)

export default router