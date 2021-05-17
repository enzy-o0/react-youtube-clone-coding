const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subScribeSchema = mongoose.Schema({
    userTo: {
        type: Schema.Types.ObjectId, // User 모델의 모든 정보를 가져올 수 있음
        ref:'User'
    },
    userFrom: {
        type: Schema.Types.ObjectId, // User 모델의 모든 정보를 가져올 수 있음
        ref:'User'
    }
    
}, { timestamps : true})

const Subscribe = mongoose.model('Subscribe', subScribeSchema)

module.exports = { Subscribe } 