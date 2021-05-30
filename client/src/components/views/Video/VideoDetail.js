import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import {Row, Col, List} from 'antd'
import axios from 'axios'
import Avatar from 'antd/lib/avatar/avatar';
import SideVideo from './Sections/VideoDetailSide'
import SubscribeVideo from './Sections/VideoSubscribe'
import VideoComment from './Sections/VideoComment'
import LikeDislike from './Sections/Sections/VideoLikeDisLike'

function VideoDetail(props) {

    const videoId = props.match.params.videoId;
    const [VideoDetail, setVideoDetail] = useState([]);
    const [CommentLists, setCommentLists] = useState([]);

    const variable = { 
        videoId: videoId 
    }

    useEffect(() => {
        axios.post('/api/video/getVideoDetail', variable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.videoDetails);
                    setVideoDetail(response.data.videoDetails);
                } else {
                    alert('비디오 상세페이지를 불러오지 못했습니다.');
                }
            })

        axios.post('/api/video/getComments', variable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.comments);
                    setCommentLists(response.data.comments);
                } else {
                    alert('코멘트 리스트를 불러오지 못했습니다.');
                }
            })   
    }, [])

    const refreshFunction = (addComment) => {
        setCommentLists(CommentLists.concat(addComment))
    }

    console.log(VideoDetail.writer)
    if (VideoDetail.writer) {

        const subscribeButton = VideoDetail.writer._id !== localStorage.getItem('userId') && <SubscribeVideo userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')} />  
        
        return (
            <Row gutter={[16, 16]}>
                <Col lg={18} xs={24}>
                    <div style={{ width: '100%', padding: '3rem 4rem', marginTop: '1rem'}}>
    
                        <video controls style={{ width: '100%'}} >
                            <source src={`http://localhost:5000/${VideoDetail.filePath}`} type="video/mp4"/>
                        </video>

                        <List.Item
                            actions={[<LikeDislike video videoId={videoId} useId={localStorage.getItem('userId')} />, subscribeButton]}>

                            <List.Item.Meta
                                avatar={<Avatar src={VideoDetail.writer.image}/>}
                                title={VideoDetail.writer.name}
                                description={VideoDetail.description}
                            />
                        </List.Item>

                        {CommentLists && (
                            <VideoComment refreshFunction={refreshFunction} commentList={CommentLists} videoId={videoId}/>
                        ) }

                    </div>
                </Col>
                <Col lg={6} xs={24} style={{marginTop: '2rem'}}>
                    <SideVideo />
                </Col>
            </Row>
        )
    } else {
        return <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems:'center'}}> loading... </div>
    }
}

export default withRouter(VideoDetail)
