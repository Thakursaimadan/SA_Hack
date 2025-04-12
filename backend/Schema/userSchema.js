import mongoose from "mongoose";

// {
//     _id: ObjectId,
//     name: String,
//     email: String,
//     password: String,         // hashed
//     role: String,             // 'employer' or 'applicant'
//     createdAt: Date
//   }

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => new mongoose.Types.ObjectId().toString(),
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["employer", "applicant"],
        default: "applicant",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("User", userSchema);
