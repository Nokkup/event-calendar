
import React from 'react';
import { Layout, Row, Space } from 'antd';

const Footer = () => {
    return (
        <Layout.Footer>
            <Row justify="center">
                <Space>
                    <span>©2021</span>
                    <a href="https://github.com/Nokkup/event-calendar">Github</a>
                </Space>
            </Row>
        </Layout.Footer>
    )
}

export default Footer;
