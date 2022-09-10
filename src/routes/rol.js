/**
 * Importar Dependencias
 */
import { Router } from 'express';
/**
 * Importar Controlador
 */
import { countRols, createRol, deleteRol, getRol, getRols, updateRol } from '../controllers/Rol.js'

const router = Router()

/**
 * Establecer Rutas
 */
router.post('/Rol', getRols)

router.get('/Rol/count', countRols)

router.get('/Rol/:id', getRol)

router.post('/Rol/create', createRol)

router.put('/Rol/:id', updateRol)

router.delete('/Rol/:id', deleteRol)

export default router