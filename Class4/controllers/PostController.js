const Post = require("../models/PostModel");
exports.createPost = async (req, res) => {
    try {
        const { title, body } = req.body;
        const post = new Post({
            title, body,
        });

        const savedPost = await post.save();

        res.json({
            post: savedPost,
        })
    } catch (err) {
        res.status(404).json({
            error: "Could not insert post !",
        })
    }
}

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("likes").populate("comments").exec();
        res.json({
            posts,
        })
    } catch (error) {
        res.status(404).json({
            error: "Could not fetch posts !",
        })
    }
}