import { Router } from 'express';
import { countProgramas, createPrograma, deletePrograma, getPrograma, getProgramas, updatePrograma } from '../controllers/programa.js'

const router = Router()

router.post('/programa', getProgramas)

router.get('/programa/count', countProgramas)

router.get('/programa/:id', getPrograma)

router.post('/programa/create', createPrograma)

router.put('/programa/:id', updatePrograma)

router.delete('/programa/:id', deletePrograma)

export default router