import React from 'react'
import { formatDate } from '../../utils/utility'

const EventListers = ({event}) => {
    return (
        <div className="shadow-md border mt-5 p-5 m-2 w-3/5 m-auto">
            <div>
                Event : <b>{event.eventName}</b>
            </div>
            <div className="flex justify-between">
                <div>Start Time : <b>{formatDate(event.startTime)}</b></div>
                <div>End Time : <b>{formatDate(event.endTime)}</b></div>
            </div>
        </div>
    )
}

export default EventListers