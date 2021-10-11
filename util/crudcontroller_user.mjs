import jwt from 'jsonwebtoken'
export const CreateUser = model => async(req,res)=>{
    try{
        const data = await model.create({name:req.body.name,password:req.body.password,email:req.body.email});
        const payload = {
            user:{
                id:data._id
            }
        }
        jwt.sign(payload,'shhhhh',
        {expiresIn:360000},
        (err,token)=>{
            if(err) throw err;
            console.log(token)
            res.json({token,data});
        });
    }
    catch(e){

        return res.status(404).json({msg:'Email ID Taken'});
    }
}

export const Crudcontrollers_User= model =>({
    CreateUser:CreateUser(model),
})