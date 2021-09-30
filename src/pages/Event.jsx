import React, { useEffect, useState } from 'react'
import { Layout, Row, Button, Modal, message, Affix, Tooltip, ConfigProvider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { EventActionCreators } from "../store/reducers/event/action-creators";
import { useDispatch, useSelector } from "react-redux";
import EventCalendar from '../components/EventsCalendar';
import EventForm from '../components/EventForm';
import 'moment/locale/ru';
import locale from 'antd/lib/locale/ru_RU';


const Event = () => {
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const { events } = useSelector(state => state.event);

    useEffect(() => {
        dispatch(EventActionCreators.getEvents());
    }, [])

    const submitForm = newEvent => {
        setModalVisible(false);
        dispatch(EventActionCreators.addEvent(newEvent));
        dispatch(EventActionCreators.uploadEvents());
        message.success("Событие добавлено");
    }

    return (
        <Layout>
            <ConfigProvider locale={locale}>
                <Row justify="center" >
                    <EventCalendar events={events} />
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

            <Affix style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 10 }} >
                <Tooltip placement="left" title="Добавить новое событие">
                    <Button
                        type="primary"
                        size="large"
                        shape="circle"
                        onClick={() => setModalVisible(true)}
                        icon={<PlusOutlined />}
                    />
                </Tooltip>
            </Affix>
        </Layout>
    )
}

export default Event;
