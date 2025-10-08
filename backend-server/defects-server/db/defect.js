import mongoose from 'mongoose';

const defectSchema = new mongoose.Schema({
    dateCreated: { type: Date, default: Date.now },
    roomNumber: { type: String, required: true },
    description: { type: String, required: true },
    process: { type: String, required: true, enum: ['reported', 'in progress', 'completed'] },
    priority: { type: String, required: true, enum: ['low', 'medium', 'high'] },
    reportedBy: { type: String, required: true },
    dateDone: { type: Date },
    cost: { type: Number },
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
