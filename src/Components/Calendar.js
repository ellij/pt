import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const TrainingCalendar = (props) => {
    const localizer = momentLocalizer(moment);
    const [trainings, setTrainings] = useState([]); 

    const fetchTrainingData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err));
      }
    
    useEffect(() => {
        fetchTrainingData();
    }, []);

    const events = trainings.map((event, index) => {
        return {
            title: event.activity + ' / ' + event.customer.firstname + ' ' + event.customer.lastname,
            start: moment(event.date).toDate(), 
            end: moment(event.date).add(event.duration, 'm').toDate(), 
            allDay: false}
        });

        const MyCalendar = () =>
        (
          <div>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{height: 500}}
            />
          </div>
        );        

    return (
        <div>
            <MyCalendar />
        </div>
    );
};

export default TrainingCalendar;