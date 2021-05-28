import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Col, Row } from 'antd';
import moment from 'moment';
import { API_KEY } from '../../Config'
import Avatar from '@material-ui/core/Avatar';

function LandingPage() {
    const [VideoList, setVideoList] = useState([])

    const params = {
        part: 'snippet',
        q: '힐링',
        maxResults: 20,
        type: 'video',
        order: 'viewCount',
        key: API_KEY
    };


    useEffect(() => {
            // axios.get('https://www.googleapis.com/youtube/v3/search', { params })
            // .then(response => {
            //     if (response.data !== null) {
            //         console.log(response.data.items);
            //         setVideoList(response.data.items)
            //     } else {
            //         alert('비디오 목록을 불러오는데 실패했습니다.');
            //     }
            // }) 
    }, [])

    const renderVideo = VideoList.map((video, index)=> {

        return <Col lg={6} md={8} xs={24} key={index}>
            <div style={{ display: 'flex', flexDirection: 'column'}}>
                <a href = {`/youtube/${video.id.videoId}`} >
                    <img style={{ width: '100%', marginBottom: '1rem'}} src={video.snippet.thumbnails.high.url} alt="비디오 썸네일" />
                </a>
                <div style={{ display: 'flex'}}>
                    <Avatar src={`http://gravatar.com/avatar/${index}?d=identicon`} />
                    <span className="videoInfoTitle">{video.snippet.title}</span>
                </div>
                <span className="videoInfo"> {video.snippet.channelTitle}</span>
                <span className="videoInfo"> {moment(video.snippet.publishedAt).format("YYYY-MM-DD")}</span>
            </div>
        </Col>
    })

    return (
        <div style={{ width: '90%', margin: '5rem auto' }}>
            <Row gutter={[32, 16]}>
                {/* {renderVideo} */}
            </Row>
        </div>
    )
}

export default LandingPage
