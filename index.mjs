import express from "express";
import bodyParser from "body-parser";
import mongoose  from "mongoose";
import User from './models/User_model.mjs'
import jwt from 'jsonwebtoken'
import auth from './auth.js'
import Post from './models/Post_model.mjs'
import check from './middleware.mjs'
mongoose.connect('mongodb://localhost:27017/CRUD');

const port=3000
const app = express();
//middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//middleware

app.use(check)
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
app.post('/posts/',[auth],async(req,res)=>{
    try{
        const data = await Post.create({title:req.body.title,content:req.body.content,user:req.body.id});
        return res.send(data)
    }
    catch(e){
        return res.status(404);
    }
})
app.get('/posts/:id',[auth],async(req,res)=>{
    try{
        const post = await Post.find({user:req.params.id})
        if(post.length==0)
        {
        return res.status(404).json({msg:'Post not found'}); 
        }
        console.log(post)
        return res.send(post)
    }
    catch(e){
        return res.status(404);
    }
})

app.put('/posts/:id',[auth],async(req,res)=>{
    try{
        const result = await Post.updateOne(
             {user:req.params.id},
                {
                    title:req.body.title,
                    content:req.body.content,
                }
        )
        console.log(result)
        return res.send(result)
    }
    catch(e){
        return res.status(404).json({msg:'Post cannot be updated'});
    }
})
app.delete('/posts/:id',[auth],async(req,res)=>{
    try{
        const result = await Post.deleteOne({user:req.params.id})
        return res.status(200).json({msg:'Post deleted'});
    }
    catch(e)
    {
        return res.status(404).json({msg:'Post cannot be deleted'});
    }
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })