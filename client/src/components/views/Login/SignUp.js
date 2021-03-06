import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import { Form, Input, Button, Checkbox } from 'antd';
import { SignUpUser } from '../../../_actions/user_action'

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

    const onSubmitHandler = async(value) => {
        // event.preventDefault(); // refresh 방지

        if (Password !== ConfirmPW) {
            return alert('비밀번호가 같지 않습니다. 다시 입력해주세요.')
        }

        const result = await dispatch(SignUpUser(value));

        if(result.payload.success) {
            props.history.push('/signin')
        } else {
            alert('회원가입 에러');
        }
        
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
                    rules={[{ required: true, message: '이메일을 입력해주세요.' }]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: '이름을 입력해주세요.' }]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}
                >
                    <Input.Password 
                        value={Password}
                        onChange={onPassWordHandler}/>
                </Form.Item>

                <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    rules={[{ required: true, message: '비밀번호를 확인해주세요.' }]}
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
