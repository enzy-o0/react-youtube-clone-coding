const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

// save 하기 전에 (mongo API)
userSchema.pre('save', function(next) {
    const user = this;
    // 다른 스키마를 바꿔도 반영되기 때문에, password이 수정될때만 분기 처리
    if (user.isModified('password')) {
        // password encypted
        bcrypt.genSalt(saltRounds, function(err, salt) {     
            if(err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash) {
                // Store hash in your password DB.
                if(err) return next(err);
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
});

userSchema.methods.comparePassword = function(plainPassword, callback) {
    // 다시 복호화는 불가능
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return callback(err);
        callback(null, isMatch)
    })
}

userSchema.methods.generateToken = function(callback) {
    const user = this;

    let token = jwt.sign(user._id.toHexString(), 'accessToken');
    user.token = token
    user.save(function(err, user) {
        if(err) return callback(err);
        callback(null, user)
    })
}

userSchema.statics.findByToken = function(token, callback) {
    const user = this;

    // 토큰 decode
    jwt.verify(token, 'accessToken', function(err, decoded) {
        user.findOne( { 
            "_id" : decoded,
            "token" : token }, function(err, user) {
                if (err) return callback(err);
                return callback(null, user);
            })
    });    
}


const User = mongoose.model('User', userSchema)

module.exports = { User } 