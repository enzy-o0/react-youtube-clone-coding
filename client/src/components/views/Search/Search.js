import React, { useEffect, useState } from 'react'
import { withRouter, Link } from 'react-router-dom'

import moment from 'moment';
import axios from 'axios';

import Avatar from '@material-ui/core/Avatar';
import { Card, Icon, Col, Typography, Row} from 'antd';
const { Title } = Typography;
const { Meta } = Card;

function Search(props) {
    const [SearchList, setSearchList] = useState([])

    const keyword = props.match.params.q;

    const params = {
        part: 'snippet',
        q: keyword,
        maxResults: 20,
        type: 'video',
        order: 'viewCount',
        key: process.env.REACT_APP_API_KEY
    };

    useEffect(() => {

            axios.get('https://www.googleapis.com/youtube/v3/search', { params })
            .then(response => {
                if (response.data !== null) {
                    console.log(response.data.items);
                    setSearchList(response.data.items)
                } else {
                    alert('비디오 목록을 불러오는데 실패했습니다.');
                }
            }) 

    }, [])

    const renderVideo = SearchList.map((video, index)=> {

        return <Col lg={6} md={8} xs={24} key={index}>
            <div style={{ display: 'flex', flexDirection: 'column'}}>
                <Link to = {`/youtube/${video.id.videoId}`} >
                    <img style={{ width: '100%', marginBottom: '1rem'}} src={video.snippet.thumbnails.high.url} alt="비디오 썸네일" />
                </Link>
                <div style={{ display: 'flex'}}>
                    <Avatar src={`http://gravatar.com/avatar/${video.id.videoId}?d=identicon`} />
                    <span className="videoInfoTitle">{video.snippet.title}</span>
                </div>
                <span className="videoInfo"> {video.snippet.channelTitle}</span>
                <span className="videoInfo"> {moment(video.snippet.publishedAt).format("YYYY-MM-DD")}</span>
            </div>
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
