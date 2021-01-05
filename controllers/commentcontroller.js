const express = require('express');
const router = express.Router();
const comments = require('../db').import('../models/comments');

// create a comment under post
router.post('/newComment', (req, res) => {
    const reply = {
        description: req.body.comments.description, userId: req.body.user
    }
    comments.create(reply)
    .then(comments => res.status(200).json(comments))
    .catch(err => res.status(500).json({error: err}))
})

// get user comment

router.get('/newComment', (req, res) => {
    comments.findOne({
        where: {
            userId: req.user.id
        }
    })
    .then(function commentSuccess(data) {
        res.status(200).json({
            message: 'User comment found',
            data: data
        })
    }) .catch(err => res.status(500).json('User comment not found', err))
})

// update comment

router.put('/newComment', (req, res) => {
    comments.update(req.body.comments.userName, { where: {userId: req.user.id}})

    .then(function commentUpdated(data) {
        res.status(200).json({
            message: 'User comment updated',
            data: data
        })
    }) .catch(err => res.status(500).json('User comment not updated', err))
})

router.delete('/newComment', (req, res) => {
    comments.destroy(req.body.comments.userName, { where: {userId: req.user.id}})

    .then(function commentUpdated(data) {
        res.status(200).json({
            message: 'User comment deleted',
            data: data
        })
    }) .catch(err => res.status(500).json('User comment not deleted', err))
})


module.exports = comments