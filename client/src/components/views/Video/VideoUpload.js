import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom'
import DropZone from 'react-dropzone'

import Axios from 'axios';

import { Typography, Button, Form, Input, message } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { PlusOutlined } from '@ant-design/icons';

import CircularProgress from '@material-ui/core/CircularProgress';

const { Title } = Typography

// const PrivateOptions = [
//     { value: 0, label: 'private'},
//     { value: 1, label: 'public '}
// ]

// const CatergoryOptions = [
//     { value: 0, label: 'Film & Animation'},
//     { value: 1, label: 'Autos & Vehicles'},
//     { value: 2, label: 'Music'},
//     { value: 3, label: 'Pets & Animals'}
// ]
function VideoUpload(props) {
    const user = useSelector(state => state.user)
    const [VideoTitle, setVideoTitle] = useState('')
    const [VideoDescription, setVideoDescription] = useState('')
    const [VideoFilePath, setVideoFilePath] = useState("")
    const [VideoDuration, setVideoDuration] = useState("")
    const [VideoThumbNailPath, setVideoThumbNailPath] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const onTitleChange = (e) => {
        setVideoTitle(e.currentTarget.value);
    }

    const onDescriptionChange = (e) => {
        setVideoDescription(e.currentTarget.value);
    }

    const renderLoading = (
        isLoading && <CircularProgress color="secondary" />
    )

    const onDrop = async(files) => {
        
        let formData = new FormData();
        const config = {
            header: {'content-type' : 'multipart/form-data'}
        }

        formData.append("file", files[0])

        const videoUpload = await Axios.post('/api/video/upload', formData, config);

        if (videoUpload.data.success) {
            let variable = {
                url: videoUpload.data.url,
                fileName: videoUpload.data.fileName
            }

            setVideoFilePath(videoUpload.data.url)
            setIsLoading(true)

            const videoThumbnail = await Axios.post('/api/video/thumbnail', variable);

            if(videoThumbnail.data.success) {
                setVideoDuration(videoThumbnail.data.fileDuration)
                setVideoThumbNailPath(videoThumbnail.data.url)
                setIsLoading(false)
            } else {
                alert('썸네일 생성에 실패했습니다.');
            }
        } else {
            alert('비디오 업로드를 실패했습니다.');
        }
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        
        const variables = {
            writer: user.userData._id,
            title: VideoTitle,
            description: VideoDescription,
            filePath: VideoFilePath,
            duration: VideoDuration,
            thumbnail: VideoThumbNailPath
        }

        const videoUploadVideo = await Axios.post('/api/video/uploadVideo', variables);

        if (videoUploadVideo.data.success) {
            message.success('성공적으로 업로드 했습니다.');

            setTimeout(() => {
                props.history.push("/");
            }, 3000)
        } else {
            alert('')
        }

    }

    return (
        <div style={{ width: '60%', margin: '5rem auto'}}>
            <div style={{ textAlign: 'center', marginBottom:'2rem'}}>
                <Title level={2}>비디오 업로드 하기</Title>
            </div>

            <Form onSubmit={onSubmit}>
                <div style={{ display:'flex', justifyContent: 'space-around'}}>
                    <DropZone
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={100000000}>
                        {({ getRootProps, getInputProps }) => (
                            <div style={{width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex',
                                alignItems:'center', justifyContent:'center'}} {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <PlusOutlined style={{ fontSize: '3rem'}} />
                            </div>
                        )}
                    </DropZone>

                    <div style={{width: '300px', height: '240px', display: 'flex',
                                alignItems:'center', justifyContent:'center'}}>
                        {renderLoading}
                        { VideoThumbNailPath && <img src={process.env.NODE_ENV === 'development' ? `http://localhost:5000/${VideoThumbNailPath}`
                            : `https://aztubes.herokuapp.com/${VideoThumbNailPath}`} alt="videoThumbNail" />}
                    </div>
                </div>

                <br/>
                <br/>
                <label>제목</label>
                <Input onChange={onTitleChange} value={VideoTitle} />

                <br/>
                <br/>
                <label>설명</label>
                <TextArea onChange={onDescriptionChange} value={VideoDescription} />

                <br/>
                <br/>
                {/* <select onChange={onPrivateChange}>
                    {PrivateOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>))}

                </select>

                <br/>
                <br/>
                <select onChange={onCategoryChange}>
                    {CatergoryOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>))}

                </select>

                <br/>
                <br/> */}
                <Button type="primary" size="large" onClick={onSubmit}>
                    영상 업로드
                </Button>

            </Form>
        </div>
    )
}

export default withRouter(VideoUpload)
