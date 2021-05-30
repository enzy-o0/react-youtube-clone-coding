import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'

import Axios from 'axios';

import moment from 'moment';

import { Card, Avatar, Col, Typography, Row} from 'antd';
const { Title } = Typography;
const { Meta } = Card;

function UserVideo() {

    const [VideoList, setVideoList] = useState([])

    useEffect(() => {

        const videoListApi = async() => {
            const videoListResult = await Axios.get('/api/video/list');

            if (videoListResult.data.success) {
                setVideoList(videoListResult.data.videos)
            } else {
                alert('비디오 목록을 불러오는데 실패했습니다.');
            }
        }

        videoListApi();
        
    }, [])

    const renderVideo = VideoList.map((video, index)=> {

        let minutes = Math.floor(video.duration / 60);
        let seconds = Math.floor((video.duration - minutes * 60));

        return <Col lg={6} md={8} xs={24} key={index}>
            <div style={{ position: 'relative'}}>
                <a href = {`/myVideo/${video._id}`}>
                    <img style={{ width: '100%'}} src={process.env.NODE_ENV === 'development' ? `http://localhost:5000/${video.thumbnail}`
                    : `https://aztubes.herokuapp.com/${video.thumbnail}`} alt="비디오 썸네일" />
                    <div className="duration">
                        <span>{minutes} : {seconds}</span>
                    </div>
                </a>
                <br />
            </div>
            <br />
            <Meta 
                avatar={
                    <Avatar src={video.writer?.image} />
                }
                title={video.title}
            />
            <span>{video.writer?.name}</span>
            <br />
            <span style={{ marginLeft: '3rem'}} > {moment(video.createAt).format("YYYY-MM-DD")}</span>
        </Col>
    })

    return (
        <div style={{ width: '90%', margin: '5rem auto' }}>
            <Title level={5} > 유튜브가 아닌 사이트에 직접 올린 동영상입니다. </Title>
            <hr />
            <Row gutter={[32, 16]}>
                {renderVideo}
            </Row>
        </div>
    )

}

export default withRouter(UserVideo)

