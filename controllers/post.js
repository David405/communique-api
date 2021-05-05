const cloudinary = require('cloudinary').v2;

const Post = require('../schema/posts');
const User = require('../schema/users');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  });

const createPost = async(req, res) => {
    await User.findById({ _id: req.user.id }).then((user) => {
        if(!user) {
            res.status(401).send({ success: false, message: 'cannot create post'})
        } else {
            const data = { 
               title: req.body.title,
               coverimage: req.files[0].path,
               author: user.username,
               body: req.body.body,
               category: req.body.category
            }

        cloudinary.uploader.upload(data.coverimage).then((result) => {
              data.coverimage = result.secure_url;

              const post = new Post(data);
              post.save();
              res.status(201).send({ success: true, message: 'successfully created!' })
            }).catch((err) => { res.status(500).send({ success: false, message: err.message });
            });
        }
    }).catch((err) => {
        res.status(500).send({ success: false, message: err.message })
    })
}

const viewSinglePost = async (req, res) => {
    await Post.findOne({ title: req.params.title }).then((post) => {
        if(!post) {
            res.status(404).send({ success: false, message: 'No post found!'})
        } else {
            res.status(200).send({ success: true, message: post })
        }
    }).catch((err) => { 
        res.status(500).send({ success: false, message: err })
    })
}

const deletePost = async (req, res) => { 
    await Post.findOneAndDelete({ title: req.params.title }).then((post) => {
        if(!post) {
            res.status(404).send({ success: false, message: 'No post found!'})
        } else {
            res.status(200).send({ success: true, message: post })
        }
    }).catch((err) => {
        res.status(500).send({ success: false, message: err.message })
    })
}

module.exports = { 
    createPost,
    viewSinglePost,
    deletePost,
}