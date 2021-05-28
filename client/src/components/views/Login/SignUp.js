import React, { useState } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { useDispatch } from 'react-redux';
import { SignUpUser } from '../../../_actions/user_action'
import { withRouter } from 'react-router-dom'

function SignUp(props) {
    const dispatch = useDispatch();

    const [Password, setPassword] = useState('');
    const [ConfirmPW, setConfirmPW] = useState('');

    const layout = {
        labelCol: { span: 10 },
        wrapperCol: { span: 14 },
    };

    const tailLayout = {
        wrapperCol: { offset: 10, span: 14 },
    };

    const onPassWordHandler = (e) => {
        setPassword(e.currentTarget.value)
    }

    const onConfirmPassWordHandler = (e) => {
        setConfirmPW(e.currentTarget.value)
    }

    const onSubmitHandler = (value) => {
        // event.preventDefault(); // refresh 방지
        console.log('value: ', value);

        if (Password !== ConfirmPW) {
            return alert('비밀번호가 같지 않습니다. 다시 입력해주세요.')
        }

        dispatch(SignUpUser(value))
                .then(response => {
                    if(response.payload.success) {
                        props.history.push('/signin')
                    } else {
                        alert('Failed to sign up')
                    }
                })
    };

    return (
        <div style={{ 
                display: 'flex', justifyContent: 'center', alignItems: 'center'
                , height: '100vh' }} >
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
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password 
                        value={Password}
                        onChange={onPassWordHandler}/>
                </Form.Item>

                <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    rules={[{ required: true, message: 'Please confirm your password!' }]}
                >
                    <Input.Password 
                        value={ConfirmPW}
                        onChange={onConfirmPassWordHandler}/>
                </Form.Item>

                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        회원가입
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default withRouter(SignUp)
