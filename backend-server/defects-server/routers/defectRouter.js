import { Router } from 'express';

const defectRouter = Router();

defectRouter.get('/', (req, res) => {
    return res.send('Defects API Endpoint');
});
defectRouter.get('/:id', (req, res) => {
    return res.send(`Defect ID: ${req.params.id}`);
});

export default defectRouter;
