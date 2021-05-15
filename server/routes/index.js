var express = require('express');
var router = express.Router();

const { User } = require("../models/User");
const { auth } = require("../middleware/auth")

router.get('/', (req, res) => {
    res.send({greeting: 'Hello React X Node.js'});
});

// Auth 토큰 인증
router.get('/auth', auth ,(req, res) => {
    return res.status(200).json({
        isAuth: true, 
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        image: req.user.image
    });
})

// 회원 가입 정보
router.post('/signUp', (req, res) => {
    const user = new User(req.body)
    user.save((err, userInfo) => {
        if(err) return res.json({ signUpSuccess: false, err});
        return res.status(200).json({signUpSuccess: true});
    })
});

// 로그인
router.post('/signIn', (req, res) => {
    User.findOne({ email: req.body.email} , (err, userInfo) => {
        if(!userInfo) {
            return res.json({
                signInSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }

        userInfo.comparePassword(req.body.password, function(err, isMatch) {
            if(!isMatch) return res.json({ signInSuccess: false, message: "비밀번호가 틀렸습니다."}, err);
        })

        
        userInfo.generateToken((err, user) => {
            if(err) return res.status(400).send(err);

            res.cookie("x_auth", user.token)
                .status(200)
                .json( { signInSuccess: true, userId: user._id })
        })
    })
    
});

// 로그아웃
router.get('/logout', auth, (req, res) => {
    
    User.findByIdAndUpdate({
        _id: req.user._id}, {token: ""}, (err, user) => {
            if (err) return res.json({ logoutSuccess: false, err });
            return res.status(200).send( {
                logoutSuccess: true
        })
    })
});




module.exports = router;