/* Copyright (C) Oscar Inowe & Zarina Talamantes - All Rights Reserved
 * Name: Proyecto Final Diseño de sistemas distribuidos
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Oscar O. Inowe <oscar.orozco@cetys.edu.mx>, November 2020
 */

const express = require('express');
const app = express();

app.use(express.json());

/* CRUD: For demonstration purposes
*app.get();
*app.put();
*app.delete();
*app.post();
*/

const students = [
    {id: '1', name: 'Jorge', age: 20, enroll: true},
    {id: '2', name: 'Juan', age: 30, enroll: false},
    {id: '3', name: 'Oscar', age: 25, enroll: false},
];

app.get('/', (req, res) => {
    res.send('API Sistemas Distribuidos');
});

app.get('/api/students', (req, res) => {
    res.send(students);
});

app.get('/api/students/:id', (req, res) => {
    const student = students.find(c => c.id === req.params.id);
    if (!student) return res.status(404).send('Student not found');
    else res.send(student);
});

app.post('/api/students', (req, res) => {
    const student = {
        id: students.length + 1,
        name: req.body.name,
        age: parseInt(req.body.age),
        enroll: (req.body.enroll === 'true')
    };
    students.push(student);
    res.send(student);
});

app.put('/api/students/:id', (req, res) => {
    // In case it doesn't exist
    const student = students.find(c => c.id === req.params.id);
    if (!student) return res.status(404).send('Student not found');

    student.name = req.body.name;
    res.send(student);
});

app.delete('/api/students/:id', (req, res) => {
    const student = students.find(c => c.id === req.params.id);
    if (!student) return res.status(404).send('Student not found');

    const index = students.indexOf(student);
    students.splice(index, 1);
    res.send(student);
});

// PORT Definition
const port = process.env.port || 80;
app.listen(port, () => console.log(`Listening in port ${port}...`))