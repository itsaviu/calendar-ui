import React, { useEffect, useState } from 'react'
import { Button, Radio, Modal, DatePicker, Space, Input } from 'antd';
import axios from 'axios';
import EventListers from '../presentations/EventListers';



const Dashboard = () => {

    const [eventRecord, setEventRecord] = useState({})
    const [events, setEvents] = useState([])
    const [type, setType] = useState('today')
    const [isModalVisible, setIsModalVisible] = useState(false);


    const { RangePicker } = DatePicker;
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        console.log(eventRecord);
        postEvent()
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        fetchEvents(type)
    }, [type])

    const fetchEvents = (param) => {
        axios.get('http://localhost:5000/api/events/'+param)
            .then((resp) => {
                setEvents(resp.data)
            })
            .catch(err => console.log(err))
    }

    const postEvent = () => {
        axios.post("http://localhost:5000/api/events", eventRecord)
            .then(resp => {
                fetchEvents(type)
                setEventRecord({})
            })
            .catch(err => console.log(err))
    }
    
    const onChange = (e) => {
        setType(e.target.value)
    }
     
    const addEventName = (e) => {
        setEventRecord({
            ...eventRecord,
            eventName: e.target.value
        })
    }

    const updateFrequency = (e) => {
        setEventRecord({
            ...eventRecord,
            frequency: e.target.value
        })
    }
    const dateUpdate = (value, dateString) => {
        console.log('Selected Time: ', value[0].toISOString());
        console.log('Selected Time: ', value[1].toISOString());
        setEventRecord({
            ...eventRecord,
            startTime: value[0].toISOString(),
            endTime: value[1].toISOString()
        })
      }

    return (
        <div className="flex mt-10">
            <div className="m-auto  w-8/12">
                
                <div className="flex ">
                    <div className="flex-1 text-center">
                        <Radio.Group onChange={onChange} defaultValue="today">
                            <Radio.Button value="today">Today</Radio.Button>
                            <Radio.Button value="all">All Time</Radio.Button>
                        </Radio.Group>
                    </div>
                    <Button onClick={showModal}>Create</Button>
                </div>
                <div className="mt-4">
                    {events && events.map(event => <EventListers key={event.id} event={event}/>)}
                </div>
                
            </div>
            <Modal title="Create Event" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <div className="mt-2 mb-2">
                    <Input placeholder="Event Name" onChange={addEventName} style={{ width: 200 }} />  
                </div>
                <div className="mt-2 mb-2">
                    <Space direction="vertical" size={12}>
                        <RangePicker showTime onChange={dateUpdate} />
                    </Space>  
                </div>
                <div className="mt-2 mb-2">
                    <Radio.Group onChange={updateFrequency} defaultValue="today">
                                <Radio.Button value="NONE">None</Radio.Button>
                                <Radio.Button value="DAILY">Daily</Radio.Button>
                                <Radio.Button value="WEEKLY">Weekly</Radio.Button>
                                <Radio.Button value="Monthly">Monthly</Radio.Button>
                    </Radio.Group>
                </div>
                
                

            </Modal>
        </div>
    )
}

export default Dashboard