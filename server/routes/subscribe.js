var express = require('express');
var router = express.Router();
const { Subscribe } = require("../models/Subscribe");
const { Video } = require("../models/Video");
const { auth } = require("../middleware/auth")

router.post('/list', (req, res) => {
    Subscribe.find({ "userFrom" : req.body.userFrom})
        .exec((err, subscribes) => {
            if(err) return res.status(400).send({success: false, err});

            let subscribedUser = [];

            subscribes.map((subscribe, i) => {
                subscribedUser.push(subscribe.userTo);
            })

            Video.find({"writer" : { $in : subscribedUser}}) // 해당하는 값이 여러개일때, 몽고디비의 $in 이용
            .populate('writer')
            .exec((err, videos) => {
                if(err) return res.status(400).send({success: false, err});
                return res.status(200).json({ success: true, videos: videos })
            })
        })

});

router.post('/count', (req, res) => {
    Subscribe.find({ "userTo" : req.body.userTo})
        .exec((err, subscribe) => {
            if(err) return res.status(400).send({success: false, err});
            return res.status(200).json({ success: true, subscribeNumber: subscribe.length })
        })

});

router.post('/add', (req, res) => {

    const subscribe = new Subscribe(req.body)
    subscribe.save((err, doc) => {
            if(err) return res.status(400).send({success: false, err});
            return res.status(200).json({ success: true, doc })
        })

});

router.post('/cancel', (req, res) => {
    Subscribe.findOneAndDelete({ "userTo" : req.body.userTo, "userFrom" : req.body.userFrom})
        .exec((err, doc) => {
            if(err) return res.status(400).send({success: false, err});
            return res.status(200).json({ success: true,  doc})
        })

});

router.post('/isSubscribe', (req, res) => {
    Subscribe.find({ "userTo" : req.body.userTo, "userFrom" : req.body.userFrom})
            .exec((err, subscribe) => {
                if(err) return res.status(400).send({success: false, err});

                let isSubscribe = false;
                if(subscribe.length !== 0) {
                    isSubscribe = true;
                } 

                return res.status(200).json({ success: true, isSubscribe: isSubscribe })
            })

});

module.exports = router;