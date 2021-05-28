import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import {Row, Col, List} from 'antd'
import axios from 'axios'
import Avatar from 'antd/lib/avatar/avatar';
import SideVideo from '../Video/Sections/VideoDetailSide'
import SubscribeVideo from '../Video/Sections/VideoSubscribe'
import VideoComment from '../Video/Sections/VideoComment'
import LikeDislike from '../Video/Sections/Sections/VideoLikeDisLike'
import { VIDEO_URL } from '../../Config'

function LandingDetail(props) {

    const [VideoDetail, setVideoDetail] = useState([]);
    const [CommentLists, setCommentLists] = useState([]);


    const youtubeId = props.match.params.youtubeId;
    
    const variable = { 
        part: 'snippet',
        id: youtubeId,
    }

    useEffect(() => {
        
        axios.get({VIDEO_URL}, { variable })
            .then(response => {
                console.log(response);

                if (response.data !== null) {
                    setVideoDetail(response.data.items)
                } else {
                    alert('비디오 목록을 불러오는데 실패했습니다.');
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
                    <div style={{ width: '100%', padding: '3rem 4rem'}}>
    
                        <video controls style={{ width: '100%'}} >
                            <source src={`http://localhost:5000/${VideoDetail.filePath}`} type="video/mp4"/>
                        </video>

                        <List.Item
                            actions={[<LikeDislike video videoId={youtubeId} useId={localStorage.getItem('userId')} />, subscribeButton]}>

                            <List.Item.Meta
                                avatar={<Avatar src={VideoDetail.writer.image}/>}
                                title={VideoDetail.writer.name}
                                description={VideoDetail.description}
                            />
                        </List.Item>

                        {CommentLists && (
                            <VideoComment refreshFunction={refreshFunction} commentList={CommentLists} videoId={youtubeId}/>
                        ) }

                    </div>
                </Col>
                <Col lg={6} xs={24}>
                    <SideVideo />
                </Col>
            </Row>
        )
    } else {
        return <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems:'center'}}> loading... </div>
    }
}

export default withRouter(LandingDetail)
