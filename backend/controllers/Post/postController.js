const Post = require("../../models/Post/postModel");

//add post

const addPost = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user.id;

    if (!content || typeof content !== "string" || !content.trim()) {
      return res.status(400).json({
        status: "failed",
        message: "Content is required and must be a non-empty string.",
      });
    }

    const postData = new Post({
      userId: userId,
      content: content,
    });

    await postData.save();

    return res
      .status(201)
      .json({ status: "success", message: "Post added successfully!" });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

//get my posts

const getMyPost = async (req, res) => {
  try {
    const userId = req.user.id;

    const posts = await Post.find({ userId: userId }).populate("userId", "name");

    return res.status(200).json({
      status: "success",
      data: posts,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

//get all posts

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      results: posts.length,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports = {
  addPost,
  getMyPost,
  getAllPosts,
};
