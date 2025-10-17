import mongoose from 'mongoose';

const defectSchema = new mongoose.Schema({
    dateCreated: { type: Date, default: Date.now },
    apartment: { type: String, require: true },
    roomNumber: { type: String, required: true },
    description: { type: String, required: true },
    reason: { type: String, default: '' },
    solution: { type: String, default: '' },
    progress: { type: String, required: true, enum: ['reported', 'inProgress', 'completed'] },
    priority: { type: String, required: true, enum: ['normal', 'emergency'] },
    reportedBy: { type: String, required: true },
    dateDone: { type: Date, default: null },
    updateAt: { type: Date, default: Date.now },
    cost: { type: Number, default: 0 },
    images: [{ type: String }],
    remarks: { type: String },
});

defectSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

const Defect = mongoose.model('Defect', defectSchema);

export default Defect;
