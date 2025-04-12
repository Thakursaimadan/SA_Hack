// {
//     _id: ObjectId,
//     title: String,
//     companyName: String,
//     description: String,
//     location: String,
//     role: String,            // like 'frontend', 'backend', 'ML', etc.
//     createdBy: ObjectId,     // references Users._id (employer)
//     createdAt: Date
//   }
import mongoose from "mongoose";
import userSchema from "./userSchema.js";

const InternshipSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => new mongoose.Types.ObjectId().toString(),
    },
    title: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
export default mongoose.model("Internship", InternshipSchema);