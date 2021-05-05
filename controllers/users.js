const jwt = require('jsonwebtoken');
const _ = require('lodash');

const User = require('../schema/users');
const Post = require('../schema/posts');

const register = async(req, res) => {
    const user = new User({
      username: req.body.username,
      password: req.body.password
    })

    try {
      await user.save();
      return res.status(201).send({ success: true, message: 'created successfully!!'})

    } catch(err) {
      res.status(500).send({ success: false, message: err.message })
    }
}

const login = async(req, res) => {
    await User.findOne({ username: req.body.username }).then((user) => {
      if(!user){
        res.status(401).send({ success: false, message: 'invalid login!'})
      } else {
        user.comparepassword(req.body.password,(err,isMatch)=>{
          if(!isMatch) {
            res.status(401).send({ success : false, message : 'invalid login!'});
        }
          const token = jwt.sign({id: user._id}, process.env.SECRET);
  
          return res.status(200).header('authorization', token).send({ success: true, message: 'Login successful!'});
            });
      }
    }).catch((err) => {
      res.status(500).send({ success: false, message: err.message })
    })
}

const profile = async(req, res) => {
  await User.findOne({ _id: req.user.id }).then((user) => {
    if(!user){
      res.status(500).send({ success: false, message: 'User not found'})
    } else {
      return res.status(200).send({ success: true, message: user.username })
    }
  }).catch((err) => {
    res.status(500).send({ success: false, message: err.message})
  })
}

const viewPostsByAuthor = async (req, res) => {
  await Post.find({ author: req.params.author }).then((post) => {
    if (_.isEmpty(post)) {
      res.status(404).send({ success: false, message: 'No posts by this author' })
    } else {
      res.status(200).send({ success: true, message: post })
    }
  }).catch((err) => {
    res.status(500).send({ success: false, message: err.message })
  })
}

const viewOwnPosts = async (req, res) => {
  await User.findOne({ _id: req.user.id }).then((user) => {
    if(!user) {
      res.status(404).send({ success: false, message: 'Not logged in!'})
    } else {
      Post.find({ author: user.username }).then((post) => {
        if(_.isEmpty(post)) {
          res.status(404).send({ success: false, message: 'You do not have any posts!'})
        } else {
          res.status(200).send({ success: true, message: post })
        }
      })
    }
   
  }).catch((err) => {
    res.status(500).send({ success: false, message: err.message })
  })

}

module.exports = {
  register,
  login, 
  profile,
  viewPostsByAuthor,
  viewOwnPosts
}
