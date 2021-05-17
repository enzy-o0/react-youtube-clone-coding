import React, {useEffect, useState } from 'react'
import axios from 'axios'

function VideoSubscribe(props) {
    
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

        axios.post('/api/subscribe/count', variabelsCount)
            .then(response => {
                if(response.data.success) {
                    console.log(response.data);
                    setSubscribeNumber(response.data.subscribeNumber)
                } else {
                    alert('구독자 수를 받아오기를 실패했습니다.');
                }
            }) 

        axios.post('/api/subscribe/isSubscribe', variabels)
        .then(response => {
            if(response.data.success) {
                console.log(response.data);
                setIsSubscribe(response.data.isSubscribe)
            } else {
                alert('구독 여부를 받아오지 못했습니다.');
            }
        }) 
    }, [])

    const onSubscribe = () => {

        if (IsSubscribe) {
            axios.post('/api/subscribe/cancel', variabels)
                .then(response => {
                    if(response.data.success) {
                        console.log(response.data);
                        setIsSubscribe(!IsSubscribe);
                        setSubscribeNumber(SubscribeNumber - 1);
                    } else {
                        alert('구독 취소가 실패하였습니다.')
                    }
                })

        } else {
            axios.post('/api/subscribe/add', variabels)
            .then(response => {
                if(response.data.success) {
                    console.log(response.data);
                    setIsSubscribe(!IsSubscribe);
                    setSubscribeNumber(SubscribeNumber + 1);
                } else {
                    alert('구독하기가 실패하였습니다.')
                }
            })
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
