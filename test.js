const express = require('express')
const { readFile } = require('fs')
const mongoose = require('mongoose')

const app = express()
const port = 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

async function connectServer() {
    try {
        await app.listen(port)
        console.log(`✅ Local host server is listening on port: ${port}`);
    } catch (err) {
        throw new Error(`❌ Local host server conenction failed!`)
    }
}

async function connectDb() {
    try {
        await mongoose.connect('mongodb://localhost:27017/shoe-store')
        console.log(`✅ Connected to MongoDb database successfully!`);
    } catch (err) {
        throw new Error(` MongoDb database connection failed!`)
    }
}

app.get('/login', async (req, res) => {
    try {
        res.send(await readFile('./form.html', 'utf-8'));
    } catch (err) {
        console.log(`❌ GET /login route malfunctioned!`);
        res.status(500).send(`Server error, please try again later! :/`);
    }
});

app.post('/login', (req, res) => {
    const { name, email, password } = req.body;
    console.log(`${name} ${email} ${password}`);

    res.status(200).send('Login successful!');
});

(async () => {
    try {
        await connectDb();
        connectServer()
    } catch (err) {
        console.error(err);
    }
})()