const express = require('express');
const router = express.Router();
const Student = require('../models/Student');


router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.json({message: err});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        res.json(student);
    } catch (err) {
        res.json({message: err});
    }
});

router.post('/', async (req, res) => {
    const student = new Student({
        name: req.body.name,
        course: req.body.course,
        grade: parseInt(req.body.grade)
    });

    try {
        const savedPost = await student.save();
        res.json(savedPost);
    } catch(err) {
        res.json({message: err});
    }
    
});

router.delete('/:id', async (req, res) => {
    try {
        const removedStudent = await Student.deleteOne({_id: req.params.id});
        res.json(removedStudent);
    } catch (err) {
        res.json({message: err});
    }
});

router.patch('/:id', async(req, res) => {
    try {
        const updatedPost = await Student.updateOne(
            {_id: req.params.id},
            {$set: { name: req.body.name } }
        );
        res.json(updatedPost);
    } catch (err) {
        res.json({message: err});
    }
});

module.exports = router;