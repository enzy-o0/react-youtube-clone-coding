import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { useDispatch } from 'react-redux';
import { SignInUser } from '../../../_actions/user_action'
import { withRouter } from 'react-router-dom'

function SignIn(props) {
    const dispatch = useDispatch();

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    const onSubmitHandler = (value) => {
        // event.preventDefault(); // refresh 방지
        console.log('value: ', value);


        dispatch(SignInUser(value))
                .then(response => {
                    if(response.payload.signInSuccess) {
                        props.history.push('/')
                    } else {
                        alert('Error')
                    }
                })
    };

    return (
        <div style={{ 
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh' }} >
            <Form
            {...layout}
            name="basic"
            initialValues={{ remember: false }}
            onFinish={onSubmitHandler}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        로그인
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default withRouter(SignIn)
