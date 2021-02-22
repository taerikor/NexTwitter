const express = require('express')
const Router = express.Router()

const { Post, Comment, Image, User } = require('../models')
const { isLoggedIn } = require('./middlewares')

Router.get('/', async (req, res, next) => {
    try{
        const posts = await Post.findAll({
            limit: 10,
            order: [
              ['createdAt', 'DESC'],
              [Comment, 'createdAt', 'DESC'],
            ],
            include: [{
              model: User,
              attributes: ['id', 'nickname'],
            }, {
              model: Image,
            }, {
              model: Comment,
              include: [{
                model: User,
                attributes: ['id', 'nickname'],
              }],
            }],
        })
        res.status(200).json(posts)
    }catch(error){
        console.error(error)
        next(error)
    }
})
module.exports = Router;