const express = require('express');
const { User } = require('../models');
const router = express.Router();
const validateSession = require('../middleware/validate-session');
const pawPost = require('../db').import('../models/pawpost');
const comments= require('../db').import('../models/comments')

// Create post

router.post('/log', validateSession, (req,res)=> {
    const blog = {
        title: req.body.pawpost.title,
        animal: req.body.pawpost.animal,
        color: req.body.pawpost.color,
        city: req.body.pawpost.city,
        state: req.body.pawpost.state,
        description: req.body.pawpost.description,
        date: req.body.pawpost.date,
        time: req.body.pawpost.time,
        owner: req.user.id
    }
    pawPost.create(blog)
    .then(pawpost => res.status(200).json(pawpost))
    .catch(err => res.status(500).json({error: err}))
});

// get all posts entries

// {include: [{ model: User, as: "newPost"}]}

router.get('/allLogs', (req, res) => {
    pawPost.findAll({
        include:['comments']
    })
    .then(pawpost => res.status(200).json(pawpost))
    .catch(err => res.status(500).json({error: err}))
});

// get posts by individual user, have to input id#

router.get('/my/:id', validateSession, (req, res) => {
    let userid = req.user.id
    pawPost.findAll({
        where: {owner:userid,id:req.params.id}
    })
    .then(pawpost => res.status(200).json(pawpost))
    .catch(err => res.status(500).json({error: err}))
});

// individual user can update post, have to input id#

router.put('/:id', validateSession,  (req, res) =>{
    const updatePawPost = {
        title: req.body.pawpost.title,
        animal: req.body.pawpost.animal,
        color: req.body.pawpost.color,
        city: req.body.pawpost.city,
        state: req.body.pawpost.state,
        description: req.body.pawpost.description,
        date: req.body.pawpost.date,
        time: req.body.pawpost.time,
    };
    
    const query = {where: {id: req.params.id, owner: req.user.id }}
    
    pawPost.update(updatePawPost, query)
    .then((pawpost) => res.status(200).json(pawpost))
    .catch((err) => res.status(500).json({ error: err }));
});

// delete post

router.delete('/:id', validateSession,  (req, res) => {
    const query = {where: {id: req.params.id, owner: req.user.id} };

    pawPost.destroy(query)
    .then(()=> res.status(200).json({ message: 'Post successfully removed'}))
    .catch((err)=> res.status(500).json({ error: err}));
});
module.exports = router