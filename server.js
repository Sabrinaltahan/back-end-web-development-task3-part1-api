const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// MongoDB connection
mongoose.connect(
    'mongodb+srv://expuser:expuserpass@cluster0.ahym9xw.mongodb.net/expdb?retryWrites=true&w=majority&appName=Cluster0',
    { useNewUrlParser: true, useUnifiedTopology: true }
);

// This would allow requests only from 'http://localhost:3000'
// app.use(cors({
//     origin: ['http://localhost:3000', 'http://127.0.0.1:3000']
// }));


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');

    // MongoDB schema for work experience with validation
    const workExperienceSchema = new mongoose.Schema({
        companyname: { type: String, required: true, minlength: 4 },
        jobtitle: { type: String, required: true, minlength: 4 },
        location: { type: String, required: true, minlength: 4 },
        startdate: { type: Date, required: true },
        enddate: { type: Date, required: true },
        description: { type: String, required: true, minlength: 10 }
    });

    const WorkExperience = mongoose.model('experiences', workExperienceSchema);

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());

    app.get('/', (req, res) => {
        res.redirect('/workexperience');
    });

    // Route for getting all work experiences
    app.get('/workexperience', async (req, res) => {
        try {
            const workExperiences = await WorkExperience.find();
            res.json(workExperiences);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    // Route for creating a new work experience
    app.post('/workexperience', async (req, res) => {
        const workExperience = new WorkExperience(req.body);
        try {
            const newWorkExperience = await workExperience.save();
            res.status(201).json(newWorkExperience);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

    // Route for updating a work experience
    app.put('/workexperience/:id', async (req, res) => {
        try {
            const updatedWorkExperience = await WorkExperience.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            res.json(updatedWorkExperience);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

    // Route for deleting a work experience
    app.delete('/workexperience/:id', async (req, res) => {
        try {
            await WorkExperience.findByIdAndDelete(req.params.id);
            res.json({ message: 'Work experience deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    // Route for getting details of a specific work experience
    app.get('/workexperience/:id', async (req, res) => {
        try {
            const workExperience = await WorkExperience.findById(req.params.id);
            if (!workExperience) {
                res.status(404).json({ message: 'Work experience not found' });
            } else {
                res.json(workExperience);
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
