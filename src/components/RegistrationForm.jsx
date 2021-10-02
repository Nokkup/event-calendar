import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button } from "antd";
import { AuthActionCreators } from "../store/reducers/auth/action-creators";
import { Link } from 'react-router-dom';


const RegistrationForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isLoading } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const submitForm = () => {
        dispatch(AuthActionCreators.registration(email, password))
    }

    return (
        <Form name="registration" onFinish={submitForm} >

            <Form.Item name="email" rules={[{ required: true, message: "Введите email" }]} >
                <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            </Form.Item>

            <Form.Item name="password" rules={[{ required: true, message: "Введите пароль" }]} >
                <Input.Password value={password} placeholder="Password" onChange={e => setPassword(e.target.value)} />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading} style={{ width: "100%" }}>Registration</Button>
                <span>Or </span>
                <Link to="/login">login</Link>
            </Form.Item>

        </Form>
    )
}

export default RegistrationForm;
