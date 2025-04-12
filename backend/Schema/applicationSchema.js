// {
//     _id: ObjectId,
//     internshipId: ObjectId,   // references Internships._id
//     applicantId: ObjectId,    // references Users._id
//     resumeLink: String,       // or store as file path if you allow uploads
//     coverLetter: String,
//     appliedAt: Date
//   }
  
import mongoose from "mongoose";
import userSchema from "./userSchema.js";
import internshipSchema from "./internshipSchema.js";

const ApplicationSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => new mongoose.Types.ObjectId().toString(),
    },
    internshipId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Internship",
        required: true,
    },
    applicantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    resumeLink: {
        type: String,
        required: true,
    },
    coverLetter: {
        type: String,
        required: true,
    },
    appliedAt: {
        type: Date,
        default: Date.now,
    },
});
export default mongoose.model("Application", ApplicationSchema);