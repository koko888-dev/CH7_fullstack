import express from 'express';
import * as typeController from '../controllers/typeController.js';

const router = express.Router();

router.get('/', typeController.getType);
router.get('/:id', typeController.getTypeById);
router.post('/', typeController.createType);
router.put('/:id', typeController.updateType);
router.delete('/:id', typeController.deleteType);

export default router;