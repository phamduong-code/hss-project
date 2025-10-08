export const unkwnownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
};
export const errorHandler = (err, req, res, next) => {
    console.error(err.message);
    res.status(500).send({ error: 'internal server error' });
    next(err);
};

const middleware = { unkwnownEndpoint, errorHandler };
export default middleware;
