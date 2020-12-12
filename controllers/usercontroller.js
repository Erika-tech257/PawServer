const router = require ('express').Router();
const User = require('../db').import('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateSession = require('../middleware/validate-session');


router.post('/signup', function (req, res) {

    User.create({
        email: req.body.user.email,
        password: bcrypt.hashSync(req.body.user.password, 13),
        firstName: req.body.user.firstName,
        lastName: req.body.user.lastName,
        displayName: req.body.user.displayName,
        location: req.body.user.location
    })
    .then(
        function createSuccess(user) {
            let token = jwt.sign({id: user.id}, process.env.JWT, {expiresIn: '7d'});
            res.json({
                user: user,
                message: 'User successfully created',
                sessiontoken: token
            });
        }
    )
    .catch(err => res.status(500).json({ error:err}))
});

router.post('login', (req, res) => {
    User.findOne({where: {email: req.body.user.email}})
    .then(user => {
        if(user) {
            bcrypt.compare(req.body.user.password, user.password, (err, matches) => {
                if (matches) {
            let token = jwt.sign({id: user.id}, process.env.JWT, {expiresIn: '7d'});

        res.status(200).json ({
            user:user,
            message: 'User logged in successfully',
            sessiontoken: token
        })

    } else {
        res.status(502).send({ error: 'Login Failed'})
    }
})
        } else {
            res.status(500).json({error: "User does not exist"})
        }
    })
        .catch (err => res.status(500).json ({ error: err }))
});

// User Profile endpoint

router.get('/:id', (req, res) => {
    User.findOne({
        where: { id: req.params.id }
    })
    .then(user => res.status(200).json({ user: user }))
    .catch(err => res.status(500).json({ error: err }))
})

// cloudinary endpoints for user to upload image

router.get('/cloudsign', validateSession, async (req, res) => {
    try {
        const ts = Math.floor(new Date().getTime() / 1000).toString()
        

        const sig = cloudinary.utils.api_sign_request(
            {timestamp: ts, upload_preset: 'uuhz0rq7'},
            process.env.CLOUDINARY_SECRET

        )
        
        res.status(200).json({
            sig, ts
        })
    } catch (err) {
        res.status(500).json({
            message: 'sign failed'
        })
    }
})

router.put('/imageset', validateSession, async (req, res) => {
    try {
        const u = await User.findOne({where: {id: req.user.id}})

        const result = await u.update({
            avatar: req.body.url
        })

        res.status(200).json({
            message: 'avatar url saved',
            result
        })
    } catch (err){
        res.status(500).json({
            message: 'failed to set image'
        })
    }
})

router.get('/:id', (req, res) => {
    User.findOne({
        where: { id: req.params.id }
    })
    .then(user => res.status(200).json({ user: user }))
    .catch(err => res.status(500).json({ error: err }))
})

module.exports = router