import React from 'react'
import { Button } from 'antd'
import axios from 'axios';
import { withRouter } from 'react-router-dom'

function Main(props) {

    const onLogOutHandler = () => {
        axios.get('/api/logout')
        .then(response => {
            if(response.data.logoutSuccess) {
                props.history.push('/signin')
            } else {
                alert('Logout Failed')
            }
        })
    }
    return (
        <div style={{ 
            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'}}>
            <h2>Main</h2>

            <Button onClick={onLogOutHandler}>
                로그아웃
            </Button>
        </div>
    )
}

export default withRouter(Main)
