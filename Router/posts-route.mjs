import Router from "express";
import auth from '../middleware/auth.js'
import {crudcontroller_post} from "../controller/post-controller.mjs";
const router = Router();

router
    .route('/')
    .post([auth],function(req, res){
        crudcontroller_post.CreatePost(req,res)
    })
router
    .route('/:id')
    .get([auth],function(req, res){
        crudcontroller_post.getOne(req,res)
    })
    .put([auth],function(req, res){
        crudcontroller_post.UpdateOne(req,res)
    })
    .delete([auth],function(req, res){
        crudcontroller_post.DeleteOne(req,res)
    })
export default router