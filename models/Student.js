const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            minlength: [3, 'Name must be at least 3 characters long'],
            maxlength: [50, 'Name must be at most 50 characters long'],
            lowercase: true,
            trim: true
         },
        age: {
            type: Number,
            required: [true, 'Age is required'],
            min: [18, 'Age must be at least 18'],
            max: [120, 'Age must be at most 120']
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            match: [/\S+@\S+\.\S+/, 'Email is invalid']
        },  
        gender: {
            type: String,
            enum: ['male', 'female', 'other'],
            required: [true, 'Gender is required']
            
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Student', studentSchema);;