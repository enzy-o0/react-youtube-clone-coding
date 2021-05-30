import React from 'react'
import { withRouter, Link} from 'react-router-dom'
import { useDispatch } from 'react-redux';

import { SignInUser } from '../../../_actions/user_action'

import { Form, Input, Button } from 'antd';

function SignIn(props) {
    const dispatch = useDispatch();

    // const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;
    // const [rememberMe, setRememberMe] = useState(rememberMeChecked)

    // const initial = localStorage.getItem("rememberMe") ? localStorage.getItem("rememberMe") : '';

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const tailLayout = {
        wrapperCol: { offset: 10, span: 20 },
    };

    const onSubmitHandler = async(value) => {
        // event.preventDefault(); // refresh 방지
        
        const result = await dispatch(SignInUser(value));

        if(result.payload.success) {
            window.localStorage.setItem('userId', result.payload.userId);
            props.history.push('/')
        } else {
            alert('로그인 에러');
        }

    };

    
    // const rememberMeHandler = () => {
    //     setRememberMe(!rememberMe)
    // };

    return (
        <div style={{ 
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh' }} >
            <Form
            {...layout}
            initialValues={{ email:'test@test.com', password: '000000' }}
            name="basic"
            onFinish={onSubmitHandler}
            >
                <Form.Item
                    label="이메일"
                    name="email"
                    rules={[{ required: true, message: '이메일을 입력해주세요.' }]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="비밀번호"
                    name="password"
                    rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}
                >
                    <Input.Password />
                </Form.Item>

                {/* <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                    <Checkbox onChange={rememberMeHandler} checked={rememberMe}>아이디 저장하기</Checkbox>
                </Form.Item> */}

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        로그인
                    </Button>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <span> 아이디가 없다면? </span>
                    <br />
                    <Link to="/signup">회원가입 하러가기</Link>
                </Form.Item>
            </Form>
        </div>
    )
}

export default withRouter(SignIn)
