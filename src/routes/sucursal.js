/**
 * Importar Dependencias
 */
import { Router } from 'express';
/**
 * Importar Controlador
 */
import { countSucursals, createSucursal, deleteSucursal, getSucursal, getSucursals, updateSucursal } from '../controllers/Sucursal.js'

const router = Router()

/**
 * Establecer Rutas
 */
router.post('/Sucursal', getSucursals)

router.get('/Sucursal/count', countSucursals)

router.get('/Sucursal/:id', getSucursal)

router.post('/Sucursal/create', createSucursal)

router.put('/Sucursal/:id', updateSucursal)

router.delete('/Sucursal/:id', deleteSucursal)

export default router