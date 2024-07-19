const Post= require("../models/PostModel");
const Like= require("../models/LikeModel");

exports. likePost= async(req, res)=>{
    try {
        const {post, user}= req.body;
        const like= new Like({
            post, user,
        });

        const savedLike= await like.save();
        const updatedPost= await Post.findByIdAndUpdate(post, {$push: {likes: savedLike._id}}, {new: true}).populate("likes").exec();
        res.json({
            post: updatedPost,
        })
    } catch (error) {
        res.status(404).json({
            error:"Could Not like the post",
        })
    }
}

exports.unlikePost= async (req, res)=>{
    try {
        const {post, like}= req.body;
        const deletedLike= await Like.findOneAndDelete({post: post, _id:like});

        const updatedPost= await Post.findByIdAndUpdate(post, {$pull: {likes: deletedLike._id}}, {new:true});
        res.json({
            post:updatedPost,
        })
    } catch (error) {
        res.status(404).json({
            error:"Could Not unlike the post",
        })
    }
}