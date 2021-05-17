const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId, // User 모델의 모든 정보를 가져올 수 있음
        ref:'User'
    },
    commentId: {
        type: Schema.Types.ObjectId, // User 모델의 모든 정보를 가져올 수 있음
        ref:'User'
    },
    videoId: {
        type: Schema.Types.ObjectId, // Video 모델의 모든 정보를 가져올 수 있음
        ref:'Video'
    }
}, { timestamps : true})

const Like = mongoose.model('Like', likeSchema)

module.exports = { Like } 