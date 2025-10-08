const reqLogger = (req, res, next) => {
    console.log(`Request Method: ${req.method}`);
    console.log(`Request path: ${req.path}`);
    console.log('Request Body:', req.body);
    console.log('--------------------');
    next();
};

const helper = { reqLogger };
export default helper;
