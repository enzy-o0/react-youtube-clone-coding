import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { ContactSupportOutlined } from '@material-ui/icons';

function VideoDetailSide() {

    const [VideoList, setVideoList] = useState([])

    useEffect(() => {

        const videoListApi = async() => {
            try {
                const videoListResult = await Axios.get('/api/video/list');
                setVideoList(videoListResult.data.videos);
            } catch (err) {
                alert(`비디오 사이드 목록을 불러오는데 실패했습니다. ${err}`);
            }
        }

        videoListApi();
        
    }, [])

    const renderVideo = VideoList.map((video, index)=> {

        let minutes = Math.floor(video.duration / 60);
        let seconds = Math.floor((video.duration - minutes * 60));

        return <div key={index} style={{ marginTop: '1rem', padding: '0 1rem' }}>
            <a href={`/myVideo/${video._id}`}  style={{display: 'flex', color:'gray' }}>
                <div style={{ width: '40%'}}>
                <img style={{ width: '100%', height: '100%'}} src={process.env.NODE_ENV === 'development' ? `http://localhost:5000/${video.thumbnail}`
                    : `https://aztubes.herokuapp.com/${video.thumbnail}`} alt="비디오 썸네일" />
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
