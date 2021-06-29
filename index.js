const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const multer  = require('multer')
const upload = multer({ 
    dest: 'images/' 
})

const port = process.env.PORT || 8080
const app = express()
const corsOptions = {
    origin: 'http://localhost:8080'
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded( {extended: true }))
app.use(cors(corsOptions))
app.use(userRouter)
app.use(taskRouter)

app.get('/', async(req, res) => {
    res.send('Hello')
})

app.post('/upload', upload.single('upload'), async(req, res) => {
    res.send()
})

app.listen(port, () => {
    console.log(`Sever is running on port ${port}`)
})