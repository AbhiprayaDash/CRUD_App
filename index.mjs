import express from "express";
import bodyParser from "body-parser";
import mongoose  from "mongoose";
import User from './models/User_model.mjs'
import jwt from 'jsonwebtoken'
import auth from './auth.js'
import Post from './models/Post_model.mjs'

mongoose.connect('mongodb://localhost:27017/CRUD');

const port=3000
const app = express();
//middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

console.log(User)
//create
app.post('/user',async(req,res)=>{
    try{
        console.log(req.body)
        const data = await User.create({name:req.body.name,password:req.body.password,email:req.body.email});
        console.log(data)
        const payload = {
            user:{
                id:data._id
            }
        }
        console.log(payload.user)
        jwt.sign(payload,'shhhhh',
        {expiresIn:360000},
        (err,token)=>{
            if(err) throw err;
            console.log(token)
            res.json({token,data});
        });
    }
    catch(e){
        console.log('email ID is already taken')
    }
})
app.post('/posts',async(req,res)=>{
    const data = await Post.create({title:req.body.title,content:req.body.content,user:req.body.id});
    console.log(data)
    return res.send(data)
})
app.get('/posts/:id',[auth],async(req,res)=>{
    const post = await Post.find({user:req.params.id})
    if(post.length==0)
    {
        return res.status(404).json({msg:'Post not found'}); 
    }
    console.log(post)
    return res.send(post)
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })