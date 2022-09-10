/**
 * Importar Dependencias
 */
import { Router } from 'express';
/**
 * Importar Controlador
 */
import { countUsuarios, createUsuario, deleteUsuario, getUsuario, getUsuarios, updateUsuario } from '../controllers/Usuario.js'

const router = Router()

/**
 * Establecer Rutas
 */
router.post('/Usuario', getUsuarios)

router.get('/Usuario/count', countUsuarios)

router.get('/Usuario/:id', getUsuario)

router.post('/Usuario/create', createUsuario)

router.put('/Usuario/:id', updateUsuario)

router.delete('/Usuario/:id', deleteUsuario)

export default router