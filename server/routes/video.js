var express = require('express');
var router = express.Router();
const { Video } = require("../models/Video");
const { Comment } = require("../models/Comment");
const multer = require("multer");
var ffmpeg = require('fluent-ffmpeg');

let storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "videoFiles/");
    },
    filename: (req, file, callback) => {
        callback(null, `${file.originalname}_${Date.now()}`);
    },
    fileFilter: (req, file, callback) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4') {
            return callback(req.status(400).end('only mp4 is allowed'), false);
        }

        callback(null, true);
    }
})

const upload = multer({ storage: storage}).single("file");

router.post('/upload', (req, res) => {
    
    upload(req, res, err => {
        if(err) {
            return res.json({ success: false, err})
        }
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename})

    })

});

router.post('/thumbnail', (req, res) => {

    let filePath = ""
    let fileDuration = ""
    let fileName = ""
    // 비디오 정보 가져오기 (비디오 시간)
    ffmpeg.ffprobe(req.body.url, function(err, metadata) {
        console.dir(metadata);
        console.log(metadata.format.duration);
        fileDuration = metadata.format.duration
    })

    // 썸네일 생성하기
    ffmpeg(req.body.url)
    .on('filenames', function(filenames) {
        console.log('Will generate ' + filenames.join(', '))
        console.log(filenames)
        fileName = filenames[0];
        filePath = "videoFiles/thumbnails/" + filenames[0]
    }) 
    .on('end', function() {
        console.log('Screenshots taken');
        return res.json( { success: true, url: filePath, fileName: fileName, fileDuration: fileDuration})
    })
    .on('error', function(err) {
        console.error(err);
        return res.json({ success: false, err});
    })
    .screenshot( {
        count: 3,
        folder: 'videoFiles/thumbnails',
        size: '320x240',
        filename: 'thumbnail-%b.png'
    })
});

router.post('/uploadVideo', (req, res) => {
    
    const video = new Video(req.body)
    video.save((err, videoInfo) => {
        if(err) return res.json({ success: false, err});
        return res.status(200).json({success: true});
    })

});

router.get('/list', (req, res) => {
    
    Video.find()
        .populate('writer') // 모든 writer 정보를 가져옴
        .exec((err, videos) => {
            if(err) return res.status(400).send(err);
            return res.status(200).json({ success: true, videos: videos})
        })

});

router.post('/getVideoDetail', (req, res) => {
    
    Video.findOne({"_id" : req.body.videoId })
        .populate('writer') // 모든 writer 정보를 가져옴
        .exec((err, videoDetails) => {
            if(err) return res.status(400).send(err);
            return res.status(200).json({ success: true, videoDetails: videoDetails})
        })

});

router.post("/saveComment", (req, res) => {

    const comment = new Comment(req.body)

    comment.save((err, comment) => {
        if (err) return res.json({ success: false, err })

        Comment.find({ '_id': comment._id })
            .populate('writer')
            .exec((err, result) => {
                if (err) return res.json({ success: false, err })
                return res.status(200).json({ success: true, result })
            })
    })

})

router.post("/getComments", (req, res) => {

    Comment.find({ "videoId": req.body.videoId })
        .populate('writer')
        .exec((err, comments) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, comments })
        })

});

module.exports = router;