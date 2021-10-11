import Router from "express";
import {crudcontroller_user} from "../controller/user-controller.mjs";
const router = Router();

router.
    route('/')
    .post(function(req, res){
        console.log('create users')
        crudcontroller_user.CreateUser(req,res)
    })
export default router