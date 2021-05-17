import React, { useEffect, useState } from 'react'
import SingleComment from './VideoCommentSingle'

function VideoCommentReply(props) {

    const [childCommentNumber, setchildCommentNumber] = useState(0)
    const [OpenReplyComments, setOpenReplyComments] = useState(false)

    useEffect(() => {
        
        let commentNumber = 0;
        
        props.commentList && props.commentList.map((comment) => {
            
            if (comment.responseTo === props.parentCommentId) {
                commentNumber++;
            }
        })

        setchildCommentNumber(commentNumber)
    }, [props.commentList, props.parentCommentId])

    const renderReplyComment = (parentCommentId) => 
        props.commentList.map((comment, index) => (
            <React.Fragment>
                {comment.responseTo === parentCommentId &&
                    <div style={{ width: '80%', marginLeft: '40px'}}>
                        <SingleComment refreshFunction={props.refreshFunction} key={index} comment={comment} videoId={props.videoId}/> 
                        <VideoCommentReply refreshFunction={props.refreshFunction} parentCommentId={comment._id} videoId={props.videoId} commentList={props.commentList} />
                    </div>
                }
            </React.Fragment>
        ))
    

    const onViewChildClick = () => {
        setOpenReplyComments(!OpenReplyComments)
        console.log(OpenReplyComments)
        console.log(props.parentCommentId)
    }

    return (
        <div>
            { childCommentNumber > 0 &&  
                <p style={{ fontSize: '14px', margin : 0, color: 'gray', marginBottom: '0.5rem' }} onClick={onViewChildClick}>
                    View {childCommentNumber} more comment(s)
                </p>
            }
        

            {OpenReplyComments &&
                renderReplyComment(props.parentCommentId)
            }
        </div>
    )
}

export default VideoCommentReply
