import React, { useState } from 'react'
import { Typography, Button, Form, Input, message } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import DropZone from 'react-dropzone'
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom'

const { Title } = Typography

const PrivateOptions = [
    { value: 0, label: 'private'},
    { value: 1, label: 'public '}
]

const CatergoryOptions = [
    { value: 0, label: 'Film & Animation'},
    { value: 1, label: 'Autos & Vehicles'},
    { value: 2, label: 'Music'},
    { value: 3, label: 'Pets & Animals'}
]
function VideoUpload(props) {
    const user = useSelector(state => state.user)
    const [VideoTitle, setVideoTitle] = useState('')
    const [VideoDescription, setVideoDescription] = useState('')
    const [VideoPrivate, setVideoPrivate] = useState(0)
    const [VideoCategory, setVideoCategory] = useState("Film & Animation")
    const [VideoFilePath, setVideoFilePath] = useState("")
    const [VideoDuration, setVideoDuration] = useState("")
    const [VideoThumbNailPath, setVideoThumbNailPath] = useState("")

    const onTitleChange = (e) => {
        setVideoTitle(e.currentTarget.value);
    }

    const onDescriptionChange = (e) => {
        setVideoDescription(e.currentTarget.value);
    }

    const onPrivateChange = (e) => {
        setVideoPrivate(e.currentTarget.value);
    }

    const onCategoryChange = (e) => {
        setVideoCategory(e.currentTarget.value);
    }

    const onDrop = (files) => {
        
        let formData = new FormData();
        const config = {
            header: {'content-type' : 'multipart/form-data'}
        }

        formData.append("file", files[0])
        console.log(files[0])

        axios.post('/api/video/upload', formData, config)
            .then(response=> {
                if (response.data.success) {
                    console.log(response.data);

                    let variable = {
                        url: response.data.url,
                        fileName: response.data.fileName
                    }

                    setVideoFilePath(response.data.url)

                    axios.post('/api/video/thumbnail', variable)
                        .then(response => {
                            if(response.data.success) {
                                console.log(response.data);
                                setVideoDuration(response.data.fileDuration)
                                setVideoThumbNailPath(response.data.url)

                            } else {
                                console.log(response);
                                alert('썸네일 생성에 실패했습니다.');
                            }
                        })
                } else {
                    alert('비디오 업로드를 실패했습니다.');
                }
            }) 
    }

    const onSubmit = (e) => {
        e.preventDefault();
        
        const variables = {
            writer: user.userData._id,
            title: VideoTitle,
            description: VideoDescription,
            privacy: VideoPrivate,
            filePath: VideoFilePath,
            category: VideoCategory,
            duration: VideoDuration,
            thumbnail: VideoThumbNailPath
        }

        axios.post('/api/video/uploadVideo', variables)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data);
                    if (response.data.success) {
                        message.success('성공적으로 업로드 했습니다.');

                        setTimeout(() => {
                            props.history.push("/");
                        }, 3000)
                    } else {
                        alert('Log Out Failed')
                    }

                } else {
                    alert('비디오 업로드에 실패 했습니다.');
                }
            })
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto'}}>
            <div style={{ textAlign: 'center', marginBottom:'2rem'}}>
                <Title level={2}>Upload Video</Title>
            </div>

            <Form onSubmit={onSubmit}>
                <div style={{ display:'flex', justifyContent: 'space-between'}}>
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

                    <div>
                        {
                            VideoThumbNailPath && 
                            <img src={`http://localhost:5000/${VideoThumbNailPath}`} alt="videoThumbNail" />
                        }
                    </div>
                </div>

                <br/>
                <br/>
                <label>Title</label>
                <Input onChange={onTitleChange} value={VideoTitle} />

                <br/>
                <br/>
                <label>Description</label>
                <TextArea onChange={onDescriptionChange} value={VideoDescription} />

                <br/>
                <br/>
                <select onChange={onPrivateChange}>
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
                <br/>
                <Button type="primary" size="large" onClick={onSubmit}>
                    Upload
                </Button>

            </Form>
        </div>
    )
}

export default withRouter(VideoUpload)