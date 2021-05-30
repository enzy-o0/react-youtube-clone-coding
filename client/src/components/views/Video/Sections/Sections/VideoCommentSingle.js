import React, { useState } from 'react'

import Axios from 'axios';

import LikeDislike from './VideoLikeDisLike';

import { Comment, Avatar, Input, Button } from 'antd';
const { TextArea } = Input;

function VideoCommentSingle(props) {

    // const user = useSelector(state => state.user) // 리덕스에서 가져오기

    const [commentValue, setCommentValue] = useState("")    
    const [openReply, setopenReply] = useState(false)

    const onTextAreaHandler = (event) => {
        setCommentValue(event.currentTarget.value);
    }

    const variables = {
        content: commentValue,
        writer: localStorage.getItem('userId'), 
        videoId: props.videoId,
        responseTo: props.comment._id
    }

    const onSubmitHandler = async(event) => {
        event.preventDefault();

        const saveCommentResult = await Axios.post('/api/video/saveComment', variables);
        
        if(saveCommentResult.data.success) {
            console.log(saveCommentResult.data)
            setCommentValue("")
            setopenReply(!openReply)
            props.refreshFunction(saveCommentResult.data.result)
        } else {
            alert('코멘트 입력을 실패하였습니다.');
        }
    }

    const onReplyOpenHandler = (event) => {
        setopenReply(!openReply)
    }

    const actions= [
        <LikeDislike comment commentId={props.comment._id} useId={localStorage.getItem('userId')} />,
        <span style={{marginLeft: '0.5rem', fontWeight: '600'}} key="comment-nested-reply-to" onClick={onReplyOpenHandler}>Reply to</span>
    ]

    return (
        <div>
            <Comment
                actions={actions}
                author={props.comment.writer.name}
                avatar={
                <Avatar
                    src={props.comment.writer.image}
                    alt="유저 이미지"
                />
            }
                content={<p>{props.comment.content}</p>}>
                    
            </Comment>
            {openReply && 
                <form style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems:'flex-end', marginBottom: '20px'}} onSubmit>
                    <TextArea rows={2}
                        style={{ borderRadius: '5px'}}
                        onChange={onTextAreaHandler}
                        value={commentValue}
                        placeholder="코멘트를 작성해주세요" />
                    <Button style={{ width: '5rem', height: '52px',  borderRadius: '5px', marginTop: '0.5rem'}} onClick={onSubmitHandler}>submit</Button>
                </form>
            }
            
        </div>
    
    );
}

export default VideoCommentSingle
