import React from 'react'
import { Layout, Row, Menu, Space, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { AuthActionCreators } from '../store/reducers/auth/action-creators';
import styled from 'styled-components';

const UserName = styled.div`
    color: white;
    max-width: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Header = () => {
    const dispatch = useDispatch();
    const { isAuth, user } = useSelector(state => state.auth);

    return (
        <Layout.Header>
            <Row justify="end">
                {
                    isAuth &&
                    <Space>
                        <Avatar icon={<UserOutlined />} />
                        <UserName>{user.email}</UserName>
                        <Menu theme="dark" mode="inline" inlineCollapsed={false} selectable={false}>
                            <Menu.Item key={1} onClick={() => dispatch(AuthActionCreators.logout())}>
                                Logout
                            </Menu.Item>
                        </Menu>
                    </Space>
                }
            </Row>
        </Layout.Header>
    )
}

export default Header;
