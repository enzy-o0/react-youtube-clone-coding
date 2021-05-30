import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import {Row, Col, List} from 'antd'
import Axios from 'axios'
import Avatar from 'antd/lib/avatar/avatar';
import SideVideo from '../Video/Sections/VideoDetailSide'

function LandingDetail(props) {

    const [VideoDetail, setVideoDetail] = useState([]);

    useEffect(() => {
        
        const getVideos = async() => {
            const videos = await Axios.get(`https://www.googleapis.com/youtube/v3/videos?key=${process.env.REACT_APP_API_KEY}&part=snippet&id=${props.match.params.youtubeId}`);
            
            if (videos.data !== null) {
                setVideoDetail(videos.data.items)
                console.log(videos.data.items)
                
            } else {
                alert('비디오 목록을 불러오는데 실패했습니다.');
            }

        }
        getVideos();
    }, []);

    const renderVideo = VideoDetail.map((video, index)=> {

        return <Col lg={18} xs={24}  key={index}>
            <div style={{ width: '100%',  padding: '5rem 4rem 0 4rem'}}>

                <div className="video-player" >
                    <div className="embed-responsive embed-responsive-16by9" >
                        <iframe className="embed-responsive-item" style={{ width: '100%', height: '20rem'}}
                            src={`https://www.youtube.com/embed/${video.id}`} allowFullScreen></iframe>
                    </div>
                </div>
                

                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar src={`http://gravatar.com/avatar/${video.id}?d=identicon`}/>}
                        title={video.snippet.title}
                        description={video.snippet.description}
                    />
                </List.Item>
                {/* 
                {CommentLists && (
                    <VideoComment refreshFunction={refreshFunction} commentList={CommentLists} videoId={VideoDetail.id}/>
                ) } */}

            </div>
        </Col>
    })
        
    return (
        <Row gutter={[16, 16]} style={{height: '100%'}}>
            {renderVideo}
            <Col lg={6} xs={24}>
                <SideVideo />
            </Col>
        </Row>
    )
}

export default withRouter(LandingDetail)
