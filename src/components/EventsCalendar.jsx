import React, { useState } from 'react';
import { Calendar, Modal } from "antd";
import moment from 'moment';
import styled from 'styled-components';

const EventsList = styled.ul`
    margin: 0;
    padding: 0;
    list-style: inside;
    list-style-type: circle;

    li {
        width: 100%;
        overflow: hidden;
        font-size: 14px;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .past-date {
        color: lightblue;
    }

    .future-date {
        color: blue;
    }
`;


const EventCalendar = ({ events }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedEvents, setSelectedEvents] = useState([]);

    function dateCellRender(value) {
        const formatedDate = value.format('YYYY-MM-DD');
        const currentDayEvents = events.filter(el => el.date === formatedDate);
        let isPastEvents = value.isSameOrBefore(moment());
        return (
            <EventsList>
                {currentDayEvents.map((el, i) =>
                    <li className={isPastEvents ? "past-date" : "future-date"} key={i}>{el.description}</li>
                )}
            </EventsList>
        );
    }

    const selectDate = value => {
        let formatedDate = value.format('YYYY-MM-DD');
        let currentEvents = events.filter(el => el.date === formatedDate);
        if (currentEvents.length > 0) {
            setModalVisible(true);
            setSelectedEvents(currentEvents);
        }
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
                <ul>
                    {selectedEvents.map((el, i) =>
                        <li key={i}>{el.description}</li>
                    )}
                </ul>
            </Modal>
        </>
    )
}

export default EventCalendar;
