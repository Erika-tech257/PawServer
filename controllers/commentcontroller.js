const express = require('express');
const router = express.Router();
const comments = require('../db').import('../models/comments');
const validateSession = require('../middleware/validate-session');
const pawPost = require('../db').import('../models/pawpost');
const user = require('../db').import('../models/user');

// create a comment under post
router.post('/new/:pawPost/comment', validateSession, (req, res) => {
    const reply = {
        description: req.body.comments.description, 
        owner: req.user.id,
        pawpostId: req.params.pawPost
    }
    comments.create(reply)
    .then(comments => res.status(200).json(comments))
    .catch(err => res.status(500).json({error: err}))
})

// get comments by user

router.get('/my/:id', validateSession, (req, res) => {
    comments.findOne({
        where: {
            owner: req.user.id
        }
    })
    .then(function commentSuccess(data) {
        res.status(200).json({
            message: data === null?'no comments found':'comments found',
            data: data
        })
    }) .catch(err => res.status(500).json({error: err}))
})

// get all comments

router.get('/all', (req,res) => {
    comments.findAll()
    .then(comments => res.status(200).json(comments))
    .catch(err => res.status(500).json({error: err}))
})

// update comment

router.put('/my/:id', validateSession, (req, res) => {
    comments.update(req.body.comments.description, { where: {owner: req.user.id}})

    .then(function commentUpdated(data) {
        res.status(200).json({
            message: 'User comment updated',
            data: data
        })
    }) .catch(err => res.status(500).json('User comment not updated', err))
})

router.delete('/my/:id', validateSession, (req, res) => {
    comments.destroy(req.body.comments.description, { where: {owner: req.user.id}})

    .then(function commentDeleted(data) {
        res.status(200).json({
            message: 'User comment deleted',
            data: data
        })
    }) .catch(err => res.status(500).json('User comment not deleted', err))
})


module.exports = router