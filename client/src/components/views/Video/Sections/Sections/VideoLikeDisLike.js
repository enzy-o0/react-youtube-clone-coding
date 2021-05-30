import React, { useEffect, useState } from 'react'

import Axios from 'axios'

import { Tooltip } from 'antd';
import { LikeOutlined , DislikeOutlined, LikeFilled, DislikeFilled } from '@ant-design/icons';

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

        const getLikesApi = async() => {
            try {
                const getLikesResult = await Axios.post('/api/like/getLikes', variables);
                setLikeNumber(getLikesResult.data.likes.length)

                getLikesResult.data.likes.map(like => {
                    if (like.userId === props.userId) {
                        setIsLike(true)
                    }
                })
            } catch (err) {
                alert(`좋아요 불러오기를 실패했습니다. ${err}`)
            }
        }

        const getDisLikesApi = async() => {
            try {
                const getDisLikesResult = await Axios.post('/api/like/getDisLikes', variables);
                    setDisLikeNumber(getDisLikesResult.data.dislikes.length)

                    getDisLikesResult.data.dislikes.map(dislike => {
                        if (dislike.userId === props.userId) {
                            setIsDisLike(true);
                        }
                    })
            } catch (err) {
                alert(`싫어요 불러오기를 실패했습니다., ${err}`)
            }
        }
        
        getLikesApi();
        getDisLikesApi();

    }, [])

    const onLikeClickListener = async() => {

        if (!isLike) {
            const upLikeResult = await Axios.post('/api/like/upLike', variables);

            if (upLikeResult.data.success) {
                setLikeNumber(LikeNumber + 1)
                setIsLike(true)

                if (isDisLike !== false) {
                    setDisLikeNumber(DisLikeNumber - 1)
                    setIsDisLike(false)
                }
            } else {
                alert('좋아요 누르기를 실패했습니다.')
            }
        } else {
            
            const unLikeResult = await Axios.post('/api/like/unLike', variables);
            if (unLikeResult.data.success) {
                setLikeNumber(LikeNumber - 1)
                setIsLike(false)

            } else {
                alert('좋아요 취소를 실패했습니다.')
            }
        }
    }

    const onDislikeClickListener = async() => {
        if (!isDisLike) {
            const updisLikeResult = Axios.post('/api/like/updisLike', variables);

            if (updisLikeResult.data.success) {
                setDisLikeNumber(DisLikeNumber + 1)
                setIsDisLike(true)

                if (isLike !== false) {
                    setLikeNumber(LikeNumber - 1)
                    setIsLike(false)
                }
            } else {
                alert('싫어요 누르기를 실패했습니다.')
            }
        } else {
            const undisLikeResul = Axios.post('/api/like/undisLike', variables);
            if (undisLikeResul.data.success) {
                setDisLikeNumber(DisLikeNumber - 1)
                setIsDisLike(false)

            } else {
                alert('싫어요 취소를 실패했습니다.')
            }
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
