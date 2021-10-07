import mongoose from 'mongoose';
const { Schema } = mongoose;

const PostSchema = new Schema({
    title:{
        type:String,
        required:true,
        maxlength:30
    },
    content:{
        type:String,
        required:true,
        minlength:10
    },
    user:{
        type: Schema.Types.ObjectId, ref: 'users'
    }
});

const Post = mongoose.model('posts',PostSchema);
export default Post;

