const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId, // User 모델의 모든 정보를 가져올 수 있음
        ref:'User'
    },
    videoId: {
        type: Schema.Types.ObjectId, // User 모델의 모든 정보를 가져올 수 있음
        ref:'Video'
    },
    responseTo: {
        type: Schema.Types.ObjectId, // User 모델의 모든 정보를 가져올 수 있음
        ref:'User'
    },
    content: {
        type: String
    }
    
}, { timestamps : true})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = { Comment } 