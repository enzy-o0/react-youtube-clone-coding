import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios';
import { Card, Icon, Avatar, Col, Typography, Row} from 'antd';
import moment from 'moment';
const { Title } = Typography;
const { Meta } = Card;

function VideoSubscribe() {

    const [Subscribe, setSubscribe] = useState([])

    const variabels = {
        userFrom: localStorage.getItem('userId')
    }

    useEffect(()=> {

        axios.post('/api/subscribe/list', variabels)
            .then(response => {
                if(response.data.success) {
                    console.log(response.data);
                    setSubscribe(response.data.videos)
                } else {
                    alert('구독된 정보를 가져오는데 실패했습니다.');
                }
            })

    }, [])


    const renderVideo = Subscribe.map((subscribe, index)=> {

        let minutes = Math.floor(subscribe.duration / 60);
        let seconds = Math.floor((subscribe.duration - minutes * 60));

        return <Col lg={6} md={8} xs={24} key={index}>
            <div style={{ position: 'relative'}}>
                <a href = {`/subscribe/${subscribe._id}`}>
                    <img style={{ width: '100%'}} src={`http://localhost:5000/${subscribe.thumbnail}`} alt="비디오 썸네일" />
                    <div className="duration">
                        <span>{minutes} : {seconds}</span>
                    </div>
                </a>
                <br />
            </div>
            <br />
            <Meta 
                avatar={
                    <Avatar src={subscribe.writer?.image} />
                }
                title={subscribe.title}
            />
            <span>{subscribe.writer?.name}</span>
            <br />
            <span style={{ marginLeft: '3rem'}} > {subscribe.views} views </span> - <span>{moment(subscribe.createAt).format("MMM DD YY")}</span>
        </Col>
    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2} > Subscribe </Title>
            <hr />
            <Row gutter={[32, 16]}>
                {renderVideo}
            </Row>
        </div>
    )

}

export default withRouter(VideoSubscribe)

