import React,  { useState } from 'react'
import { useSelector } from 'react-redux';
import { Button, Input } from 'antd';
import axios from 'axios';
// import { useSelector } from 'react-redux'
import SingleComment from './Sections/VideoCommentSingle'
import ReplyComment from './Sections/VideoCommentReply'

const { TextArea } = Input;

function VideoComment(props) {
    const videoId = props.videoId // 각 컴포넌트에서도 주소참조 가능
    
    const [commendValue, setCommendValue] = useState("")
    const user = useSelector(state => state.user);

    const onTextAreaHandler = (event) => {
        setCommendValue(event.currentTarget.value);
    }

    const variables = {
        content: commendValue,
        writer: localStorage.getItem('userId'), 
        videoId: videoId
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        axios.post('/api/video/saveComment', variables)
            .then(response => {
                if(response.data.success) {
                    console.log(response.data)
                    setCommendValue("")
                    props.refreshFunction(response.data.result)
                } else {
                    alert('코멘트 입력을 실패하였습니다.');
                }
            })
    }

    const isLogin = () => {
        if (user.userData && !user.userData.isAuth) {
            return (
                <form style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <TextArea rows={2}
                    style={{ width: '80%', borderRadius: '5px'}}
                    onChange={onTextAreaHandler}
                    value={commendValue}
                    placeholder="로그인을 해주세요" />
        
                    <br />
                    <Button style={{ width: '18%', height: '52px '}} >댓글</Button>
                </form>
            )
        } else {
            return (
                <form style={{ display: 'flex', justifyContent: 'space-between'}} onSubmit={onSubmitHandler}>
                    <TextArea rows={2}
                        style={{ width: '80%', borderRadius: '5px'}}
                        onChange={onTextAreaHandler}
                        value={commendValue}
                        placeholder="코멘트를 작성해주세요" />

                    <br />
                    <Button style={{ width: '18%', height: '52px '}} onClick={onSubmitHandler}>댓글</Button>
                </form>  
            )
        }
    }

    return (
        <div>
            <br />
            <p> Replies </p>
            <hr/>

            { props.commentList && props.commentList.map((comment, index) => (
                (!comment.responseTo && 
                    <React.Fragment>
                        <SingleComment refreshFunction={props.refreshFunction} key={index} comment={comment} videoId={videoId}/> 
                        <ReplyComment refreshFunction={props.refreshFunction} parentCommentId={comment._id} videoId={videoId} commentList={props.commentList} />
                    </React.Fragment>
                )
            ))}

            {isLogin()}
        </div>
    )
}

export default VideoComment
