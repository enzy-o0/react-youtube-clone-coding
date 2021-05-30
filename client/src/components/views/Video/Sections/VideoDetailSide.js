import React, { useEffect, useState } from 'react'
import axios from 'axios';

function VideoDetailSide() {

    const [VideoList, setVideoList] = useState([])

    useEffect(() => {
        axios.get('/api/video/list')
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.videos)
                    setVideoList(response.data.videos)
                } else {
                    alert('비디오 목록을 불러오는데 실패했습니다.');
                }
            }) 
    }, [])

    const renderVideo = VideoList.map((video, index)=> {

        let minutes = Math.floor(video.duration / 60);
        let seconds = Math.floor((video.duration - minutes * 60));

        return <div key={index} style={{ marginTop: '1rem', padding: '0 1rem' }}>
            <a href={`/video/${video._id}`}  style={{display: 'flex', color:'gray' }}>
                <div style={{ width: '40%'}}>
                    <img style={{ width: '100%', height: '100%'}} src={`http://localhost:5000/${video.thumbnail}`}  alt="썸네일 이미지"/>
                </div>
                <div style={{ width: '40%', marginLeft: '1rem'}}>
                    <span style={{ color: '#000', fontSize: '1rem'}}>{video.title}</span>
                    <br />
                    <span>{video.writer.name}</span>
                    <br />
                    <span>{minutes} : {seconds}</span>
                </div>
            </a>
        </div>
    });
    
    return (
        <React.Fragment>
            <div style={{ marginTop:'5rem' }}></div>
            { renderVideo }
        </React.Fragment>
    )
}

export default VideoDetailSide
