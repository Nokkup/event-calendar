import React from 'react';
import { Layout, Card } from 'antd';
import RegistrationForm from '../components/RegistrationForm';
import styled from 'styled-components';

const StyledRegistrationWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 128px);
`;

const Registration = () => {
    return (
        <Layout>
            <StyledRegistrationWrapper>
                <Card>
                    <RegistrationForm />
                </Card>
            </StyledRegistrationWrapper>
        </Layout>
    )
}

export default Registration;
