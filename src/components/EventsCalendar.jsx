import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, Modal, List, Radio, Row } from "antd";
import moment from 'moment';
import styled from 'styled-components';
import { eventStatus } from '../enums';
import { EventActionCreators } from '../store/reducers/event/action-creators';



const SmallEventsListUl = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
`;

const SmallEventsListLi = styled.li.attrs(props => ({
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
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    function dateCellRender(value) {
        const formatedDate = value.format('YYYY-MM-DD');
        const currentDayEvents = events.filter(el => el.date === formatedDate);
        const isPastEvents = value.isSameOrBefore(moment());
        return (
            <SmallEventsListUl>
                {currentDayEvents.map((el, i) =>
                    <SmallEventsListLi
                        isPastEvents={isPastEvents}
                        status={el.status}
                        key={i}
                    >
                        {el.description}
                    </SmallEventsListLi>
                )}
            </SmallEventsListUl>
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
        }
    }

    const changeStatus = (e, item) => {
        const newEvents = events.slice();
        newEvents[item.id].status = e.target.value;
        dispatch(EventActionCreators.setEvents(newEvents));
        dispatch(EventActionCreators.uploadEvents(user, newEvents));
    }

    return (
        <>
            <Calendar
                fullscreen={true}
                style={{ width: "800px" }}
                dateCellRender={dateCellRender}
                onSelect={selectDate}
            />
            <Modal
                title="Список событий"
                visible={modalVisible}
                footer={null}
                onCancel={() => setModalVisible(false)}
            >
                <List
                    itemLayout="horizontal"
                    dataSource={selectedEvents}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta key={item.id} />
                            {item.description}
                            <Row justify="end">
                                <Radio.Group size="small" defaultValue={item.status} onChange={e => changeStatus(e, item)}>
                                    <Radio.Button value={eventStatus.PLANNED}>Planned</Radio.Button>
                                    <Radio.Button value={eventStatus.DONE}>Done</Radio.Button>
                                    <Radio.Button value={eventStatus.CANCELLED}>Cancelled</Radio.Button>
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
