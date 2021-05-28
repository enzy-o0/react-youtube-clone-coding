import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'

import moment from 'moment';
import axios from 'axios';
import { API_URL } from '../../Config'

import Avatar from '@material-ui/core/Avatar';
import { Card, Icon, Col, Typography, Row} from 'antd';
const { Title } = Typography;
const { Meta } = Card;

function Search(props) {
    const [SearchList, setSearchList] = useState([])

    const keyword = props.match.params.q;

    const variable = {
        part: 'snippet',
        q: keyword,
        maxResults: 20,
        type: 'video',
        order: 'viewCount',
    };

    const keywords = {
        query: keyword
    }

    useEffect(() => {

            axios.post('/api/video/search', keywords)
            .then(response => {
                if (response.data !== null) {
                    console.log(response.data.videos);
                    setSearchList(response.data.videos)
                } else {
                    alert('비디오 목록을 불러오는데 실패했습니다.');
                }
            }) 
    }, [])

    const renderVideo = SearchList.map((video, index)=> {

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
            <span style={{ marginLeft: '3rem'}} > {moment(video.createAt).format("YYYY-MM-DD")}</span>
        </Col>
    })

    return (
        <div style={{ width: '90%', margin: '5rem auto' }}>
            <Title level={5} > 검색 결과입니다. </Title>
            <hr />
            <Row gutter={[32, 16]}>
                {renderVideo}
            </Row>
        </div>
    )
}

export default withRouter(Search)
