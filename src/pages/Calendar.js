import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const localizer = momentLocalizer(moment);

const MyCalendar = () => (
  <div style={{ height: 500 }}>
    <Calendar
      localizer={localizer}
      events={[
        {
          title: 'My event',
          start: new Date(),
          end: new Date(),
        },
      ]}
      startAccessor="start"
      endAccessor="end"
      style={{ margin: '50px' }}
    />
  </div>
);

export default MyCalendar;