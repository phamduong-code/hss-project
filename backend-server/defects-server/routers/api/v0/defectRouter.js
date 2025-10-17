import { Router } from 'express';
import Defect from '../../../db/models/defect.js';
import handleDefect from '../../../controllers/handleDefect.js';
import asyncHandler from 'express-async-handler';

const defectRouter = Router();

defectRouter.get('/', (req, res, next) => asyncHandler(handleDefect.findAll(req, res, next)));

defectRouter.get('/:id', (req, res, next) => asyncHandler(handleDefect.findById(req, res, next)));

defectRouter.delete('/', (req, res, next) => asyncHandler(handleDefect.deleteAll(req, res, next)));

defectRouter.post('/create-sample-data', (req, res, next) => asyncHandler(handleDefect.createDefaultData(req, res, next)));

defectRouter.post('/', async (req, res) => {
    if (!req.body.roomNumber || !req.body.description || !req.body.progress || !req.body.priority || !req.body.reportedBy) {
        return res.status(400).send('Missing required fields');
    }
    console.log(req.body);
    const newDefect = new Defect(req.body);
    const data = await newDefect.save();
    return res.status(201).json(data);
});

export default defectRouter;
