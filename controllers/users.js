const jwt = require('jsonwebtoken');

const User = require('../schema/users');

const register = async(req, res) => {
    const user = new User({
      username: req.body.username,
      password: req.body.password
    })

    try {
      await user.save();
      return res.status(201).send({ success: true, message: 'created successfully!!'})

    } catch(e) {
      res.status(500).send({ success: false, message: e.message })
    }
}

const login = async(req, res) => {
    User.findOne({ username: req.body.username }).then((user) => {
      if(!user){
        res.status(403).send({ success: false, message: 'invalid login!'})
      } else {
        user.comparepassword(req.body.password,(err,isMatch)=>{
          if(!isMatch) {
            res.status(403).send({ success : false, message : 'invalid login!'});
        }
          const token = jwt.sign({id: user._id}, process.env.SECRET);
  
          return res.status(200).header('authorization', token).send({ success: true, message: 'Login successful!'});
            });
      }
    }).catch((err) => {
      res.status(500).send({ success: false, message: e.message })
    })
}

const profile = async(req, res) => {
  User.findOne({ _id: req.user.id }).then((user) => {
    if(!user){
      res.status(500).send({ success: false, message: 'User not found'})
    } else {
      return res.status(200).send({ success: true, message: user.username })
    }
  }).catch((err) => {
    res.status(500).send({ success: false, message: err.message})
  })
}

module.exports = {
  register,
  login, 
  profile
}
