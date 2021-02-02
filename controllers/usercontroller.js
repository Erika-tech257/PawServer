const router = require('express').Router();
const User = require('../db').import('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cloudinary = require ('cloudinary')
const validateSession = require('../middleware/validate-session');
const { PawPost, Comments } = require('../models');




router.post('/signup', (req, res) => {
    User.create({
        email: req.body.user.email,
        password: bcrypt.hashSync(req.body.user.password, 13),
        username: req.body.user.username

    })
        .then(
            function createSuccess(user) {
                const token = jwt.sign({ id: user.id }, process.env.JWT, { expiresIn: '7d' });
                res.json({
                    user: user,
                    message: 'User successfully created',
                    sessiontoken: token
                });
            })
        .then(user => res.status(200).json({ user: user }))
        .catch(err => res.status(500).json({ error: err }))
});

router.post('/login', (req, res) => {
    User.findOne({
        where:
            { email: req.body.user.email }
    })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.user.password, user.password, (err, matches) => {
                    if (matches) {
                        const token = jwt.sign({ id: user.id }, process.env.JWT, { expiresIn: '7d' });
                        console.log(token);

                        res.status(200).json({
                            user: user,
                            message: 'User logged in successfully',
                            sessiontoken: token
                        })

                    } else {
                        res.status(502).send({ error: 'Login Failed' })
                    }
                })
            } else {
                res.status(500).json({ error: "User does not exist" })
            }
        })
        .catch(err => res.status(500).json({ error: err }))
});

// Get all users 

// router.get('/all', (req, res) => {
//     User.findAll({ 
//         include:['newPost','comments'] 
//     })
//         .then(user => res.status(200).json({ user: user }))
//         .catch(err => res.status(500).json({ error: err }))
// })

// cloudinary endpoints for user to upload image

router.get('/cloudsign', validateSession, async (req, res) => {
    try {
        const ts = Math.floor(new Date().getTime() / 1000).toString()

        console.log(process.env.CLOUDINARY_SECRET)
        const sig = cloudinary.utils.api_sign_request(
            { timestamp: ts, upload_preset: 'uuhz0rq7' },
            process.env.CLOUDINARY_SECRET

        )

        res.status(200).json({
            sig, ts
        })
    } catch (err) {
        res.status(500).json({
            err
        })
    }
})

router.put('/imageset', validateSession, async (req, res) => {
    try {
        const u = await User.findOne({ where: { id: req.user.id } })

        const result = await u.update({
            avatar: req.body.url
        })

        res.status(200).json({
            message: 'avatar url saved',
            result
        })
    } catch (err) {
        res.status(500).json({
            message: 'failed to set image'
        })
    }
})


module.exports = router