import React, { useEffect, useState } from 'react'
import { Tooltip } from 'antd';
import axios from 'axios'
import { LikeOutlined , DislikeOutlined, LikeFilled, DislikeFilled, FastForwardOutlined } from '@ant-design/icons';

function VideoLikeDisLike(props) {

    const [LikeNumber, setLikeNumber] = useState(0)
    const [isLike, setIsLike] = useState(false)
    const [DisLikeNumber, setDisLikeNumber] = useState(0)
    const [isDisLike, setIsDisLike] = useState(false)

    let variables = { }

    if (props.video) {
        variables = { videoId: props.videoId, userId: props.userId }
    } else {
        variables = { commentId: props.commentId, userId: props.userId}
    }

    useEffect(() => {
        
        axios.post('/api/like/getLikes', variables)
            .then(response => {
                if(response.data.success) {
                    setLikeNumber(response.data.likes.length)

                    response.data.likes.map(like => {
                        if (like.userId === props.userId) {
                            setIsLike(true)
                        }
                    })
                } else {
                    alert('좋아요 불러오기를 실패했습니다.')
                }
            });

            axios.post('/api/like/getDisLikes', variables)
                .then(response => {
                    if(response.data.success) {
                        setDisLikeNumber(response.data.dislikes.length)

                        response.data.dislikes.map(dislike => {
                            if (dislike.userId === props.userId) {
                                setIsDisLike(true);
                            }
                        })
                    } else {
                        alert('싫어요 불러오기를 실패했습니다.')
                    }
                });

    }, [])

    const onLikeClickListener = () => {

        if (!isLike) {
            axios.post('/api/like/upLike', variables)
                .then(response => {
                    if (response.data.success) {
                        setLikeNumber(LikeNumber + 1)
                        setIsLike(true)

                        if (isDisLike !== false) {
                            setDisLikeNumber(DisLikeNumber - 1)
                            setIsDisLike(false)
                        }
                    } else {
                        alert('좋아요 누르기를 실패했습니다.')
                    }
                })
        } else {
            axios.post('/api/like/unLike', variables)
                .then(response => {
                    if (response.data.success) {
                        setLikeNumber(LikeNumber - 1)
                        setIsLike(false)

                    } else {
                        alert('좋아요 취소를 실패했습니다.')
                    }
                })
        }
    }

    const onDislikeClickListener = () => {
        if (!isDisLike) {
            axios.post('/api/like/updisLike', variables)
                .then(response => {
                    if (response.data.success) {
                        setDisLikeNumber(DisLikeNumber + 1)
                        setIsDisLike(true)

                        if (isLike !== false) {
                            setLikeNumber(LikeNumber - 1)
                            setIsLike(false)
                        }
                    } else {
                        alert('좋아요 누르기를 실패했습니다.')
                    }
                })
        } else {
            axios.post('/api/like/undisLike', variables)
                .then(response => {
                    if (response.data.success) {
                        setDisLikeNumber(DisLikeNumber - 1)
                        setIsDisLike(false)

                    } else {
                        alert('좋아요 취소를 실패했습니다.')
                    }
                })
        }
    }

  
    return (
        <div>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    { isLike ?  <LikeFilled onClick={onLikeClickListener} /> : <LikeOutlined onClick={onLikeClickListener} />}
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor:'auto' }}> {LikeNumber} </span>
            </span>

            <span key="comment-basic-dislike" style={{ marginLeft: '0.5rem'}}> 
                <Tooltip title="Dislike">
                    { isDisLike ?  <DislikeFilled onClick={onDislikeClickListener} /> : <DislikeOutlined  onClick={onDislikeClickListener} />}
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor:'auto' }}> {DisLikeNumber} </span>
            </span>
            
        </div>
    )
}

export default VideoLikeDisLike
