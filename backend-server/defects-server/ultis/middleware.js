export const unkwnownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
};
export const errorHandler = (err, req, res, next) => {
    //console.error(err.stack);
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        return res.status(400).send({ error: 'malformatted id' });
    }
    if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message });
    }
    if (err.code === 11000) {
        return res.status(400).json({ error: 'username or email already exists' });
    }
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ error: 'Internal Server Error' });
};

const middleware = { unkwnownEndpoint, errorHandler };
export default middleware;
