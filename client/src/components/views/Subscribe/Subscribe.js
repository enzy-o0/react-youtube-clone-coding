import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import Axios from 'axios';

import moment from 'moment';

import { Card, Avatar, Col, Typography, Row} from 'antd';
const { Title } = Typography;
const { Meta } = Card;

function VideoSubscribe() {

    const [Subscribe, setSubscribe] = useState([])

    const variabels = {
        userFrom: localStorage.getItem('userId')
    }

    useEffect(()=> {

        const subscribeListApi = async () => {
                const subscribeResult = await Axios.post('/api/subscribe/list', variabels);
                if(subscribeResult.data.success) {
                    setSubscribe(subscribeResult.data.videos)
                } else {
                    alert('구독된 정보를 가져오는데 실패했습니다.');
                }
        }

        subscribeListApi();

    }, [])


    const renderVideo = Subscribe.map((subscribe, index)=> {

        let minutes = Math.floor(subscribe.duration / 60);
        let seconds = Math.floor((subscribe.duration - minutes * 60));

        return <Col lg={6} md={8} xs={24} key={index}>
            <div style={{ position: 'relative'}}>
                <a href = {`/myVideo/${subscribe._id}`}>
                    <img style={{ width: '100%'}} src={process.env.NODE_ENV === 'development' ? `http://localhost:5000/${subscribe.thumbnail}`
                    : `https://aztubes.herokuapp.com/${subscribe.thumbnail}`} alt="비디오 썸네일" />
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
            <span style={{ marginLeft: '3rem'}} > {moment(subscribe.createAt).format("MMM DD YY")}</span>
        </Col>
    })

    return (
        <div style={{ width: '90%', margin: '5rem auto' }}>
            <Title level={5} > 사용자가 구독한 영상입니다. </Title>
            <hr />
            <Row gutter={[32, 16]}>
                {renderVideo}
            </Row>
        </div>
    )

}

export default withRouter(VideoSubscribe)

