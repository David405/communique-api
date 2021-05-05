const _ = require('lodash');

const Category = require('../schema/categories');
const User = require('../schema/users');
const Post = require('../schema/posts');

const addCategory = async(req, res, next) => {
    await User.findOne({ _id: req.user.id }).then((user) => {
        if(!user) {
            res.status(401).send({ success: false, message: 'Not authorised!'})
        } else {
            const category = new Category({ 
                title: req.body.title
            })

            category.save();

            res.status(201).send({ success: true, message: 'successfully added'})
        }
    }).catch((err) => {
        res.status(500).send({ success: false, message: err.message })
    }) 
}

const viewAll = async (req, res) => {
    await Category.find({}).then((category) => {
        if(!category) {
            res.status(404).send({ success: false, message: 'No categories found!'})
        } else {
            res.status(200).send({ success: true, message: category })
        }
    }).catch((err) => {
        res.status(500).send({ success: false, message: err.message })
    })
}

const viewPostsByCategory = async (req, res) => {
    await Post.find({ category: req.params.category }).then((post) => {
        if(_.isEmpty(post)) {
            res.status(404).send({ success: false, messsage: 'No posts in this category' })
        } else {
            res.status(200).send({ success: true, message: post })
        }
    }).catch((err) => {
        res.status(500).send({ success: false, message: err })
    })
}

const deleteCategory = async (req, res) => {
    await Category.findOneAndDelete({ title: req.params.title }).then((category) => {
        if(!category) {
            res.status(404).send({ success: false, message: 'Category does not exist'})
        } else {
            res.status(200).send({ success: true, message: 'deleted successfully!'})
        }
    }).catch((err) => {
        res.status(500).send({ success: false, message: err.message})
    })
}

module.exports = { 
    addCategory, 
    viewAll,
    viewPostsByCategory,
    deleteCategory
}