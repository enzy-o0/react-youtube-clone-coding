import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { auth } from '../_actions/user_action';

export default function (SpecificComponent, option, adminRoute = null) {

    // option 종류
    // null => 아무나 출입이 가능한 페이지
    // true => 로그인한 유저만 출입이 가능한 페이지
    // false => 로그인한 유저는 출업 불가능한 페이지


    function AutenticationCheck(props) {

        let user = useSelector(state => state.user);
        const dispatch = useDispatch();

        useEffect(() => {

            const dispatchAuth = async() => {
                const dispatchResult = await dispatch(auth());
                if (!dispatchResult.payload.isAuth) {
                    if (option){
                        props.history.push('/signIn')
                    }
                } else {
                    // 로그인 안한 상태
                    if (adminRoute && !dispatchResult.payload.isAdmin) {
                        props.history.push('/')
                    } else {
                        if (option === false) {
                            props.history.push('/')
                        }
                    }
                }
            }     

            dispatchAuth();
        }, []) 

        return(
            <SpecificComponent {...props} user={user} />
        )
    }

    return AutenticationCheck
}