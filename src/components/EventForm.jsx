import React, { useState } from 'react';
import { DatePicker, Form, Input, Button, Row } from "antd";
import moment from 'moment';
import { eventStatus } from '../enums';

const EventForm = ({ submit }) => {
    const [form] = Form.useForm();
    const [event, setEvent] = useState({
        date: "",
        description: "",
        status: eventStatus.PLANNED
    });

    const onFinish = () => {
        submit(event);
        setEvent({
            date: "",
            description: "",
            status: eventStatus.PLANNED
        })
        form.resetFields();
    }

    return (
        <Form form={form} onFinish={onFinish} labelCol={{ span: 6 }}>
            <Form.Item
                label="Описание:"
                name="decription"
                rules={[
                    {
                        required: true,
                        message: "Добавьте описание события"
                    }
                ]}
            >
                <Input.TextArea
                    rows={5}
                    value={event.description}
                    onChange={(e => setEvent({ ...event, description: e.target.value }))}
                />
            </Form.Item>

            <Form.Item
                label="Дата:"
                name="date"
                rules={[
                    {
                        required: true,
                        message: "Выберите дату"
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (value.isSameOrAfter(moment())) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error("Выбранная дата уже прошла"));
                        },
                    }),
                ]}
            >
                <DatePicker onChange={date => setEvent({ ...event, date: date?.format('YYYY-MM-DD') })} />
            </Form.Item>

            <Row justify="end">
                <Form.Item>
                    <Button type="primary" htmlType="submit">Создать</Button>
                </Form.Item>
            </Row>
        </Form>
    )
}

export default EventForm;
