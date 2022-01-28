import React from 'react';
import {Col, Button , Row} from "antd";
import HabitsCounter from "./HaibitsCounter";
import SettingsContext from "../SettingsContext";



const Habits = () => {
    const settingData = SettingsContext.setData
    return (
            <Row>
                <Col sm={4}>
                    <Row>
                        <Button type="primary">Primary Button</Button>
                        <Button>Default Button</Button>
                    </Row>
                </Col>
                <Col sm={4}>
                    <HabitsCounter />
                </Col>
                <Col sm={4}>
                 </Col>
            </Row>
    );
};



export default Habits;