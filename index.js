const express = require("express")
const app = express();
const PORT = 8080;
const bodyParser = require("body-parser")
app.use(bodyParser.json())
const mongoose = require("mongoose");
const userData = require("./Schema.js")

const url = 'mongodb+srv://root:yashyash@cluster0.djej1bs.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(url)
    .then(() => {
        console.log("MongoDb is connected successfully")
    })
    .catch((err) => {
        console.log(err.message)
    })

app.post("/v1/tasks", async (req, res) => {
    try {
        if (req.body.tasks) {
            const user = await userData.insertMany(req.body.tasks)
            res.status(201).send({ tasks: user })
        }
        else {
            const user = await userData.create({
                title: req.body.title,
                is_completed: req.body.is_completed
            })
            res.status(201).send({ id: user._id })
        }
    }
    catch (err) {
        console.log(err)
    }
})


app.get("/v1/tasks", async (req, res) => {
    try {
        const user = await userData.find()
        res.status(200).send({
            tasks: user
        })
    }
    catch (err) {
        console.log(err)
    }
})


app.get("/v1/tasks/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userData.findOne({ _id: id })
        res.status(200).send(user)
    }
    catch (err) {
        res.status(404).send({
            error: "There is no task at that id"
        })
    }
})

app.delete("/v1/tasks/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userData.deleteOne({ _id: id })
        if (user.acknowledged === true) {
            res.status(204).send("none")
        }
        else {
            res.status(204).send("none")
        }
    }
    catch (err) {
        console.log(err)
    }
})
app.put("/v1/tasks/:id", async (req, res) => {
    try {
        const id = req.params.id
        const findId = await userData.findOne({ _id: id })
        if (findId) {
            const user = await userData.updateOne({
                title: req.body.title,
                is_completed: req.body.is_completed
            })
            res.status(204).send('none')
        }
        else {
            res.status(404).send({
                error: "There is no task at that id"
            })
        }
    }
    catch (err) {
        res.status(404).send({
            error: "There is no task at that id"
        })
    }
})

app.delete("/v1/tasks", async (req, res) => {
    try {
        const data = req.body.tasks;
        for(let i=0; i<data.length; i++){
            const user = await userData.deleteOne({ _id: data.id })
        }
        res.status(204).send('none')
    }
    catch (err) {
        console.log(err)
    }
})


app.listen(PORT, (error) => {
    if (error) throw error;
    console.log("Your App is working on port", PORT)
})