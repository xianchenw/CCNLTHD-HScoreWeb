import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css'

const MyCalendar = () => {
    const [date, setDate] = useState(new Date());

    return (
    <div className='app'>
        <div className='calendar-container'>
        <Calendar/>
        </div>
        <p className='text-center'>
        <span className='bold'>Current Date:</span>{' '}
        {date.toDateString()}
        </p>
    </div>
    );
}

export default MyCalendar