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
    // const { name, age, email } = req.body;
    // const newStudent = new Student({ name, age, email });
    // await newStudent.save();

    const student = await Student.create({
        name: req.body.name,
        age: req.body.age,
        email: req.body.email   
    });
    res.redirect('/student');
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