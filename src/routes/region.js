import { Router } from 'express';
import { countRegions, createRegion, deleteRegion, getRegion, getRegions, updateRegion } from '../controllers/Region.js'

const router = Router()

router.post('/Region', getRegions)

router.get('/Region/count', countRegions)

router.get('/Region/:id', getRegion)

router.post('/Region/create', createRegion)

router.put('/Region/:id', updateRegion)

router.delete('/Region/:id', deleteRegion)

export default router