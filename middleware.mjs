export default function check(req,res,next){
    console.log(req.body)
    for (const property in req.body) {
        if(req.body[property]=='')
        {
            return res.status(404).json({msg:'Input Required'});
        }
    }
    next()
}