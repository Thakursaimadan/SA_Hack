import express from 'express';
import cors from 'cors';
import mongoose, { mongo } from 'mongoose';
import {v4 as uuidv4} from 'uuid';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from './Schema/userSchema.js';
import Internship from './Schema/internshipSchema.js';
import Application from './Schema/applicationSchema.js';
import jwt from 'jsonwebtoken';
import { authenticate, checkRole } from './middleware/auth.js';

dotenv.config();

const app=express();

app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    }),
)

app.use(express.json());

mongoose.connect(`${process.env.MONGOURI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected');
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
});
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});

// app.use('/api/auth', authRouter);
app.use('/api/users', authRouter);
app.use('/api/internships', internshipRouter);
app.use('/api/applications', applicationRouter);






