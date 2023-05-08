import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../styles/Calendar.css'
import API, { authAPI, endpoints } from '../../configs/API';
import { Badge } from 'react-bootstrap';

const MyCalendar = () => {
    const [date, setDate] = useState(new Date());
    const [timeTables, setTimeTables] = useState([]);

    useEffect(() => {
        const loadTimeTables = async () => {
            try {
                let e = `${endpoints['timetables']}`
                let res = await authAPI().get(e)
                setTimeTables(res.data)
            } catch (ex) {
                console.log(ex)
            }
        }

        loadTimeTables()
    }, [])

    const renderDay = ({ date, view }) => {
        // Check if the current view is month view
        // Filter timetable data for the current day of the week

        const m = [
            {
                "subject": {
                    "name": "Quản trị mạng",
                    "description": "Quản trị mạng",
                    "active": true
                },
                "day_of_week": 3,
                "start_time": "07:00:00",
                "end_time": "11:00:00"
            },
            {
                "subject": {
                    "name": "Quản trị mạng",
                    "description": "Quản trị mạng",
                    "active": true
                },
                "day_of_week": 5,
                "start_time": "07:00:00",
                "end_time": "15:00:00"
            },
            {
                "subject": {
                    "name": "Quản trị mạng",
                    "description": "Quản trị mạng",
                    "active": true
                },
                "day_of_week": 3,
                "start_time": "13:00:00",
                "end_time": "17:00:00"
            },
            {
                "subject": {
                    "name": "Quản trị mạng",
                    "description": "Quản trị mạng",
                    "active": true
                },
                "day_of_week": 4,
                "start_time": "13:00:00",
                "end_time": "17:00:00"
            }
        ]
        
        // // // Render a badge with the start and end times for each timetable item
        for (let i = 0; i < m.length; i++) {
            if (date.getDay() === m[i].day_of_week) {
                return (
                    <Badge pill bg="info">
                        {m[i].start_time} - {m[i].end_time}
                    </Badge>
                );
            }
        }
    }

    return (
        <div className='app'>
            <div className='calendar-component'>
                <Calendar value={date} tileContent={renderDay} />
            </div>
            <p className='text-center'>
                <span className='bold'>Current Date:</span>{' '}
                {date.toDateString()}
            </p>
        </div>
    );
}

export default MyCalendar