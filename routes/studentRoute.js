const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/', studentController.getAllStudents);
router.get('/new', studentController.getNewStudentForm);
router.post('/', studentController.createStudent);
router.get('/:id',studentController.getStudentById);
router.get('/:id/edit', studentController.getEditStudentForm);
router.post('/:id/edit', studentController.updateStudent);
router.post('/:id/delete', studentController.deleteStudent);

module.exports = router;