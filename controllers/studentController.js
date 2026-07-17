const Student = require('../models/Student');
const studentController = {};

studentController.getAllStudents = async (req, res) => {
    const students = await Student.find();
    res.render('students/index', { students } ); 
}

studentController.getNewStudentForm = async (req, res) => {
    res.render('students/new');
}

studentController.createStudent = async (req, res) => {
    try {
        const student = await Student.create({
            name: req.body.name,
            age: req.body.age,
            email: req.body.email,
            gender: req.body.gender  
        });
        res.redirect('/student');
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).render('students/new', { title: 'Create Student', errors: error.errors });
        } else {
            next(error);
        }
    } 
};

studentController.getStudentById =  async (req, res) => {
    const student = await Student.findById(req.params.id);
    if (!student) {
        return res.status(404).send('Student not found');
    }
    res.render('students/show', { student });
}

studentController.getEditStudentForm =async (req, res) => {
    const student = await Student.findById(req.params.id);
    if (!student) {
        return res.status(404).send('Student not found');
    }
    res.render('students/edit', { student });
}

studentController.updateStudent = async (req, res) => {
    const student = await Student.findByIdAndUpdate(
        req.params.id,
        { 
            name: req.body.name,
            age: req.body.age, 
            email: req.body.email 
        },
    );
    if (!student) {
        return res.status(404).send('Student not found');
    }
    res.redirect(`/student`);
}

studentController.deleteStudent = async (req, res) => {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
        return res.status(404).send('Student not found');
    }
    res.redirect('/student');
}

module.exports = studentController;