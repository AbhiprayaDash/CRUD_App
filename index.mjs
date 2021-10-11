import express from "express";
import bodyParser from "body-parser";
import checkInput from './middleware/InputCheck.mjs'
import PostRouter from './Router/posts-route.mjs'
import UserRouter from './Router/users-route.mjs'
import connect from './util/dbconnection.js'
const port=3000
const app = express();
//middleware

await connect.connect()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(checkInput)

app.use('/posts',PostRouter);
app.use('/users',UserRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})