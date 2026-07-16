const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

router.get('/', async (req, res) => {
    const students = await Student.find();
    res.render('students/index', { students } ); 
});

router.get('/new', async (req, res) => {
    res.render('students/new');
});

router.post('/', async (req, res) => {
    // const { name, age, email } = req.body;
    // const newStudent = new Student({ name, age, email });
    // await newStudent.save();

    const student = await Student.create({
        name: req.body.name,
        age: req.body.age,
        email: req.body.email   
    });
    res.redirect('/student');
});

router.get('/:id', async (req, res) => {
    const student = await Student.findById(req.params.id);
    if (!student) {
        return res.status(404).send('Student not found');
    }
    res.render('students/show', { student });
});

router.get('/:id/edit', async (req, res) => {
    const student = await Student.findById(req.params.id);
    if (!student) {
        return res.status(404).send('Student not found');
    }
    res.render('students/edit', { student });
});

router.post('/:id/edit', async (req, res) => {
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
});

router.post('/:id/delete', async (req, res) => {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
        return res.status(404).send('Student not found');
    }
    res.redirect('/student');
});

module.exports = router;