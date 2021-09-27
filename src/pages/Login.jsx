import React from 'react';
import { Layout, Card } from 'antd';
import LoginForm from '../components/LoginForm';
import styled from 'styled-components';

const StyledLoginWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 128px);
`;

const Login = () => {
    return (
        <Layout>
            <StyledLoginWrapper>
                <Card>
                    <LoginForm />
                </Card>
            </StyledLoginWrapper>
        </Layout>
    )
}

export default Login;
