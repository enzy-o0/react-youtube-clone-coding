import React, {useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Axios from 'axios'

function VideoSubscribe(props) {
    const user = useSelector(state => state.user);

    const [SubscribeNumber, setSubscribeNumber] = useState(0)
    const [IsSubscribe, setIsSubscribe] = useState(false)

    const variabelsCount = {
        userTo: props.userTo
    }

    const variabels = {
        userTo: props.userTo,
        userFrom: localStorage.getItem('userId')
    }


    useEffect(() => {

        const subscribeCountApi = async() => {
            const subscribeCountResult = await Axios.post('/api/subscribe/count', variabelsCount);
            console.log(subscribeCountResult);

            if(subscribeCountResult.data.success) {
                setSubscribeNumber(subscribeCountResult.data.subscribeNumber)
            } else {
                alert('구독자 수를 받아오기를 실패했습니다.');
            }
        } 

        const subscribeisSubscribeApi = async() => {
            const subscribeisSubscribeResult = await Axios.post('/api/subscribe/isSubscribe', variabels)
            if(subscribeisSubscribeResult.data.success) {
                setIsSubscribe(subscribeisSubscribeResult.data.isSubscribe)
            } else {
                alert('구독 여부를 받아오지 못했습니다.');
            }
        } 

        subscribeCountApi();
        subscribeisSubscribeApi();
    }, [])

    const onSubscribe = async () => {
        if (user.userData && !user.userData.isAuth) {
            alert('로그인이 필요한 서비스입니다.');
            return;
        } 
        if (IsSubscribe) {
            const subscribeCancelResult = await Axios.post('/api/subscribe/cancel', variabels);

            if(subscribeCancelResult.data.success) {
                setIsSubscribe(!IsSubscribe);
                setSubscribeNumber(SubscribeNumber - 1);
            } else {
                alert('구독 취소가 실패하였습니다.')
            }

        } else {
            const subscribeAddResult = await Axios.post('/api/subscribe/add', variabels);

            if(subscribeAddResult.data.success) {
                setIsSubscribe(!IsSubscribe);
                setSubscribeNumber(SubscribeNumber + 1);
            } else {
                alert('구독하기가 실패하였습니다.')
            }
        }
    }

    return (
        <button style={{ height: '50px', backgroundColor: `${IsSubscribe ? '#AAAA' : '#CC0000'}`, borderRadius:'10px', borderStyle: 'none', color: '#fff', padding: '0 1rem', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'}} 
            onClick={onSubscribe}>
            {SubscribeNumber} {IsSubscribe ? 'Subscribed' : 'Subscribe'}
        </button>
    )
}

export default VideoSubscribe
