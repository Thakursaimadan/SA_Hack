import express from 'express';
import Internship from '../Schema/internshipSchema.js';
import { authenticate, checkRole } from '../middleware/auth.js';

const InternshipRouter = express.Router();

InternshipRouter.get('/', async (req, res) => {
  const { location, role } = req.query;
  const filter = {};
  if (location) filter.location = location;
  if (role) filter.role = role;
  const internships = await Internship.find(filter).sort({ createdAt: -1 });
  res.json(internships);
});

InternshipRouter.get('/:id', async (req, res) => {
  const internship = await Internship.findById(req.params.id);
  res.json(internship);
});

InternshipRouter.post('/', authenticate, checkRole('employer'), async (req, res) => {
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