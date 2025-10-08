import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import app from './app.js';

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

console.log(MONGO_URI);
mongoose.set('strictQuery', false);
mongoose
    .connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Could not connect to MongoDB...', err));
//mongoose.connect(MONGO_URI, () => {
//    console.log('Connected to MongoDB');
//});

app.get('/', (req, res) => {
    res.send('Defects Server is running');
    mongoose.connection.close();
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
