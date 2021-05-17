var express = require('express');
var router = express.Router();
const { Like } = require("../models/Like");
const { DisLike } = require("../models/DisLike");
const { auth } = require("../middleware/auth")

router.post('/getLikes', (req, res) => {

    Like.find(req.body)
        .exec((err, likes) => {
            if(err) return res.status(400).send({success: false, err});
            return res.status(200).json({ success: true, likes })
        })

});

router.post('/getDisLikes', (req, res) => {

    DisLike.find(req.body)
        .exec((err, dislikes) => {
            if(err) return res.status(400).send({success: false, err});
            return res.status(200).json({ success: true, dislikes })
        })

});

router.post('/upLike', (req, res) => {

    const like = new Like(req.body)
    like.save((err, doc) => {
        if(err) return res.status(400).send({success: false, err});

        DisLike.findOneAndDelete(req.body)
        .exec((err, dislikes) => {
            if(err) return res.status(400).send({success: false, err});
            return res.status(200).json({ success: true, dislikes })
        })
    })

});

router.post('/unLike', (req, res) => {

    Like.findOneAndDelete(req.body)
    .exec((err, likes) => {
        if(err) return res.status(400).send({success: false, err});
        return res.status(200).json({ success: true, likes })
    })

});

router.post('/upDisLike', (req, res) => {

    const dislike = new DisLike(req.body)
    dislike.save((err, doc) => {
        if(err) return res.status(400).send({success: false, err});

        Like.findOneAndDelete(req.body)
        .exec((err, likes) => {
            if(err) return res.status(400).send({success: false, err});
            return res.status(200).json({ success: true, likes })
        })
    })

});

router.post('/unDisLike', (req, res) => {

    DisLike.findOneAndDelete(req.body)
    .exec((err, dislike) => {
        if(err) return res.status(400).send({success: false, err});
        return res.status(200).json({ success: true, dislike })
    })

});


module.exports = router;