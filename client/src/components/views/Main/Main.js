import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios';
import { Card, Icon, Avatar, Col, Typography, Row} from 'antd';
import moment from 'moment';
const { Title } = Typography;
const { Meta } = Card;

function Main() {

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

        return <Col lg={6} md={8} xs={24} key={index}>
            <div style={{ position: 'relative'}}>
                <a href = {`/video/${video._id}`}>
                    <img style={{ width: '100%'}} src={`http://localhost:5000/${video.thumbnail}`} alt="비디오 썸네일" />
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
            <span style={{ marginLeft: '3rem'}} > {video.views} views </span> - <span>{moment(video.createAt).format("MMM DD YY")}</span>
        </Col>
    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2} > Recommended </Title>
            <hr />
            <Row gutter={[32, 16]}>
                {renderVideo}
            </Row>
        </div>
    )
}

export default withRouter(Main)
