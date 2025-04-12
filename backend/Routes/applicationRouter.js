
import express from 'express';
import Application from '../Schema/applicationSchema.js';
import { authenticate, checkRole } from '../middleware/auth.js';

const ApplicationRouter = express.Router();

ApplicationRouter.post('/:internshipId', authenticate, checkRole('applicant'), async (req, res) => {
  const { resumeLink, coverLetter } = req.body;
  const application = new Application({
    internshipId: req.params.internshipId,
    applicantId: req.user._id,
    resumeLink,
    coverLetter,
  });
  await application.save();
  res.status(201).json({ message: 'Applied successfully' });
});

ApplicationRouter.get('/my', authenticate, checkRole('applicant'), async (req, res) => {
  const apps = await Application.find({ applicantId: req.user._id }).populate('internshipId');
  res.json(apps);
});

ApplicationRouter.get('/for/:internshipId', authenticate, checkRole('employer'), async (req, res) => {
  const apps = await Application.find({ internshipId: req.params.internshipId }).populate('applicantId');
  res.json(apps);
});

export default ApplicationRouter;