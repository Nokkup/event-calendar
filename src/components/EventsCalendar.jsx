import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Calendar, Modal, List, Radio, Row, Typography, message } from "antd";
import { CheckOutlined, CloseOutlined, ClockCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import styled from 'styled-components';
import { eventStatus } from '../enums';
import { EventActionCreators } from '../store/reducers/event/action-creators';


const SmallEventsList = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
`;

const SmallEventsListItem = styled.li.attrs(props => ({
    className: props.status
}))`
    width: 100%;
    overflow: hidden;
    font-size: 14px;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: ${props => props.isPastEvents ? "lightblue" : "blue"};

    ::before {
        content: "● ";
    }

    &.done {
        ::before {
            color: green;
        }
    }

    &.cancelled {
        ::before {
            color: red;
        }
    }

    &.planned {
        ::before {
            color: gold;
        }
    }
`;


const EventCalendar = ({ events }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedEvents, setSelectedEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const dispatch = useDispatch();

    const dateCellRender = value => {
        const formatedDate = value.format('YYYY-MM-DD');
        const currentDayEvents = events.filter(el => el.date === formatedDate);
        const isPastEvents = value.isSameOrBefore(moment());
        return (
            <SmallEventsList>
                {currentDayEvents.map((el, i) =>
                    <SmallEventsListItem
                        isPastEvents={isPastEvents}
                        status={el.status}
                        key={i}
                    >
                        {el.description}
                    </SmallEventsListItem>
                )}
            </SmallEventsList>
        );
    }

    const selectDate = value => {
        const formatedDate = value.format('YYYY-MM-DD');
        const currentEvents = events
            .map((el, i) => { return { ...el, id: i } })
            .filter(el => el.date === formatedDate);
        if (currentEvents.length > 0) {
            setModalVisible(true);
            setSelectedEvents(currentEvents);
            setSelectedDate(formatedDate);
        }
    }

    const changeStatus = (e, item) => {
        const newStatus = e.target.value;
        const newEvents = events.slice();
        const newSelectedEvents = selectedEvents
            .map(el => el.id === item.id ? { ...el, status: newStatus } : el);

        newEvents[item.id].status = newStatus;
        setSelectedEvents(newSelectedEvents);

        dispatch(EventActionCreators.setEvents(newEvents));
        dispatch(EventActionCreators.uploadEvents());
    }

    const changeDescription = (newDescription, item) => {
        if (newDescription.length) {
            const newEvents = events.slice();
            const newSelectedEvents = selectedEvents
                .map(el => el.id === item.id ? { ...el, description: newDescription } : el);

            newEvents[item.id].description = newDescription;
            setSelectedEvents(newSelectedEvents);

            dispatch(EventActionCreators.setEvents(newEvents));
            dispatch(EventActionCreators.uploadEvents());
        }
        else {
            message.error("Добавьте описание");
        }
    }

    return (
        <>
            <Calendar
                fullscreen={true}
                style={{ width: "800px", zIndex: 1 }}
                dateCellRender={dateCellRender}
                onSelect={selectDate}
            />
            <Modal
                title={`События на ${selectedDate}`}
                visible={modalVisible}
                footer={null}
                onCancel={() => setModalVisible(false)}
            >
                <List
                    itemLayout="vertical"
                    dataSource={selectedEvents}
                    pagination={{ pageSize: 3 }}
                    renderItem={item => (
                        <List.Item key={item.id}>
                            <Typography.Paragraph
                                editable={{ onChange: (value) => changeDescription(value, item) }}
                                style={{ width: "100%" }}
                            >
                                {item.description}
                            </Typography.Paragraph>

                            <Row justify="end">
                                <Radio.Group
                                    size="small"
                                    buttonStyle="solid"
                                    value={item.status}
                                    onChange={e => changeStatus(e, item)}
                                >
                                    <Radio.Button value={eventStatus.PLANNED}><ClockCircleOutlined /></Radio.Button>
                                    <Radio.Button value={eventStatus.DONE}><CheckOutlined /></Radio.Button>
                                    <Radio.Button value={eventStatus.CANCELLED}><CloseOutlined /></Radio.Button>
                                </Radio.Group>
                            </Row>

                        </List.Item>
                    )}
                />
            </Modal>
        </>
    )
}

export default EventCalendar;
