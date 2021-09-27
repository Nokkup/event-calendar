import { Layout, Row, Button, Modal, message, Affix, Tooltip, ConfigProvider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react'
import EventCalendar from '../components/EventsCalendar';
import EventForm from '../components/EventForm';
import { EventActionCreators } from "../store/reducers/event/action-creators";
import { useDispatch, useSelector } from "react-redux";
import 'moment/locale/ru';
import locale from 'antd/lib/locale/ru_RU';


const Event = () => {
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const { events } = useSelector(state => state.event);
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(EventActionCreators.getEvents(user));
    }, [])

    const submitForm = (newEvent) => {
        setModalVisible(false);
        dispatch(EventActionCreators.uploadEvents(user, events, newEvent));
        message.success("Событие добавлено");
    }

    return (
        <>
            <Layout>
                <ConfigProvider locale={locale}>
                    <Row justify="center" >
                        <EventCalendar events={events} />
                    </Row>
                    <Row justify="center">
                    </Row>
                    <Modal
                        title="Добавить новое событие"
                        visible={modalVisible}
                        footer={null}
                        onCancel={() => setModalVisible(false)}
                    >
                        <EventForm submit={submitForm} />
                    </Modal>
                </ConfigProvider>
            </Layout>
            <Affix style={{ position: 'fixed', bottom: 20, right: 20 }} >
                <Tooltip placement="left" title="Добавить новое событие">
                    <Button
                        type="primary"
                        size="large"
                        shape="circle"
                        onClick={() => setModalVisible(!modalVisible)}
                        icon={<PlusOutlined />}
                    >
                    </Button>
                </Tooltip>
            </Affix>
        </>
    )
}

export default Event;
