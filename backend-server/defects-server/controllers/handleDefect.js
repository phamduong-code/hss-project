import Defect from '../db/models/defect.js';
import sampleDefects from '../db/sampleData.js';

const findAll = async (req, res, next) => {
    try {
        const data = await Defect.find({});
        return res.status(200).send(data);
    } catch (error) {
        next(error);
    }
};

const findById = async (req, res, next) => {
    try {
        const defect = await Defect.findById(req.params.id);
        if (defect) {
            return res.status(200).send(defect);
        }
        return res.status(404).send('Defect not found');
    } catch (error) {
        next(error);
    }
};

const createDefaultData = async (req, res, next) => {
    sampleDefects.forEach(async (defect) => {
        const result = await new Defect(defect).save();
        console.log(result);
    });
    return res.status(201).send('successful !');
};

const deleteAll = async (req, res, next) => {
    try {
        const result = await Defect.deleteMany({});
        return res.status(200).send('deleted all record in database');
    } catch (error) {
        next(error);
    }
};

const handleDefect = {
    findAll,
    findById,
    createDefaultData,
    deleteAll,
};

export default handleDefect;
