import express from 'express';
import Internship from '../Schema/internshipSchema.js';
import { authenticate, checkRole } from '../middleware/auth.js';

const InternshipRouter = express.Router();

InternshipRouter.get('/', async (req, res) => {
    console.log("GET /api/internships route hit");
    try {
      const internships = await Internship.find().populate('createdBy', 'name');
      res.json(internships);
    } catch (error) {
      console.error("Error in /api/internships:", error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

InternshipRouter.get('/:id', async (req, res) => {
  const internship = await Internship.findById(req.params.id);
  res.json(internship);
});

InternshipRouter.post('/', authenticate, checkRole('employer'), async (req, res) => {
    console.log("reached here");
  const { title, companyName, description, location, role } = req.body;
  const internship = new Internship({ title, companyName, description, location, role, createdBy: req.user._id });
  await internship.save();
  res.status(201).json({ message: 'Internship created' });
});

InternshipRouter.put('/:id', authenticate, checkRole('employer'), async (req, res) => {
  await Internship.findOneAndUpdate({ _id: req.params.id, createdBy: req.user._id }, req.body);
  res.json({ message: 'Internship updated' });
});

InternshipRouter.delete('/:id', authenticate, checkRole('employer'), async (req, res) => {
  await Internship.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id });
  res.json({ message: 'Internship deleted' });
});

export default InternshipRouter;