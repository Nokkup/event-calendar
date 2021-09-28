import React, { createRef, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, Button, Tooltip } from "antd";
import { AuthActionCreators } from "../store/reducers/auth/action-creators";
import { Link } from 'react-router-dom';


const LoginForm = () => {

    const { isLoading } = useSelector(state => state.auth);
    const [form] = Form.useForm();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const formRef = createRef();
    const dispatch = useDispatch();

    const submitForm = () => {
        dispatch(AuthActionCreators.login(email, password));
    }

    const fillForm = () => {
        const [email, password] = ["test@test.test", "testpass"];
        form.setFieldsValue({ email, password });
        setEmail(email);
        setPassword(password);
    }

    return (
        <Form name="login" ref={formRef} form={form} onFinish={submitForm} >

            <Form.Item name="email" rules={[{ required: true, message: "Введите email" }]} >
                <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            </Form.Item>

            <Form.Item name="password" rules={[{ required: true, message: "Введите пароль" }]} >
                <Input.Password value={password} placeholder="Password" onChange={e => setPassword(e.target.value)} />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading} style={{ width: "100%" }}>Login</Button>
                <span>Or </span>
                <Link to="/registration">register</Link>
            </Form.Item>

            <Tooltip title="тестовый пользователь">
                <Button type="dashed" htmlType="button" onClick={() => fillForm()}>test user</Button>
            </Tooltip>

        </Form>
    )
}

export default LoginForm;
