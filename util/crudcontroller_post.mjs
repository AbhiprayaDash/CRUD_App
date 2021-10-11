export const getOne = model =>async(req,res)=>{
    try{ 
        const post = await model.find({user:req.params.id})
        if(post.length==0)
        {
            return res.status(404).json({msg:'Post not found'}); 
        }
        return res.send(post)
    }
    catch(e){
        return res.status(404);
    }
}
export const UpdateOne = model => async(req,res)=>{
    try{
        const result = await model.updateOne(
             {user:req.params.id},
                {
                    title:req.body.title,
                    content:req.body.content,
                }
        )
        return res.send(result)
    }
    catch(e){
        return res.status(404).json({msg:'Post cannot be updated'});
    }
}
export const DeleteOne = model => async(req,res)=>{
    try{
        const result = await model.deleteOne({user:req.params.id})
        return res.status(200).json({msg:'Post deleted'});
    }
    catch(e)
    {
        return res.status(404).json({msg:'Post cannot be deleted'});
    }
}

export const CreatePost = model => async(req,res)=>{
    try{
        console.log('create One')
        const data = await model.create({title:req.body.title,content:req.body.content,user:req.body.id});
        return res.send(data)
    }
    catch(e){
        return res.status(404);
    }
}

export const Crudcontrollers= model =>({
    getOne:getOne(model),
    UpdateOne:UpdateOne(model),
    DeleteOne:DeleteOne(model),
    CreatePost:CreatePost(model)
})

