var express = require('express');
var router = express.Router();

const { User } = require("../models/User");

router.get('/', function(req, res) {
    res.send({greeting: 'Hello React X Node.js'});
});

// 회원 가입 정보
router.post('/register', function(req, res) {
    const user = new User(req.body)
    user.save((err, userInfo) => {
        if(err) return res.json({success: false, err});
        return res.status(200).json({success: true, userInfo});
    })
});

module.exports = router;